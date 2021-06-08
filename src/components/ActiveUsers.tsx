import React, { useEffect } from "react";
import { useAppContext, useAppDispatch } from "../hooks";
import { SET_CURRENT_USER } from "../reducers/actions";
import { ActiveUser } from "./ActiveUser";
import { useAuth0 } from "@auth0/auth0-react";

export const ActiveUsers: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppContext();
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      dispatch({ type: SET_CURRENT_USER, payload: user?.email });
    }
  }, [user, dispatch]);

  return (
    <ul className="list-group active-users">
        <li className="list-group-item bg-success text-light border-0">
          {user?.email}
          <hr />
        </li>
        {renderActiverUsers(users)}
      </ul>
  );
};

function renderActiverUsers(users: User[]) {
  return users.map((user, index) => <ActiveUser key={index} user={user} />);
}
