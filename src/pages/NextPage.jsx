import ChatBox from '../components/ChatBox';
function NextPage() {
    
  return (
    // <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 flex items-center justify-center">
    //   <div className="bg-gray-800 text-white rounded-xl shadow-2xl p-10 max-w-xl w-full text-center space-y-6">
    //     <h1 className="text-3xl font-bold text-blue-400">Access Granted 🔓</h1>
    //     <p className="text-lg">
    //       You’ve successfully unlocked the next level by cracking the code. 🔐
    //     </p>
    //     <p className="text-sm text-gray-400">
    //       (You found the hidden password: <span className="text-yellow-300">10</span> x 3)
    //     </p>
    //     <div className="mt-6">
    //       <button
    //         className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold transition"
    //         onClick={() => (window.location.pathname = "/")}
    //       >
    //         Go Back to Start
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <ChatBox/>
  );
}

export default NextPage;
