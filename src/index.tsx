import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain="dev-8c3kqzgs.us.auth0.com"
      clientId="sK7ZNAdJ5MbkEDpsUaX3nGRym1yDQ12J"
      redirectUri={window.location.origin.concat("/chat")}
    >
      <App />
    </Auth0Provider>
  </Provider>,
  document.getElementById("root")
);
