import React from "react";
import { User } from "../contexts/ChatContext";
import { useAppContext, useAppDispatch } from "../hooks";
import { SET_MESSAGES, SET_SELECTED_USER } from "../reducers/actions";
import { getChatMessages } from "../services/ApiService";

export const ActiveUser: React.FC<{ user: User }> = ({ user }) => {
  const { current } = useAppContext();
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    dispatch({ type: SET_SELECTED_USER, payload: user.email });
    const { data: messages } = await getChatMessages(current, user.email);
    dispatch({ type: SET_MESSAGES, payload: messages });
  };
  return (
    <button onClick={handleClick} className="list-group-item active rounded-0">
      {user.email}
    </button>
  );
};
