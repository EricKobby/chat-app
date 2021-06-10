import { userActions } from '../store/users.slice'
import { LogoutOptions } from '@auth0/auth0-react'
import { AppDispatch } from '../store';
import { connection } from '../store/users.slice'
interface Subscription {
    current: string
    dispatch: AppDispatch
    logout: (options?: LogoutOptions | undefined) => void;
    blockedUsers: Array<any>;
}

export const listenToUserEvents = (options: Subscription) => {

    const { current, dispatch, blockedUsers } = options


    connection.on("UserJoined", (users, joinedUser) => {

        let blocked = [...joinedUser.blockedUsers]
        let activeUsers = [...users].filter(a => a.email !== current)

        if (current === joinedUser.email) {

            activeUsers = activeUsers.filter(x => !blocked.some(a => a.blockedEmail === x.email))
            dispatch(userActions.updateUsers({
                users: activeUsers,
                blockedUsers: joinedUser.blockedUsers.map((b: any) => b.blockedEmail)
            }));
        }
        else {
            //check if you have been blocked by user 
            const BlockedUser = blockedUsers.find(b => b === joinedUser.email);

            if (BlockedUser) {
                activeUsers = activeUsers.filter(x => x.email !== BlockedUser)
            }
            dispatch(userActions.updateUsers({
                users: activeUsers.filter((x: User) => x.email !== current),
                blockedUsers: blockedUsers
            }));
        }

    });

    connection.on("UserLeft", (user) => {
        dispatch(userActions.removeUser(user));
    });

    connection.on("UserBlocked", ({ userEmail, currentUser }) => {
        if (current === userEmail) {
            dispatch(userActions.blockUser(currentUser));
        }

        if (current === currentUser) {
            dispatch(userActions.addBlockedUser(userEmail))
        }
    });
}