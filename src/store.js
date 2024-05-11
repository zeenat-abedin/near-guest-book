import { create as createStore } from 'zustand';

export const useStore = createStore((set) => ({
  wallet: undefined,
  signedAccountId: '',
  isRefetch: false,
  setWallet: (wallet) => set({ wallet }),
  setRefetch: (isRefetch) => set({ isRefetch }),
  setSignedAccountId: (signedAccountId) => set({ signedAccountId }),
}));
