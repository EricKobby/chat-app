import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { listenToUserEvents } from "../events/signalR-user-events";
import { useAppContext } from "../hooks";

const Sidebar: React.FC = ({ children }) => {
  const { logout } = useAuth0();
  const { connection, dispatch, current, blockedUsers } = useAppContext();

  useEffect(() => {
    listenToUserEvents({
      connection,
      current,
      dispatch,
      logout,
      blockedUsers,
    });

    return () =>{
        connection.off("UserJoined")
        connection.off("UserBlocked")
    }
  }, [connection, dispatch, logout, current, blockedUsers]);
  return <div className="sidebar">{children}</div>;
};

export default Sidebar;
