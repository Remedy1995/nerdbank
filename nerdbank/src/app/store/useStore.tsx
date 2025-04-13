import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TransferStore {
    transfers: Array<[]>,
    setTransfers: (transfer: string) => void
}


export const useTransferStore = create<TransferStore>()(
    persist(
        (set) => ({
            transfers: [],
            setTransfers: (transfer: any) =>
                set({transfers : transfer}),
        }),
        {
            name: "transfer-storage",
            storage: {
                getItem: (key) => {
                    const value = sessionStorage.getItem(key);
                    return value ? JSON.parse(value) : null; // ✅ Parse stored JSON
                },
                setItem: (key, value) => {
                    sessionStorage.setItem(key, JSON.stringify(value)); // ✅ Stringify value
                },
                removeItem: (key) => sessionStorage.removeItem(key),
            },
        }
    )
);




interface AuthStore {
    auth: { token: string; user: object } | null;
    setAuth: (auth: { token: string; user: object }) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            auth: null,
            setAuth: (auth) => set({ auth }),
        }),
        {
            name: "auth-storage",
            storage: {
                getItem: (key) => {
                    const value = sessionStorage.getItem(key);
                    return value ? JSON.parse(value) : null;
                },
                setItem: (key, value) => {
                    sessionStorage.setItem(key, JSON.stringify(value));
                },
                removeItem: (key) => sessionStorage.removeItem(key),
            },
        }
    )
);


interface MessageStore {
     message : string;
    setMessage: (message : string) => void;
}

export const useMessageStore = create<MessageStore>()(
    persist(
        (set) => ({
             message: "",
            setMessage: (message) => set({ message }),
        }),
        {
            name: "auth-message",
            storage: {
                getItem: (key) => {
                    const value = sessionStorage.getItem(key);
                    return value ? JSON.parse(value) : null;
                },
                setItem: (key, value) => {
                    sessionStorage.setItem(key, JSON.stringify(value));
                },
                removeItem: (key) => sessionStorage.removeItem(key),
            },
        }
    )
);

