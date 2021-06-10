import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { listenToUserEvents } from "../events/signalR-user-events";
import { useUsersSelector } from "../hooks";
import { useAppDispatch } from "../store";

const Sidebar: React.FC = ({ children }) => {
  const { logout } = useAuth0();
  const { current, blockedUsers, isConnected } = useUsersSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isConnected) {
      listenToUserEvents({
        current,
        dispatch,
        logout,
        blockedUsers,
      });
    }
  }, [dispatch, logout, current, blockedUsers, isConnected]);
  return <div className="sidebar">{children}</div>;
};

export default Sidebar;
