import React, { useEffect } from "react";
import { useUsersSelector } from "../hooks";
import { userActions } from '../store/users.slice'
import { ActiveUser } from "./ActiveUser";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch } from "../store";

export const ActiveUsers: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useUsersSelector();
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      dispatch(userActions.setCurrentUser(user?.email as string));
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
