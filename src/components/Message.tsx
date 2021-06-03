import React from "react";
import { useAppContext } from "../hooks";

interface MessageProp {
  sender: string;
  message: string;
}

export const Message: React.FC<MessageProp> = ({ message, sender }) => {
  const { current } = useAppContext();
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
