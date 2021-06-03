import axios from 'axios'

export async function getChatMessages(currentUser: string, selectedUser: string) {
    return await axios.get(`/messages/${currentUser}/${selectedUser}`)
}
