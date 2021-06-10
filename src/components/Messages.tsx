import React, { useEffect, useRef } from "react";
import { useMessageSelector, useUsersSelector } from "../hooks";
import { MessageItem } from "./Message";
import { messageActions } from "../store/message.slice";
import { useAppDispatch } from "../store";
import { connection } from '../store/users.slice'

export const Messages: React.FC = () => {
  const { messages } = useMessageSelector();
  const { current, selectedUser } = useUsersSelector();
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
        dispatch(messageActions.addNewMessage(message));
    });

    return () => {
      connection.off("ReceiveMessage");
    };
  }, [dispatch, current, selectedUser]);

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
