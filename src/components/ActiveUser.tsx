import React from "react";
import { useAppDispatch } from "../store";
import { getChatMessages } from "../services/MessageService";
import { BlockUser } from "../services/UserService";
import { userActions } from "../store/users.slice";
import {messageActions } from '../store/message.slice'

import { useUsersSelector } from "../hooks";

export const ActiveUser: React.FC<{ user: User }> = ({ user }) => {
  const { selectedUser, current } = useUsersSelector();
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    if (user.email !== selectedUser) {
      dispatch(userActions.setSelectedUser(user.email));
      const { data: messages } = await getChatMessages(current, user.email);
      dispatch(messageActions.setMessages(messages));
    }
  };
  const handleBlockClick = async (e: React.SyntheticEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await BlockUser(user.email, current);
  };
  return (
    <button
      onClick={handleClick}
      className="list-group-item d-flex justify-content-between text-light align-items-center rounded-0 bg-transparent"
    >
      {user.email}
      <span className="badge bg-danger rounded-pill" onClick={handleBlockClick}>
        Block
      </span>
    </button>
  );
};
