import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  return (
    <BrowserRouter>
        <Route exact={true} path="/" component={Login} />
        <Route path="/chat" component={Chat} />
    </BrowserRouter>
  );
}

export default App;
