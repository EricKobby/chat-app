import { ADD_BLOCKED_USER, USER_BLOCKED, USER_JOINED, USER_LEFT } from '../reducers/actions';
import { LogoutOptions } from '@auth0/auth0-react'
import { HubConnection } from '@microsoft/signalr';

interface Subscription {
    connection: HubConnection
    current: string
    dispatch: any
    logout: (options?: LogoutOptions | undefined) => void;
    blockedUsers: Array<any>;
}

export const listenToUserEvents = (options: Subscription) => {

    const { connection, current, dispatch, blockedUsers } = options


    connection.on("UserJoined", (users, joinedUser) => {

        let blocked = [...joinedUser.blockedUsers]
        let activeUsers = [...users].filter(a => a.email !== current)

        if (current === joinedUser.email) {

            activeUsers = activeUsers.filter(x => !blocked.some(a => a.blockedEmail === x.email))
            dispatch({
                type: USER_JOINED, payload: {
                    users: activeUsers,
                    blockedUsers: joinedUser.blockedUsers.map((b: any) => b.blockedEmail)
                }
            });
        }
        else {
            //check if you have been blocked by user 
            const BlockedUser = blockedUsers.find(b => b === joinedUser.email);

            if (BlockedUser) {
                activeUsers = activeUsers.filter(x => x.email !== BlockedUser)
            }
            dispatch({
                type: USER_JOINED, payload: {
                    users: activeUsers.filter((x: User) => x.email !== current),
                    blockedUsers: blockedUsers
                }
            });
        }

    });

    connection.on("UserLeft", (user) => {
        dispatch({ type: USER_LEFT, payload: user });
    });

    connection.on("UserBlocked", ({ userEmail, currentUser }) => {
        if (current === userEmail) {
            dispatch({ type: USER_BLOCKED, payload: { currentUser } });
        }

        if (current === currentUser) {
            dispatch({ type: ADD_BLOCKED_USER, payload: userEmail })
        }
    });
}