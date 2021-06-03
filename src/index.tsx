import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatProvider from "./contexts/ChatContext";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-8c3kqzgs.us.auth0.com"
      clientId="sK7ZNAdJ5MbkEDpsUaX3nGRym1yDQ12J"
      redirectUri={window.location.origin.concat("/chat")}
    >
      <ChatProvider>
        <App />
      </ChatProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
