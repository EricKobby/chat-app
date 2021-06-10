import { useAppSelector } from "../store"

export const useUsersSelector = () => useAppSelector(state => state.user)
export const useMessageSelector = () => useAppSelector(state => state.message)
