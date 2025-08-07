import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ChatApp() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [highlightedMessageId, setHighlightedMessageId] = useState(null); // NEW
  const bottomRef = useRef(null);
  const messageRefs = useRef({}); // NEW: for scrolling

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;
    await addDoc(collection(db, "messages"), {
      text: message,
      author: "Guest",
      timestamp: serverTimestamp(),
      replyTo: replyTo ? replyTo.id : null,
    });
    setMessage("");
    setReplyTo(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleReply = (msg) => {
    setReplyTo(msg);
  };

  const handleDoubleClick = (replyToId) => {
    if (!replyToId) return;

    setHighlightedMessageId(replyToId);

    // Scroll into view
    const el = messageRefs.current[replyToId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Remove highlight after 2 seconds
    setTimeout(() => {
      setHighlightedMessageId(null);
    }, 2000);
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="p-4 bg-blue-700 font-bold text-lg text-center">Simple Chat App</div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isMine = msg.author === "Guest";
          const repliedMsg = messages.find((m) => m.id === msg.replyTo);

          return (
            <div
              key={msg.id}
              ref={(el) => (messageRefs.current[msg.id] = el)} // Track DOM refs
              onClick={() => handleReply(msg)}
              onDoubleClick={() => handleDoubleClick(msg.replyTo)}
              className={`max-w-xs break-words p-3 rounded-lg shadow-md cursor-pointer relative transition-all duration-300 ${
                isMine ? "bg-blue-600 self-end ml-auto text-right" : "bg-gray-800 self-start mr-auto"
              } ${highlightedMessageId === msg.id ? "ring-2 ring-yellow-400 scale-105" : ""}`}
            >
              {/* Show reply context */}
              {msg.replyTo && repliedMsg && (
                <div className="text-xs text-gray-300 border-l-2 border-blue-400 pl-2 mb-1 italic bg-gray-700 rounded p-1">
                  Replying to: <span className="text-white font-semibold">{repliedMsg.text}</span>
                </div>
              )}
              <div className="text-xs text-gray-400 mb-1">{msg.author}</div>
              <div>{msg.text}</div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Reply Info Bar */}
      {replyTo && (
        <div className="bg-gray-800 p-2 text-sm flex justify-between items-center">
          <div>
            <span className="text-gray-400">Replying to: </span>
            <span className="italic text-white">{replyTo.text}</span>
          </div>
          <button
            onClick={() => setReplyTo(null)}
            className="text-red-400 hover:text-red-600 ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-700 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded bg-gray-900 text-white outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
