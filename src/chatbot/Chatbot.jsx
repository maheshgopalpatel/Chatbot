// Chatbot.js
import React, { useEffect, useState } from "react";

const hiringQuestions = [
  "What position are you hiring for?",
  "What Specific skill are required for this position?",
  "How many years of experience is needed?",
  "What is the minimum education requirement?",
  "What location is this position you want?",
  "Is this position remote?",
];

function Chatbot() {
  let obj = {
    Position: "",
    Skill: "",
    Experience: "",
    Education: "",
    Location: "",
    Remote: "",
    Assistant: "Your requirement have been saved successfully",
  };
  let arr = Object.keys(obj);

  const [final, setFinal] = useState(obj);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [que, setQue] = useState(0);
  console.log(final);
  const handleSendMessage = () => {
    if (inputValue.trim() !== "" && hiringQuestions.length >= que + 1) {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      setFinal({ ...final, [arr[que]]: inputValue });
      setInputValue("");
      setQue(que + 1);
    } else {
      setMessages([...messages, { text: obj.Assistant, sender: "bot" }]);
      setInputValue("");
    }
  };
  console.log(que, hiringQuestions.length);
  const handleQuestion = () => {
    if (inputValue.trim() == "") {
      setMessages([...messages, { text: hiringQuestions[que], sender: "bot" }]);
      setInputValue("");
    }
  };
  useEffect(() => {
    handleQuestion();
  }, [que]);
  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {que !== hiringQuestions.length
          ? messages.map((message, index) => {
              return (
                <div
                  key={index}
                  className={`message ${
                    message.sender === "user" ? "user-message" : "bot-message"
                  }`}
                >
                  {message.text}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        {hiringQuestions.length == que ? (
          <div>here success massege and result</div>
        ) : (
          <div className="chatbot-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your answer..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatbot;
