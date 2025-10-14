import { useEffect, useState } from "react";
import { Chatbot } from "supersimpledev";
import loadingSpinner from "../assets/loading-spinner.gif";
import "../styles/ChatInput.css";

function ChatInput({ chatMessages, setChatMessages, setIsLoading, isLoading }) {
  const [inputText, setInputText] = useState("");

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === "") {
      return;
    }

    setIsLoading(true);
    setInputText("");

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];

    setChatMessages([
      ...newChatMessages,
      {
        message: (
          <img
            src={loadingSpinner}
            className="loading-spinner"
          />
        ),
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    setIsLoading(false);
  }

  function sendInputMessage(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setInputText("");
    }
  }

  function removeMessages() {
    localStorage.removeItem("messages");
    setChatMessages([]);
  }

  return (
    <form>
      <input
        type="text"
        placeholder="Send a message to chatbot"
        size="30"
        value={inputText}
        onChange={saveInputText}
        onKeyDown={sendInputMessage}
      />
      <button
        type="button"
        onClick={sendMessage}
        className="send-btn"
      >
        Send
      </button>
      {chatMessages.length > 0 && (
        <button
          onClick={removeMessages}
          className="clear-btn"
          type="button"
        >
          Clear
        </button>
      )}
    </form>
  );
}

export default ChatInput;
