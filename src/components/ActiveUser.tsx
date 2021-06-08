import React from "react";
import { useAppContext, useAppDispatch } from "../hooks";
import { SET_MESSAGES, SET_SELECTED_USER } from "../reducers/actions";
import { getChatMessages } from "../services/MessageService";
import { BlockUser } from '../services/UserService'

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
  const handleBlockClick = async (e: React.SyntheticEvent<HTMLSpanElement>) =>{
    e.preventDefault()
    e.stopPropagation()
    await BlockUser(user.email, current);
  }
  return (
    <button
      onClick={handleClick}
      className="list-group-item d-flex justify-content-between text-light align-items-center rounded-0 bg-transparent"
    >
      {user.email}
      <span className="badge bg-danger rounded-pill" onClick={handleBlockClick}>Block</span>
    </button>
  );
};
