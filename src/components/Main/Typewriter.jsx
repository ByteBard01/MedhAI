import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./Typewriter.css";

const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");

    if (text) {
      const words = text.split(" ");
      let currentWordIndex = 0;

      const intervalId = setInterval(() => {
        if (currentWordIndex < words.length) {
          setDisplayedText(words.slice(0, currentWordIndex + 1).join(" "));
          currentWordIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, 50);

      return () => clearInterval(intervalId);
    }
  }, [text]);

  return (
    <div className="typewriter-container">
      <ReactMarkdown>{displayedText}</ReactMarkdown>
    </div>
  );
};

export default Typewriter;
