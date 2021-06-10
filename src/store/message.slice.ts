import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const messageSlice = createSlice({
    initialState: { messages: Array<Message>() },
    name: 'message',
    reducers: {
        addNewMessage: (state, action: PayloadAction<Message>) => {
            state.messages = [...state.messages, action.payload]
        },
        setMessages: (state, action: PayloadAction<Array<Message>>) => {
            state.messages = action.payload
        }
    }
})

export const messageActions = messageSlice.actions

export default messageSlice.reducer