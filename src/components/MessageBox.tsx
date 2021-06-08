import React, { ChangeEvent, useState } from "react";
import { useAppContext, useAppDispatch } from "../hooks";
import { SEND_MESSAGE } from "../reducers/actions";
import { sendMessage } from '../services/MessageService';

export const MessageBox: React.FC = () => {
  const [message, setMessage] = useState("");
  const { selectedUser, current } = useAppContext();
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const messageModel: Message = {
      content: message,
      recipient: selectedUser,
      sender: current
    };
    await sendMessage(messageModel);
    dispatch({ type: SEND_MESSAGE, payload: messageModel });
    setMessage('')
  };

  return (
    <form className="message" method="post" onSubmit={handleSubmit}>
      <div className="input-group input-group-lg">
        <input
          type="text"
          className="form-control form-control-lg bg-transparent border-dark text-light"
          value={message}
          onChange={handleChange}
          name="message"
          placeholder="Enter message"
        />
        <button type="submit" className="btn btn-outline-dark text-light">
          <h3>&raquo;</h3>
        </button>
      </div>
    </form>
  );
};
