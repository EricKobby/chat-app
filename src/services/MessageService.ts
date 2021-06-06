import * as httpClient from '../httpClient'

export const getChatMessages = async(currentUser: string, selectedUser: string) => {
    return await httpClient.get(`/messages/${currentUser}/${selectedUser}`)
}
export const sendMessage = async(message: Message) =>{
    return await httpClient.post("/messages/SendMessage", message)
}