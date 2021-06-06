import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppContext, useAppDispatch } from "../hooks";
import { SET_CONNECTION } from "../reducers/actions";
import { ActiveUsers } from "./ActiveUsers";
import { MessageBox } from "./MessageBox";
import { Messages } from "./Messages";
import { Join } from "../services/UserService";
import { HubConnectionState } from "@microsoft/signalr";

const Chat: React.FC = () => {
  const { user } = useAuth0();
  const { connection, selectedUser } = useAppContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function init() {
      try {
        await connection.start();
        dispatch({ type: SET_CONNECTION, payload: connection });
      } catch (err) {
        console.log(err);
      }
    }
    init();
  }, [connection, dispatch]);

  useEffect(() => {
    if (user && connection.state === HubConnectionState.Connected) {
      Join({
        email: user?.email as string,
        name: user?.name as string,
        connectionId: connection.connectionId as string,
      }).then(() => console.log(connection.connectionId));
    }
  }, [user, connection]);

  return (
    <div className="chat-page">
      <div className="chat-container">
        <ActiveUsers />
        <Messages />
        {selectedUser && <MessageBox />}
      </div>
    </div>
  );
};

export default Chat;
