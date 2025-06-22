import React, { createContext, useState, useEffect } from "react";
import { getGeminiResponse } from "../config/gemini-api";

export const Context = createContext();

const ContextProvider = (props) => {
  const [history, setHistory] = useState({});
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [latestResponse, setLatestResponse] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");

  useEffect(() => {
    const storedHistory = localStorage.getItem("chat_history");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chat_history", JSON.stringify(history));
  }, [history]);

  const activeChatMessages = history[activeChatId]?.messages || [];

  const onSent = async (prompt) => {
    setLoading(true);

    const currentPrompt = prompt || input;
    setRecentPrompt(currentPrompt);
    let currentChatId = activeChatId;

    if (!currentChatId || !history[currentChatId]) {
      currentChatId = Date.now().toString();
      setActiveChatId(currentChatId);
      setHistory((prev) => ({
        ...prev,
        [currentChatId]: {
          title: currentPrompt.slice(0, 25),
          messages: [],
        },
      }));
    }

    const response = await getGeminiResponse(currentPrompt);

    setLatestResponse(response);

    setHistory((prev) => ({
      ...prev,
      [currentChatId]: {
        ...prev[currentChatId],
        messages: [
          ...prev[currentChatId].messages,
          { prompt: currentPrompt, response: response },
        ],
      },
    }));

    setLoading(false);
    setInput("");
  };

  const newChat = () => {
    setActiveChatId(null);
    setLatestResponse("");
  };

  const loadChat = (chatId) => {
    setActiveChatId(chatId);
    setLatestResponse("");
  };

  const deleteChat = (chatIdToDelete) => {
    if (window.confirm("Are you sure you want to delete this chat?")) {
      const newHistory = { ...history };
      delete newHistory[chatIdToDelete];
      setHistory(newHistory);

      if (activeChatId === chatIdToDelete) {
        newChat();
      }
    }
  };

  const contextValue = {
    history,
    activeChatId,
    activeChatMessages,
    onSent,
    input,
    setInput,
    loading,
    newChat,
    loadChat,
    deleteChat,
    latestResponse,
    recentPrompt,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
