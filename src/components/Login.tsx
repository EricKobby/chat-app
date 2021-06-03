import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  const handleClick = async () => await loginWithRedirect();

  return (
    <div className="login-wrap">
      <button className="btn btn-outline-success rounded-0 btn-lg w-75" onClick={handleClick}>
        Sign In
      </button>
    </div>
  );
};

export default Login;
