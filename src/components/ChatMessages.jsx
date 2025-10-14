import ChatMessage from "./ChatMessage";
import "../styles/ChatMessages.css";

function ChatMessages({ chatMessages, useAutoScroll }) {
  const chatMessagesRef = useAutoScroll([chatMessages]);

  return (
    <div
      ref={chatMessagesRef}
      className="chat-messages-container"
    >
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

export default ChatMessages;
