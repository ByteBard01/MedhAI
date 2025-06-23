import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { Context } from "../../context/Context";
import { IoIosMenu } from "react-icons/io";
import { MdHistory } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { history, newChat, loadChat, deleteChat, activeChatId } =
    useContext(Context);

  const handleDelete = (e, chatId) => {
    e.stopPropagation();
    deleteChat(chatId);
  };

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        <IoIosMenu
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
        />

        <div onClick={() => newChat()} className="new-chat">
          <FaPlus className="new-chat-icon" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {Object.keys(history)
              .reverse()
              .map((chatId) => (
                <div
                  key={chatId}
                  onClick={() => loadChat(chatId)}
                  className={`recent-entry ${
                    activeChatId === chatId ? "active" : ""
                  }`}
                >
                  <div className="chat-info">
                    <MdHistory className="recent-history-icon" />
                    <p>{history[chatId].title}</p>
                  </div>
                  <IoTrashBin
                    className="delete-icon"
                    onClick={(e) => handleDelete(e, chatId)}
                  />
                </div>
              ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
