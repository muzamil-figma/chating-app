// import React, { useState, useEffect, useRef } from "react";
// import {
//   collection,
//   addDoc,
//   onSnapshot,
//   serverTimestamp,
//   orderBy,
//   query,
// } from "firebase/firestore";
// import { db } from "../firebaseConfig";

// export default function ChatApp() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [username, setUsername] = useState("");
//   const [replyTo, setReplyTo] = useState(null);
//   const bottomRef = useRef(null);

//   useEffect(() => {
//     let name = localStorage.getItem("chat_username");
//     if (!name || name === "Guest") {
//       name = prompt("👋 Aap ka naam kya hai?");
//       if (!name) name = "Guest";
//       localStorage.setItem("chat_username", name);
//     }
//     setUsername(name);
//   }, []);

//   useEffect(() => {
//     const q = query(collection(db, "messages"), orderBy("timestamp"));
//     const unsub = onSnapshot(q, (snapshot) => {
//       const msgs = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setMessages(msgs);
//       bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//     });
//     return () => unsub();
//   }, []);

//   const sendMessage = async () => {
//     if (!message.trim()) return;
//     await addDoc(collection(db, "messages"), {
//       text: message,
//       author: username,
//       timestamp: serverTimestamp(),
//       replyTo: replyTo ? { id: replyTo.id, text: replyTo.text, author: replyTo.author } : null,
//     });
//     setMessage("");
//     setReplyTo(null);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   return (
//     <div className="h-screen bg-black text-white flex flex-col w-full">
//       <div className="p-4 bg-blue-700 font-bold text-lg text-center">
//         Welcome, {username} 🚀
//       </div>

//       <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
//         {messages.map((msg) => {
//           const isMe = msg.author === username;
//           return (
//             <div
//               key={msg.id}
//               className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`p-3 rounded-lg shadow text-sm max-w-[75%] ${
//                   isMe
//                     ? "bg-blue-600 text-right text-white"
//                     : "bg-gray-700 text-left text-white"
//                 }`}
//               >
//                 <div className="text-xs font-bold text-gray-300 mb-1">
//                   {msg.author}
//                 </div>

//                 {msg.replyTo && (
//                   <div className="text-xs italic text-gray-400 border-l-2 pl-2 mb-1 border-gray-500">
//                     Reply to {msg.replyTo.author}: "{msg.replyTo.text}"
//                   </div>
//                 )}

//                 <div>{msg.text}</div>

//                 <button
//                   onClick={() => setReplyTo(msg)}
//                   className="text-[10px] mt-1 text-blue-200 hover:underline"
//                 >
//                   Reply
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={bottomRef}></div>
//       </div>

//       {replyTo && (
//         <div className="bg-gray-800 text-xs text-gray-300 p-2 px-4 flex items-center justify-between">
//           <span>
//             Replying to {replyTo.author}: <span className="italic">"{replyTo.text}"</span>
//           </span>
//           <button onClick={() => setReplyTo(null)} className="text-red-400 hover:underline">
//             Cancel
//           </button>
//         </div>
//       )}

//       <div className="p-4 border-t border-gray-700 flex gap-2">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={handleKeyPress}
//           placeholder="Type your message..."
//           className="flex-1 p-2 rounded bg-gray-900 text-white outline-none"
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
//

// import React, { useState, useEffect, useRef } from "react";
// import {
//   collection,
//   addDoc,
//   onSnapshot,
//   serverTimestamp,
//   orderBy,
//   query,
// } from "firebase/firestore";
// import { db } from "../firebaseConfig";

// export default function ChatApp() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [username, setUsername] = useState("");
//   const [replyTo, setReplyTo] = useState(null);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isOnline, setIsOnline] = useState(true);
//   const [lastSeen, setLastSeen] = useState(null);
//   const bottomRef = useRef(null);
//   const typingTimeout = useRef(null);

//   useEffect(() => {
//     let name = localStorage.getItem("chat_username");
//     if (!name || name === "Guest") {
//       name = prompt("👋 Aap ka naam kya hai?");
//       if (!name) name = "Guest";
//       localStorage.setItem("chat_username", name);
//     }
//     setUsername(name);
//     setIsOnline(true);

//     window.addEventListener("beforeunload", () => {
//       localStorage.setItem("last_seen", new Date().toISOString());
//     });

//     const storedLastSeen = localStorage.getItem("last_seen");
//     if (storedLastSeen) {
//       setLastSeen(new Date(storedLastSeen));
//     }

//     return () => {
//       setIsOnline(false);
//       localStorage.setItem("last_seen", new Date().toISOString());
//     };
//   }, []);

//   useEffect(() => {
//     const q = query(collection(db, "messages"), orderBy("timestamp"));
//     const unsub = onSnapshot(q, (snapshot) => {
//       const msgs = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setMessages(msgs);
//       bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//     });
//     return () => unsub();
//   }, []);

//   const sendMessage = async () => {
//     if (!message.trim()) return;
//     await addDoc(collection(db, "messages"), {
//       text: message,
//       author: username,
//       timestamp: serverTimestamp(),
//       replyTo: replyTo ? { id: replyTo.id, text: replyTo.text, author: replyTo.author } : null,
//     });
//     setMessage("");
//     setReplyTo(null);
//     setIsTyping(false);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   const handleTyping = (e) => {
//     setMessage(e.target.value);
//     setIsTyping(true);
//     clearTimeout(typingTimeout.current);
//     typingTimeout.current = setTimeout(() => {
//       setIsTyping(false);
//     }, 1000);
//   };

//   return (
//     <div className="fixed inset-0 bg-black text-white flex flex-col overflow-hidden">
//       {/* Header */}
//       <div className="relative p-4 bg-blue-700 font-bold text-lg text-center shrink-0">
//         Welcome, {username} 🚀
//         <div className="absolute top-1 right-2 text-xs">
//           {isOnline ? (
//             <span className="text-green-300">🟢 Online</span>
//           ) : lastSeen ? (
//             <span className="text-gray-300">
//               Last seen at {new Date(lastSeen).toLocaleTimeString()}
//             </span>
//           ) : null}
//         </div>
//       </div>

//       {/* Floating Emoji */}
//       {isOnline && (
//         <div className="absolute bottom-20 right-4 text-3xl animate-bounce">💬</div>
//       )}

//       {/* Messages Area */}
//       <div
//         className="flex-1 overflow-y-auto px-2 py-4 space-y-3 no-scrollbar"
//         style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//       >
//         {messages.map((msg) => {
//           const isMe = msg.author === username;
//           return (
//             <div
//               key={msg.id}
//               className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`p-3 rounded-xl shadow-md text-sm whitespace-pre-wrap break-words max-w-[80%] ${
//                   isMe
//                     ? "bg-blue-600 text-right text-white"
//                     : "bg-gray-700 text-left text-white"
//                 }`}
//               >
//                 <div className="text-xs font-bold text-gray-300 mb-1">{msg.author}</div>

//                 {msg.replyTo && (
//                   <div className="text-xs italic text-gray-400 border-l-2 pl-2 mb-1 border-gray-500">
//                     Reply to {msg.replyTo.author}: "{msg.replyTo.text}"
//                   </div>
//                 )}

//                 <div>{msg.text}</div>

//                 <button
//                   onClick={() => setReplyTo(msg)}
//                   className="text-[10px] mt-1 text-blue-200 hover:underline"
//                 >
//                   Reply
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={bottomRef}></div>
//       </div>

//       {/* Typing Indicator */}
//       {isTyping && (
//         <div className="text-gray-400 text-xs px-4 pb-1">Typing...</div>
//       )}

//       {/* Reply Info */}
//       {replyTo && (
//         <div className="bg-gray-800 text-xs text-gray-300 p-2 px-4 flex items-center justify-between shrink-0">
//           <span>
//             Replying to {replyTo.author}: <span className="italic">"{replyTo.text}"</span>
//           </span>
//           <button onClick={() => setReplyTo(null)} className="text-red-400 hover:underline">
//             Cancel
//           </button>
//         </div>
//       )}

//       {/* Input */}
//       <div className="p-3 border-t border-gray-700 bg-black shrink-0">
//         <div className="flex items-center gap-2 bg-gray-900 rounded-lg px-3 py-2 w-full">
//           <input
//             type="text"
//             value={message}
//             onChange={handleTyping}
//             onKeyDown={handleKeyPress}
//             placeholder="Type your message..."
//             className="flex-1 bg-transparent text-white outline-none placeholder-gray-400 text-sm"
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
//           >
//             Send
//           </button>
//         </div>
//       </div>

//       <style>{`
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// }




// import React, { useState, useEffect, useRef } from "react";
// import {
//   collection,
//   addDoc,
//   onSnapshot,
//   serverTimestamp,
//   orderBy,
//   query,
// } from "firebase/firestore";
// import { db } from "../firebaseConfig";

// export default function ChatApp() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [username, setUsername] = useState("");
//   const [replyTo, setReplyTo] = useState(null);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isOnline, setIsOnline] = useState(true);
//   const [lastSeen, setLastSeen] = useState(null);
//   const [isTabVisible, setIsTabVisible] = useState(true); // 👈 NEW
//   const bottomRef = useRef(null);
//   const typingTimeout = useRef(null);

//   // ✅ Ask notification permission once
//   useEffect(() => {
//     if (Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   // ✅ Track tab visibility
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       setIsTabVisible(!document.hidden);
//     };
//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, []);

//   useEffect(() => {
//     let name = localStorage.getItem("chat_username");
//     if (!name || name === "Guest") {
//       name = prompt("👋 Aap ka naam kya hai?");
//       if (!name) name = "Guest";
//       localStorage.setItem("chat_username", name);
//     }
//     setUsername(name);
//     setIsOnline(true);

//     window.addEventListener("beforeunload", () => {
//       localStorage.setItem("last_seen", new Date().toISOString());
//     });

//     const storedLastSeen = localStorage.getItem("last_seen");
//     if (storedLastSeen) {
//       setLastSeen(new Date(storedLastSeen));
//     }

//     return () => {
//       setIsOnline(false);
//       localStorage.setItem("last_seen", new Date().toISOString());
//     };
//   }, []);

//   // ✅ Listen to messages and show notification if needed
//   useEffect(() => {
//     const q = query(collection(db, "messages"), orderBy("timestamp"));
//     let initialLoad = true;

//     const unsub = onSnapshot(q, (snapshot) => {
//       const msgs = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       // ✅ If tab not visible and new message not by me, show notification
//       if (!initialLoad) {
//         const latestMsg = msgs[msgs.length - 1];
//         if (latestMsg.author !== username && !isTabVisible) {
//           if (Notification.permission === "granted") {
//             new Notification("📩 New Message", {
//               body: `${latestMsg.author}: ${latestMsg.text}`,
//               icon: "/chat-icon.png", // optional icon
//             });
//           }
//         }
//       }

//       setMessages(msgs);
//       bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//       initialLoad = false;
//     });

//     return () => unsub();
//   }, [username, isTabVisible]); // 👈 Track tab visibility

//   const sendMessage = async () => {
//     if (!message.trim()) return;
//     await addDoc(collection(db, "messages"), {
//       text: message,
//       author: username,
//       timestamp: serverTimestamp(),
//       replyTo: replyTo
//         ? { id: replyTo.id, text: replyTo.text, author: replyTo.author }
//         : null,
//     });
//     setMessage("");
//     setReplyTo(null);
//     setIsTyping(false);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   const handleTyping = (e) => {
//     setMessage(e.target.value);
//     setIsTyping(true);
//     clearTimeout(typingTimeout.current);
//     typingTimeout.current = setTimeout(() => {
//       setIsTyping(false);
//     }, 1000);
//   };

//   return (
//     <div className="fixed inset-0 bg-black text-white flex flex-col overflow-hidden">
//       {/* Header */}
//       <div className="relative p-4 bg-blue-700 font-bold text-lg text-center shrink-0">
//         Welcome, {username} 🚀
//         <div className="absolute top-1 right-2 text-xs">
//           {isOnline ? (
//             <span className="text-green-300">🟢 Online</span>
//           ) : lastSeen ? (
//             <span className="text-gray-300">
//               Last seen at {new Date(lastSeen).toLocaleTimeString()}
//             </span>
//           ) : null}
//         </div>
//       </div>

//       {/* Floating Emoji */}
//       {isOnline && (
//         <div className="absolute bottom-20 right-4 text-3xl animate-bounce">💬</div>
//       )}

//       {/* Messages Area */}
//       <div
//         className="flex-1 overflow-y-auto px-2 py-4 space-y-3 no-scrollbar"
//         style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//       >
//         {messages.map((msg) => {
//           const isMe = msg.author === username;
//           return (
//             <div
//               key={msg.id}
//               className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`p-3 rounded-xl shadow-md text-sm whitespace-pre-wrap break-words max-w-[80%] ${
//                   isMe
//                     ? "bg-blue-600 text-right text-white"
//                     : "bg-gray-700 text-left text-white"
//                 }`}
//               >
//                 <div className="text-xs font-bold text-gray-300 mb-1">
//                   {msg.author}
//                 </div>

//                 {msg.replyTo && (
//                   <div className="text-xs italic text-gray-400 border-l-2 pl-2 mb-1 border-gray-500">
//                     Reply to {msg.replyTo.author}: "{msg.replyTo.text}"
//                   </div>
//                 )}

//                 <div>{msg.text}</div>

//                 <button
//                   onClick={() => setReplyTo(msg)}
//                   className="text-[10px] mt-1 text-blue-200 hover:underline"
//                 >
//                   Reply
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={bottomRef}></div>
//       </div>

//       {/* Typing Indicator */}
//       {isTyping && (
//         <div className="text-gray-400 text-xs px-4 pb-1">Typing...</div>
//       )}

//       {/* Reply Info */}
//       {replyTo && (
//         <div className="bg-gray-800 text-xs text-gray-300 p-2 px-4 flex items-center justify-between shrink-0">
//           <span>
//             Replying to {replyTo.author}:{" "}
//             <span className="italic">"{replyTo.text}"</span>
//           </span>
//           <button
//             onClick={() => setReplyTo(null)}
//             className="text-red-400 hover:underline"
//           >
//             Cancel
//           </button>
//         </div>
//       )}

//       {/* Input */}
//       <div className="p-3 border-t border-gray-700 bg-black shrink-0">
//         <div className="flex items-center gap-2 bg-gray-900 rounded-lg px-3 py-2 w-full">
//           <input
//             type="text"
//             value={message}
//             onChange={handleTyping}
//             onKeyDown={handleKeyPress}
//             placeholder="Type your message..."
//             className="flex-1 bg-transparent text-white outline-none placeholder-gray-400 text-sm"
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
//           >
//             Send
//           </button>
//         </div>
//       </div>

//       <style>{`
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// }


//.................................. typing done
// import React, { useState, useEffect, useRef } from "react";
// import {
//   collection,
//   addDoc,
//   onSnapshot,
//   serverTimestamp,
//   orderBy,
//   query,
//   doc,
//   setDoc,
// } from "firebase/firestore";
// import { db } from "../firebaseConfig";

// export default function ChatApp() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [username, setUsername] = useState("");
//   const [replyTo, setReplyTo] = useState(null);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isOnline, setIsOnline] = useState(true);
//   const [lastSeen, setLastSeen] = useState(null);
//   const [isTabVisible, setIsTabVisible] = useState(true);
//   const [otherTypers, setOtherTypers] = useState([]);

//   const bottomRef = useRef(null);
//   const typingTimeout = useRef(null);

//   // 🔔 Ask notification permission
//   useEffect(() => {
//     if (Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   // 👁️ Detect if tab is visible
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       setIsTabVisible(!document.hidden);
//     };
//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, []);

//   // 👤 Get name and setup online/offline status
//   useEffect(() => {
//     let name = localStorage.getItem("chat_username");
//     if (!name || name === "Guest") {
//       name = prompt("👋 Aap ka naam kya hai?");
//       if (!name) name = "Guest";
//       localStorage.setItem("chat_username", name);
//     }
//     setUsername(name);
//     setIsOnline(true);

//     window.addEventListener("beforeunload", () => {
//       localStorage.setItem("last_seen", new Date().toISOString());
//     });

//     const storedLastSeen = localStorage.getItem("last_seen");
//     if (storedLastSeen) {
//       setLastSeen(new Date(storedLastSeen));
//     }

//     return () => {
//       setIsOnline(false);
//       localStorage.setItem("last_seen", new Date().toISOString());
//     };
//   }, []);

//   // 🧠 Listen to typing status of others
//   useEffect(() => {
//     const unsub = onSnapshot(collection(db, "typingStatus"), (snapshot) => {
//       const typingUsers = snapshot.docs
//         .map((doc) => doc.data())
//         .filter((user) => user.name !== username && user.typing);
//       setOtherTypers(typingUsers);
//     });
//     return () => unsub();
//   }, [username]);

//   // 📨 Listen to messages
//   useEffect(() => {
//     const q = query(collection(db, "messages"), orderBy("timestamp"));
//     let initialLoad = true;

//     const unsub = onSnapshot(q, (snapshot) => {
//       const msgs = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       if (!initialLoad) {
//         const latestMsg = msgs[msgs.length - 1];
//         if (latestMsg.author !== username && !isTabVisible) {
//           if (Notification.permission === "granted") {
//             new Notification("📩 New Message", {
//               body: `${latestMsg.author}: ${latestMsg.text}`,
//               icon: "/chat-icon.png",
//             });
//           }
//         }
//       }

//       setMessages(msgs);
//       bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//       initialLoad = false;
//     });

//     return () => unsub();
//   }, [username, isTabVisible]);

//   // 📝 Send message
//   const sendMessage = async () => {
//     if (!message.trim()) return;

//     await addDoc(collection(db, "messages"), {
//       text: message,
//       author: username,
//       timestamp: serverTimestamp(),
//       replyTo: replyTo
//         ? { id: replyTo.id, text: replyTo.text, author: replyTo.author }
//         : null,
//     });

//     setMessage("");
//     setReplyTo(null);
//     setIsTyping(false);

//     await setDoc(doc(db, "typingStatus", username), {
//       name: username,
//       typing: false,
//     });
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   // ⌨️ Typing handler
//   const handleTyping = (e) => {
//     setMessage(e.target.value);
//     setIsTyping(true);

//     const typingRef = doc(db, "typingStatus", username);
//     setDoc(typingRef, { typing: true, name: username });

//     clearTimeout(typingTimeout.current);
//     typingTimeout.current = setTimeout(() => {
//       setIsTyping(false);
//       setDoc(typingRef, { typing: false, name: username });
//     }, 1000);
//   };

//   return (
//     <div className="fixed inset-0 bg-black text-white flex flex-col overflow-hidden">
//       {/* Header */}
//       <div className="relative p-4 bg-blue-700 font-bold text-lg text-center shrink-0">
//         Welcome, {username} 🚀
//         <div className="absolute top-1 right-2 text-xs">
//           {isOnline ? (
//             <span className="text-green-300">🟢 Online</span>
//           ) : lastSeen ? (
//             <span className="text-gray-300">
//               Last seen at {new Date(lastSeen).toLocaleTimeString()}
//             </span>
//           ) : null}
//         </div>
//       </div>

//       {/* Floating Emoji */}
//       {isOnline && (
//         <div className="absolute bottom-20 right-4 text-3xl animate-bounce">💬</div>
//       )}

//       {/* Messages */}
//       <div
//         className="flex-1 overflow-y-auto px-2 py-4 space-y-3 no-scrollbar"
//         style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//       >
//         {messages.map((msg) => {
//           const isMe = msg.author === username;
//           return (
//             <div
//               key={msg.id}
//               className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`p-3 rounded-xl shadow-md text-sm whitespace-pre-wrap break-words max-w-[80%] ${
//                   isMe
//                     ? "bg-blue-600 text-right text-white"
//                     : "bg-gray-700 text-left text-white"
//                 }`}
//               >
//                 <div className="text-xs font-bold text-gray-300 mb-1">
//                   {msg.author}
//                 </div>

//                 {msg.replyTo && (
//                   <div className="text-xs italic text-gray-400 border-l-2 pl-2 mb-1 border-gray-500">
//                     Reply to {msg.replyTo.author}: "{msg.replyTo.text}"
//                   </div>
//                 )}

//                 <div>{msg.text}</div>

//                 <button
//                   onClick={() => setReplyTo(msg)}
//                   className="text-[10px] mt-1 text-blue-200 hover:underline"
//                 >
//                   Reply
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={bottomRef}></div>
//       </div>

//       {/* 👀 Typing Indicators */}
//       {otherTypers.length > 0 && (
//         <div className="text-gray-400 text-xs px-4 pb-1">
//           {otherTypers.map((u) => u.name).join(", ")}{" "}
//           {otherTypers.length === 1 ? "is" : "are"} typing...
//         </div>
//       )}
//       {isTyping && (
//         <div className="text-gray-400 text-xs px-4 pb-1">Typing...</div>
//       )}

//       {/* Reply Info */}
//       {replyTo && (
//         <div className="bg-gray-800 text-xs text-gray-300 p-2 px-4 flex items-center justify-between shrink-0">
//           <span>
//             Replying to {replyTo.author}:{" "}
//             <span className="italic">"{replyTo.text}"</span>
//           </span>
//           <button
//             onClick={() => setReplyTo(null)}
//             className="text-red-400 hover:underline"
//           >
//             Cancel
//           </button>
//         </div>
//       )}

//       {/* Input */}
//       <div className="p-3 border-t border-gray-700 bg-black shrink-0">
//         <div className="flex items-center gap-2 bg-gray-900 rounded-lg px-3 py-2 w-full">
//           <input
//             type="text"
//             value={message}
//             onChange={handleTyping}
//             onKeyDown={handleKeyPress}
//             placeholder="Type your message..."
//             className="flex-1 bg-transparent text-white outline-none placeholder-gray-400 text-sm"
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
//           >
//             Send
//           </button>
//         </div>
//       </div>

//       <style>{`
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// }

// online 
import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  orderBy,
  query,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ChatApp() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [otherTypers, setOtherTypers] = useState([]);
  const [userStatuses, setUserStatuses] = useState([]);

  const bottomRef = useRef(null);
  const typingTimeout = useRef(null);

  // 🔔 Ask notification permission
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // 👁️ Detect if tab is visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // 👤 Get name and setup online/offline status
  useEffect(() => {
    let name = localStorage.getItem("chat_username");
    if (!name || name === "Guest") {
      name = prompt("👋 Aap ka naam kya hai?");
      if (!name) name = "Guest";
      localStorage.setItem("chat_username", name);
    }
    setUsername(name);

    const userRef = doc(db, "userStatus", name);

    // ✅ Set online true
    setDoc(userRef, {
      name,
      online: true,
      lastSeen: new Date().toISOString(),
    });

    // ✅ On unload, set online false
    const handleUnload = () => {
      setDoc(userRef, {
        name,
        online: false,
        lastSeen: new Date().toISOString(),
      });
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      handleUnload();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  // 👥 Real-time user status
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "userStatus"), (snapshot) => {
      const users = snapshot.docs.map((doc) => doc.data());
      setUserStatuses(users);
    });
    return () => unsub();
  }, []);

  // 🧠 Listen to typing status of others
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "typingStatus"), (snapshot) => {
      const typingUsers = snapshot.docs
        .map((doc) => doc.data())
        .filter((user) => user.name !== username && user.typing);
      setOtherTypers(typingUsers);
    });
    return () => unsub();
  }, [username]);

  // 📨 Listen to messages
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    let initialLoad = true;

    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (!initialLoad) {
        const latestMsg = msgs[msgs.length - 1];
        if (latestMsg.author !== username && !isTabVisible) {
          if (Notification.permission === "granted") {
            new Notification("📩 New Message", {
              body: `${latestMsg.author}: ${latestMsg.text}`,
              icon: "/chat-icon.png",
            });
          }
        }
      }

      setMessages(msgs);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      initialLoad = false;
    });

    return () => unsub();
  }, [username, isTabVisible]);

  // 📝 Send message
  const sendMessage = async () => {
    if (!message.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: message,
      author: username,
      timestamp: serverTimestamp(),
      replyTo: replyTo
        ? { id: replyTo.id, text: replyTo.text, author: replyTo.author }
        : null,
    });

    setMessage("");
    setReplyTo(null);
    setIsTyping(false);

    await setDoc(doc(db, "typingStatus", username), {
      name: username,
      typing: false,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    setIsTyping(true);

    const typingRef = doc(db, "typingStatus", username);
    setDoc(typingRef, { typing: true, name: username });

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      setIsTyping(false);
      setDoc(typingRef, { typing: false, name: username });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="relative p-4 bg-blue-700 font-bold text-lg text-center shrink-0">
        Welcome, {username} 🚀
      </div>

      {/* Online/Offline Users */}
      <div className="bg-gray-900 text-sm text-white px-4 py-2 flex flex-wrap gap-3 border-b border-gray-800">
        {userStatuses.map((user) => (
          <div key={user.name} className="flex items-center gap-1">
            <span
              className={`w-2 h-2 rounded-full ${
                user.online ? "bg-green-400" : "bg-red-400"
              }`}
            ></span>
            <span>{user.name}</span>
            {!user.online && user.lastSeen && (
              <span className="text-xs text-gray-400 ml-1">
                (last seen {new Date(user.lastSeen).toLocaleTimeString()})
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Floating Emoji */}
      <div className="absolute bottom-20 right-4 text-3xl animate-bounce">💬</div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-2 py-4 space-y-3 no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {messages.map((msg) => {
          const isMe = msg.author === username;
          return (
            <div
              key={msg.id}
              className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-xl shadow-md text-sm whitespace-pre-wrap break-words max-w-[80%] ${
                  isMe
                    ? "bg-blue-600 text-right text-white"
                    : "bg-gray-700 text-left text-white"
                }`}
              >
                <div className="text-xs font-bold text-gray-300 mb-1">
                  {msg.author}
                </div>

                {msg.replyTo && (
                  <div className="text-xs italic text-gray-400 border-l-2 pl-2 mb-1 border-gray-500">
                    Reply to {msg.replyTo.author}: "{msg.replyTo.text}"
                  </div>
                )}

                <div>{msg.text}</div>

                <button
                  onClick={() => setReplyTo(msg)}
                  className="text-[10px] mt-1 text-blue-200 hover:underline"
                >
                  Reply
                </button>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef}></div>
      </div>

      {/* Typing Indicators */}
      {otherTypers.length > 0 && (
        <div className="text-gray-400 text-xs px-4 pb-1">
          {otherTypers.map((u) => u.name).join(", ")}{" "}
          {otherTypers.length === 1 ? "is" : "are"} typing...
        </div>
      )}
      {isTyping && (
        <div className="text-gray-400 text-xs px-4 pb-1">Typing...</div>
      )}

      {/* Reply Info */}
      {replyTo && (
        <div className="bg-gray-800 text-xs text-gray-300 p-2 px-4 flex items-center justify-between shrink-0">
          <span>
            Replying to {replyTo.author}:{" "}
            <span className="italic">"{replyTo.text}"</span>
          </span>
          <button
            onClick={() => setReplyTo(null)}
            className="text-red-400 hover:underline"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-gray-700 bg-black shrink-0">
        <div className="flex items-center gap-2 bg-gray-900 rounded-lg px-3 py-2 w-full">
          <input
            type="text"
            value={message}
            onChange={handleTyping}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-white outline-none placeholder-gray-400 text-sm"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
          >
            Send
          </button>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
