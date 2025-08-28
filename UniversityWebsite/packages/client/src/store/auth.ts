import { create } from "zustand";

type AuthStore = {};

const useAuthStore = create<AuthStore>((set) => {
    return {};
});

export { useAuthStore };
