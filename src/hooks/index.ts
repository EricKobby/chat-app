import { useContext } from "react"
import { ChatContext } from "../contexts/ChatContext"

export const useAppContext = () => useContext(ChatContext)

export const useAppDispatch = () => {
    const { dispatch } = useContext(ChatContext)
    return dispatch as any
}