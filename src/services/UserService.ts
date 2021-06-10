import * as httpClient from '../httpClient'


export const Join = async (user: User) => {
    return await httpClient.post(generateUri("join"), user);
}

export const BlockUser = async (userEmail: string, currentUser: string) => {
    return await httpClient.post(generateUri("block"), { userEmail, currentUser })
}

export const unBlockUser = async (userEmail: string, currentuser: string) => {
    return await httpClient.post(generateUri("unblock"), { userEmail, currentuser })
}

const generateUri = (action: string) => '/users/'.concat(action)
