import React from "react";
import { useUsersSelector } from "../hooks";
import { unBlockUser } from "../services/UserService";
import { useAppDispatch } from "../store";
import { userActions } from "../store/users.slice";

const BlockedUser: React.FC<{ user: string }> = ({ user }) => {
  const dispatch = useAppDispatch();
  const { current } = useUsersSelector();

  const handleUnblock = async (e: React.SyntheticEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(userActions.unblockUser(user));
    await unBlockUser(user, current);
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
