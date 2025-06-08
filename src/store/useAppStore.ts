import { create } from "zustand";
import { signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export interface ProfileData {
  firstName: string;
  lastName: string;
  city?: string;
  areas?: string;
  mobile: string;
}

type AppState = {
  user: User | null;
  loading: boolean;
  profileData: ProfileData | null;
  setProfileData: (profileData: ProfileData) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
};

export const useAppStore = create<AppState>((set) => ({
  user: null,
  loading: true,
  profileData: null,
  setProfileData: (profileData) => set({ profileData }),
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  logout: async () => {
    await signOut(auth);
    set({ user: null });
  },
}));
