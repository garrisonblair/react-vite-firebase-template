import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserData } from "../db/types";

interface UserState {
  user: UserData | null;
  login: (user: UserData) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      reAuthNeeded: {
        google: false,
      },
      login: (user) => set(() => ({ user })),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
    }
  )
);
