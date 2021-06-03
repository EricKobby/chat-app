import React, { ChangeEvent, useState } from "react";
import { useAppContext, useAppDispatch } from "../hooks";
import { SEND_MESSAGE } from "../reducers/actions";

export const MessageBox: React.FC = () => {
  const [message, setMessage] = useState("");
  const { connection, selectedUser, current } = useAppContext();
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendClick = async () => {
    const messageModel: Message = {
      content: message,
      recipient: selectedUser,
      sender: current
    };
    await connection.send("SendMessage", messageModel);
    dispatch({ type: SEND_MESSAGE, payload: messageModel });
  };

  return (
    <div className="message">
      <div className="input-group input-group-lg">
        <input
          type="text"
          className="form-control form-control-lg bg-transparent border-dark text-light"
          value={message}
          onChange={handleChange}
          name="message"
          placeholder="Enter message"
        />
        <button className="btn btn-outline-dark text-light" onClick={handleSendClick}>
          <h3>&raquo;</h3>
        </button>
      </div>
    </div>
  );
};
