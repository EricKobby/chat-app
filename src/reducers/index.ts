import { ChatState } from "../contexts/ChatContext";
import * as Actions from "./actions";

//todo: a lot of cases will introduce redux for state management with different reducers
export function chatReducer(state: ChatState, action: ReducerAction): ChatState {

    const { type, payload } = action

    switch (type) {
        case Actions.USER_JOINED:
            return {
                ...state,
                users: payload.users,
                blockedUsers: payload.blockedUsers
            }
        case Actions.NEW_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, payload]
            }
        case Actions.SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, payload]
            }
        case Actions.SET_CONNECTION:
            return {
                ...state,
                connection: payload
            }
        case Actions.SET_MESSAGES:
            return {
                ...state,
                messages: payload
            }
        case Actions.SET_SELECTED_USER:
            return {
                ...state,
                selectedUser: payload
            }
        case Actions.SET_CURRENT_USER:
            return {
                ...state,
                current: payload
            }
        case Actions.USER_LEFT:
            return {
                ...state,
                users: state.users.filter(user => user.email !== payload.email)
            }
        case Actions.USER_BLOCKED:
            return {
                ...state,
                users: state.users.filter((user) => user.email !== payload)
            }
        case Actions.ADD_BLOCKED_USER: {
            return {
                ...state,
                blockedUsers: [...state.blockedUsers, payload],
                users: state.users.filter(user => user.email !== payload)
            }
        }
        case Actions.UNBLOCK_USER:{
            return{
                ...state,
                blockedUsers: state.blockedUsers.filter(u => u !== payload)
            }
        }
        default: return state
    }
}