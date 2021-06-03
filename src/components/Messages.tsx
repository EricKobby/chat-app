import React, { useEffect } from "react";
import { useAppContext, useAppDispatch } from "../hooks";
import { NEW_MESSAGE } from "../reducers/actions";
import { Message } from "./Message";

export const Messages: React.FC = () => {
  const { messages, connection, current } = useAppContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    connection.on("ReceiveMessage", (message) => {
      if (message.recipient === current)
        dispatch({ type: NEW_MESSAGE, payload: message });
    });
  }, []);

  return (
    <div className="chat">
      <ul className="list-group border-0 bg-transparent d-flex flex-column">
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message.content}
            sender={message.sender}
          />
        ))}
      </ul>
    </div>
  );
};
