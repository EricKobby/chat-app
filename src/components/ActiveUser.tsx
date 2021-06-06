import React from "react";
import { User } from "../contexts/ChatContext";
import { useAppContext, useAppDispatch } from "../hooks";
import { SET_MESSAGES, SET_SELECTED_USER } from "../reducers/actions";
import { getChatMessages } from "../services/MessageService";

export const ActiveUser: React.FC<{ user: User }> = ({ user }) => {
  const { current, selectedUser } = useAppContext();
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    if (user.email !== selectedUser) {
      dispatch({ type: SET_SELECTED_USER, payload: user.email });
      const { data: messages } = await getChatMessages(current, user.email);
      dispatch({ type: SET_MESSAGES, payload: messages });
    }
  };
  return (
    <button
      onClick={handleClick}
      className="list-group-item d-flex justify-content-between align-items-center rounded-0 text-light bg-transparent"
    >
      {user.email}
      <span className="badge bg-danger rounded-pill">Block</span>
    </button>
  );
};
