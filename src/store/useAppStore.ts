import { create } from "zustand";
import { signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

type AppState = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  logout: async () => {
    await signOut(auth);
    set({ user: null });
  },
}));
