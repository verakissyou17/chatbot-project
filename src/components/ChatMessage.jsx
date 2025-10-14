import robotImage from "../assets/robot.png";
import userImage from "../assets/profile-1.jpg";
import "../styles/ChatMessage.css";
import dayjs from "dayjs";

function ChatMessage({ message, sender }) {
  const time = dayjs().valueOf();
  return (
    <div>
      <div
        className={
          sender === "user" ? "chat-message-user" : "chat-message-robot"
        }
      >
        {sender === "robot" && (
          <img
            src={robotImage}
            width="50"
          />
        )}
        <div className="message-container">
          <p className="message">{message}</p>
          <span className="time">{dayjs(time).format("HH:mm")}</span>
        </div>
        {sender === "user" && (
          <img
            src={userImage}
            width="50"
            className="user-image"
          />
        )}
      </div>
    </div>
  );
}
export default ChatMessage;
