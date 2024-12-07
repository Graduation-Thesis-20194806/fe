import { StateCreator } from "zustand";

export interface UserStore {
  username: string;
  avatar?: string;
  userId?: number;
  setUser: (data: { username?: string; avatar?: string; userId?: number }) => void;
}

export const createUserStore: StateCreator<UserStore> = (set) => ({
  username: "",
  setUser: (data) =>
    set((state) => ({ ...state, ...data})),
});
