import React from "react";
import { useAppContext, useAppDispatch } from '../hooks'
import { UNBLOCK_USER } from "../reducers/actions";
import { UnBlockUser } from "../services/UserService";

const BlockedUser: React.FC<{ user: string }> = ({ user }) => {
  
    const dispatch = useAppDispatch()
    const { current } = useAppContext()

    const handleUnblock = async (e: React.SyntheticEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({type: UNBLOCK_USER, payload: user})
    await UnBlockUser(user, current)
  };
  return (
    <button className="list-group-item d-flex justify-content-between align-items-center rounded-0 text-light bg-transparent">
      <s>{user}</s>
      <span className="badge bg-success rounded-pill" onClick={handleUnblock}>
        Unblock
      </span>
    </button>
  );
};
export default BlockedUser;
