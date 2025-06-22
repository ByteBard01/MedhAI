import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import ReactMarkdown from "react-markdown";
import { IoSend } from "react-icons/io5";
import Typewriter from "./Typewriter";

const Main = () => {
  const {
    onSent,
    input,
    setInput,
    loading,
    activeChatMessages,
    latestResponse,
    recentPrompt,
  } = useContext(Context);

  const showResultScreen = activeChatMessages.length > 0 || loading;

  const handleInputChange = (e) => {
    let value = e.target.value;
    if (value.length > 0) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    setInput(value);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>MedhAI</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {!showResultScreen ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Tushar</span>
              </p>
              <p>How can I help you today?</p>
            </div>
          </>
        ) : (
          <div className="result">
            {activeChatMessages.map((message, index) => {
              const isLastMessage = index === activeChatMessages.length - 1;
              const useTypewriter =
                isLastMessage && message.response === latestResponse;

              return (
                <div key={index} className="result-turn">
                  <div className="result-title">
                    <img src={assets.user_icon} alt="User Icon" />
                    <p>{message.prompt}</p>
                  </div>
                  <div className="result-data">
                    <div>
                      <img src={assets.medhai_icon} alt="MedhAI Icon" />
                    </div>
                    <div>
                      {useTypewriter ? (
                        <Typewriter text={message.response} />
                      ) : (
                        <ReactMarkdown>{message.response}</ReactMarkdown>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {loading && (
              <div className="result-turn">
                <div className="result-title">
                  <img src={assets.user_icon} alt="User Icon" />
                  <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                  <img src={assets.medhai_icon} alt="MedhAI Icon" />
                  <div className="loader">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={handleInputChange}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={(e) => e.key === "Enter" && onSent()}
            />
            <div>
              <IoSend
                onClick={() => onSent()}
                className="search-box-icon send-icon"
              />
            </div>
          </div>
          <p className="bottom-info">
            MedhAI may display inaccurate info, including about people, so
            double-check its responses. Your privacy and MedhAI Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
