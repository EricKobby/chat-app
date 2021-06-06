import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL as string

export const post = async (uri: string, data?: any) => {
    return await axios.post(baseUrl.concat(uri), data)
}

export const get = async(uri: string) =>{
    return await axios.get(baseUrl.concat(uri));
}