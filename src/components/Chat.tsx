import React, { useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useUsersSelector } from "../hooks";
import { ActiveUsers } from "./ActiveUsers";
import { MessageBox } from "./MessageBox";
import { Messages } from "./Messages";
import { Join } from "../services/UserService";
import Login from "./Login";
import Sidebar from "./Sidebar";
import BlockedUsers from "./BlockedUsers";
import { connection, startConnectionAsync } from "../store/users.slice";
import { useAppDispatch } from "../store";

const Chat: React.FC = () => {
  const { user } = useAuth0();
  const { selectedUser, isConnected } = useUsersSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startConnectionAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user && isConnected) {
      Join({
        email: user?.email as string,
        name: user?.name as string,
        connectionId: connection.connectionId as string
      });
    }
  }, [user, isConnected]);

  return (
    <div className="chat-page">
      <div className="chat-container">
        <Sidebar>
          <ActiveUsers />
          <BlockedUsers />
        </Sidebar>
        <Messages />
        {selectedUser && <MessageBox />}
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Chat, {
  onRedirecting: () => <Login />,
});
