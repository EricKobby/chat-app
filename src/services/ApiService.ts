import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL as string
export async function getChatMessages(currentUser: string, selectedUser: string) {
    return await axios.get(baseUrl.concat(`/messages/${currentUser}/${selectedUser}`))
}
