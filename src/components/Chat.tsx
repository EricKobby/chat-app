import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { HubConnectionState } from "@microsoft/signalr";
import { useAppContext, useAppDispatch } from "../hooks";
import { SET_CONNECTION } from "../reducers/actions";
import { ActiveUsers } from "./ActiveUsers";
import { MessageBox } from "./MessageBox";
import { Messages } from "./Messages";

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
  }, []);

  useEffect(() => {
    if (connection.state === HubConnectionState.Connected) {
      connection.send("Join", {
        email: user?.email,
        name: user?.name,
      });
    }
  }, [user]);

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