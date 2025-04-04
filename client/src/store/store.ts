import { create } from "zustand";
import { User } from "../types/types";

interface UserState {
  user: User;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: { username: "", email: "" },
  setUser: (user: User) => set({ user: user }),
}));
