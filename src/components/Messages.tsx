import React, { useEffect, useRef } from "react";
import { useAppContext, useAppDispatch } from "../hooks";
import { NEW_MESSAGE } from "../reducers/actions";
import { MessageItem } from "./Message";

export const Messages: React.FC = () => {
  const { messages, connection, current, selectedUser } = useAppContext();
  const dispatch = useAppDispatch();

  const messagesEndRef = useRef<HTMLUListElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(() => {
    connection.on("ReceiveMessage", (message: Message) => {
      if (message.recipient === current && message.sender === selectedUser)
        dispatch({ type: NEW_MESSAGE, payload: message });
    });

    return () => {
      connection.off("ReceiveMessage");
    };
  }, [connection, dispatch, current, selectedUser]);

  useEffect(() => scrollToBottom(), [messages.length]);

  return (
    <div className="chat">
      <ul
        className="list-group border-0 bg-transparent d-flex flex-column"
        ref={messagesEndRef}
      >
        {messages.map((message, index) => (
          <MessageItem
            key={index}
            message={message.content}
            sender={message.sender}
          />
        ))}
      </ul>
    </div>
  );
};
