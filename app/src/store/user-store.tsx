import type { User } from "@/types/user";
import { create } from "zustand";
import { removeAuthorization } from "@/apis/config";

interface UserState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface UserAction {
  setUser: (user: User | null) => void
  setIsLoading: (isLoading: boolean) => void
  logout: () => void
}

const useUserStore = create<UserState & UserAction>()((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,

  setUser: (user: User | null): void => set({
    user,
    isAuthenticated: !!user
  }),

  setIsLoading: (isLoading: boolean): void => set({ isLoading }),

  logout: (): void => {
    removeAuthorization()
    set({ user: null, isAuthenticated: false })
  },
}))

export default useUserStore