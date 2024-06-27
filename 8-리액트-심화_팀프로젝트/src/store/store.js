import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isSignedIn: null,
  setSignIn: (status) => set({ isSignedIn: status }),
}));

export default useAuthStore;