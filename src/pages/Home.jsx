import { useEffect, useState } from "react";

const generateQuestion = () => {
  const operators = ["+", "-", "*"];
  let num1 = Math.floor(Math.random() * 10 + 1);
  let num2 = Math.floor(Math.random() * 10 + 1);
  let operator = operators[Math.floor(Math.random() * operators.length)];

  let expression = `${num1} ${operator} ${num2}`;
  let result = eval(expression);

  // Make sure result is NEVER 10
  if (result === 10) return generateQuestion();
  return { expression, result };
};

function Home() {
  const [question, setQuestion] = useState({ expression: "", result: null });
  const [userInput, setUserInput] = useState("");
  const [tenCount, setTenCount] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setQuestion(generateQuestion());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = userInput.trim();

    // Hack: If user types 10
    if (trimmed === "10") {
      const newCount = tenCount + 1;
      setTenCount(newCount);
      if (newCount >= 3) {
        window.location.pathname = "/next";
        return;
      }
    }

    // Check answer
    if (Number(trimmed) === question.result) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback("❌ Wrong!");
    }

    setUserInput("");
    setQuestion(generateQuestion());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 flex items-center justify-center">
      <div className="bg-gray-800 text-white rounded-xl shadow-lg p-8 w-full max-w-md text-center space-y-6">
        <h1 className="text-xl font-bold">Solve this:</h1>
        <div className="text-3xl font-mono text-blue-400">{question.expression} = ?</div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter your answer"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded text-white font-semibold transition"
          >
            Submit
          </button>
        </form>

        {/* Score & Feedback */}
        <div className="text-sm text-gray-300 mt-2">
          <p className="text-lg font-semibold text-white">Score: <span className="text-yellow-300">{score}</span></p>
          <p className={`mt-1 ${feedback.includes("Correct") ? "text-green-400" : "text-red-400"}`}>
            {feedback}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
