import React from "react";
import { useUsersSelector } from "../hooks";
import BlockedUser from "./BlockedUser";

const BlockedUsers: React.FC = () => {

  const { blockedUsers } = useUsersSelector();

  
  return (
    <ul className="list-group blocked-users">
      <li className="bg-transparent rounded-0 list-group-item dark-grey">Blocked Users</li>
      {blockedUsers.map((user, index) => (
        <BlockedUser user={user} key={index} />
      ))}
    </ul>
  );
};
export default BlockedUsers