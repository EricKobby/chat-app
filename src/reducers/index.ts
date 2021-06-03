import { ChatState } from "../contexts/ChatContext";
import * as Actions from "./actions";

export interface ReducerAction {
    type: string;
    payload: any;
}

export function chatReducer(state: ChatState, action: ReducerAction): ChatState {
    
    const { type, payload } = action

    switch (type) {
        case Actions.USER_JOINED:
            return {
                ...state,
                users: payload
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
            return{
                ...state,
                selectedUser: payload
            }
        case Actions.SET_CURRENT_USER:
            return{
                ...state,
                current: payload
            }
        default: return state
    }
}