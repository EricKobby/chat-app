import React, { useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useAppContext, useAppDispatch } from "../hooks";
import { SET_CONNECTION } from "../reducers/actions";
import { ActiveUsers } from "./ActiveUsers";
import { MessageBox } from "./MessageBox";
import { Messages } from "./Messages";
import { Join } from "../services/UserService";
import Login from "./Login";
import Sidebar from "./Sidebar";
import BlockedUsers from "./BlockedUsers";
import { HubConnectionState } from "@microsoft/signalr";

const Chat: React.FC = () => {
  const { user } = useAuth0();
  const { connection, selectedUser } = useAppContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function init() {
      try {
        if (connection.state !== HubConnectionState.Connected) {
          await connection.start();
          dispatch({ type: SET_CONNECTION, payload: connection });
        }
      } catch (err) {
        console.log(err);
      }
    }
    init();
    if (user && connection.state === HubConnectionState.Connected) {
      Join({
        email: user?.email as string,
        name: user?.name as string,
        connectionId: connection.connectionId as string
      });
    }
  }, [connection, dispatch, user, connection.connectionId]);

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
