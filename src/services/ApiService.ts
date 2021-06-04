import axios, { AxiosResponse } from 'axios'

const baseUrl = process.env.REACT_APP_API_URL as string
export async function getChatMessages(currentUser: string, selectedUser: string): Promise<AxiosResponse<any>> {
    return await axios.get(baseUrl.concat(`/messages/${currentUser}/${selectedUser}`))
}
