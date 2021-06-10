import React from "react";
import { useUsersSelector } from "../hooks";

interface MessageProp {
  sender: string;
  message: string;
}

export const MessageItem: React.FC<MessageProp> = ({ message, sender }) => {
  const { current } = useUsersSelector();
  const isCurrent = sender === current;

  const style = `list-group-item border-0 bg-transparent text-light d-flex ${
    isCurrent && "sent"
  }`;
  return (
    <li className={style}>
      <p className="message-toast">{message}</p>
    </li>
  );
};
