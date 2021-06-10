import { HubConnectionBuilder } from '@microsoft/signalr'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '.';

interface InitialState {
    users: User[]
    current: string
    selectedUser: string
    blockedUsers: any[]
    isConnected: boolean
}

export const connection = new HubConnectionBuilder()
    .withUrl(process.env.REACT_APP_HUB_URL as string)
    .withAutomaticReconnect()
    .build();


const initialState: InitialState = {
    users: Array<User>(),
    current: "",
    selectedUser: "",
    blockedUsers: [],
    isConnected: false
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setConnectionStatus: state => {
            state.isConnected = true
        },
        updateUsers: (state, { payload }) => {
            state.users = payload.users
            state.blockedUsers = payload.blockedUsers
        },
        setSelectedUser: (state, action: PayloadAction<string>) => {
            state.selectedUser = action.payload
        },
        setCurrentUser: (state, action: PayloadAction<string>) => {
            state.current = action.payload
        },
        removeUser: (state, { payload }) => {
            state.users = state.users.filter(user => user.email !== payload.email)
        },
        blockUser: (state, action: PayloadAction<string>) => {
            const { payload } = action
            state.blockedUsers = [...state.blockedUsers, payload]
            state.users = state.users.filter(user => user.email !== payload)
        },
        unblockUser: (state, action: PayloadAction<string>) => {
            state.blockedUsers = state.blockedUsers.filter(b => b !== action.payload)
        },
        addBlockedUser: (state, action: PayloadAction<string>) => {
            state.blockedUsers = [...state.blockedUsers, action.payload]
            state.users = state.users.filter(user => user.email !== action.payload)
        }
    }
})

export const userActions = userSlice.actions

export default userSlice.reducer

export const startConnectionAsync = () => async (dispatch: AppDispatch) => {
    await connection.start()
    dispatch(userActions.setConnectionStatus())
}