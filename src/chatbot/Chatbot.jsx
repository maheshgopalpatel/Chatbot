// Chatbot.js
import React, { useEffect, useState } from "react";

const hiringQuestions = [
  "What position are you hiring for?",
  "What Specific skill are required for this position?",
  // "How many years of experience is needed?",
  // "What is the minimum education requirement?",
  // "What location is this position you want?",
  // "Is this position remote?",
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
  const handleSendMessage = () => {
    if (inputValue.trim() !== "" && hiringQuestions.length > que + 1) {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      setFinal({ ...final, [arr[que]]: inputValue });
      setInputValue("");
      setQue(que + 1);
    } else {
      setFinal({ ...final, [arr[que]]: inputValue });
      setMessages([...messages, { text: obj.Assistant, sender: "bot" }]);
      setQue(que + 1);
    }
  };
  // console.log(que, hiringQuestions.length);
  const resultHandler = (value) => {
    if (value == "cancel") {
      setInputValue("");
      setMessages([]);
      setQue(0);
    } else {
      setInputValue("completed");
    }
  };
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
        {inputValue == "completed" ? (
          <div className="result" style={{ border: "2px solid gray" }}>
            {Object.values(final).map((item, i) => {
              let arr = Object.keys(final);
              return (
                <>
                  <div
                    style={{
                      border: "2px solid gray",
                      minHeight: "30px",
                      padding: "15px 8px 0",
                    }}
                  >
                    {arr[i]}
                  </div>
                  <div
                    style={{
                      border: "2px solid gray",
                      minHeight: "30px",
                      padding: "15px 8px 0",
                    }}
                  >
                    {item}
                  </div>
                </>
              );
            })}
          </div>
        ) : (
          messages.map((message, index) => {
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
        )}
      </div>
      <div>
        {hiringQuestions.length == que ? (
          <div className="chatbot-input">
            <button
              onClick={(e) => {
                resultHandler(e.target.innerText);
              }}
            >
              {inputValue == "completed" ? "cancel" : "submit"}
            </button>
          </div>
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
