import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { createContext, useReducer } from "react";
import { chatReducer } from "../reducers";

export interface ChatState {
  users: Array<User>;
  current: string;
  dispatch?: (e: ReducerAction) => any;
  connection: HubConnection;
  messages: Array<Message>;
  selectedUser: string;
  blockedUsers: Array<any>;
}

const newConnection = new HubConnectionBuilder()
  .withUrl(process.env.REACT_APP_HUB_URL as string)
  .withAutomaticReconnect()
  .build();


const initialState: ChatState = {
  users: [],
  current: "",
  connection: newConnection,
  messages: [],
  selectedUser: '',
  blockedUsers: []
};

export const ChatContext = createContext(initialState);

const ChatProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;
