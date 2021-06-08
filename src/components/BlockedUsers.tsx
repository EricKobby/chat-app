import React from "react";
import { useAppContext } from "../hooks";
import BlockedUser from "./BlockedUser";

const BlockedUsers: React.FC = () => {

  const { blockedUsers } = useAppContext();

  
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