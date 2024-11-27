import getRandomColor from '@/common/libs/getRandomColor'
import { StateCreator } from 'zustand'

export interface UserStore {
  username: string
  userColor: string
  setUsername: (newUsername: string) => void
  setUserColor: (newUsername: string) => void
}

export const createUserStore: StateCreator<UserStore> = (set) => ({
  username: '',
  userColor: getRandomColor(),
  setUsername: (newUsername: string) => set(() => ({ username: newUsername })),
  setUserColor: (newUserColor: string) =>
    set(() => ({ userColor: newUserColor })),
})
