import React, { useEffect } from "react";
import { useAppContext, useAppDispatch } from "../hooks";
import { SET_CURRENT_USER, USER_JOINED } from "../reducers/actions";
import { User } from "../contexts/ChatContext";
import { ActiveUser } from "./ActiveUser";
import { useAuth0 } from "@auth0/auth0-react";

export const ActiveUsers: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, connection } = useAppContext();
  const { user } = useAuth0();

  useEffect(() => {
    connection.on("UserJoined", function (users) {
      dispatch({ type: USER_JOINED, payload: users });
    });
  }, [connection, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch({ type: SET_CURRENT_USER, payload: user?.email });
    }
}, [user, dispatch]);

  return (
    <div className="sidebar">
      <ul className="list-group">
        <li className="list-group-item active bg-success border-0 rounded-0">
          {user?.email}
          <hr />
        </li>
        {renderActiverUsers(users)}
      </ul>
    </div>
  );
};

function renderActiverUsers(users: User[]) {
  return users.map((user, index) => <ActiveUser key={index} user={user} />);
}
