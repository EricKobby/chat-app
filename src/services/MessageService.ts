import * as httpClient from '../httpClient'

export const getChatMessages = async(currentUser: string, selectedUser: string) => {
    return await httpClient.get(generateUri(`${currentUser}/${selectedUser}`))
}
export const sendMessage = async(message: Message) =>{
    return await httpClient.post(generateUri("SendMessage"), message)
}

const generateUri = (action: string) => '/messages/'.concat(action)