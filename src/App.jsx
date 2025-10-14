import { useState, useEffect, useRef } from "react";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import "./App.css";
import { Chatbot } from "supersimpledev";

// Custom hook
function useAutoScroll(dependencies) {
  const containerRef = useRef(null);

  useEffect(() => {
    const containerElem = containerRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, dependencies);

  return containerRef;
}

function App() {
  const [chatMessages, setChatMessages] = useState(() => {
    return JSON.parse(localStorage.getItem("messages")) || [];
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages))
  }, [chatMessages]);

  useEffect(() => {
    const response = Chatbot.addResponses({
      sayName: "Your name is Vera.",
      cmdToRemoveDirectory: "To remove a directory in command prompt the cmd is: rmdir <folder name>."
    })
  }, []);

  return (
    <main className="app-container">
      {chatMessages.length === 0 ? (
        <h1>
          Welcome to the chatbot project! Send a message using the textbox
          below.
        </h1>
      ) : (
        <ChatMessages chatMessages={chatMessages} useAutoScroll={useAutoScroll} />
      )}
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
    </main>
  );
}

export default App;
