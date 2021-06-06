import * as httpClient from '../httpClient'
import { User } from '../contexts/ChatContext'

export const Join = async (user: User) => {
    return await httpClient.post("/messages/Join",user);
}

