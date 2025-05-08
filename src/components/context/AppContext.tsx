"use client"

import { useRouter } from "next/navigation"
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
  } from "react";
import { LoginForm } from "../login/loginForm";
import { UserInfo } from "@/lib/types";

type AppContextType = {
    userInfo: UserInfo | null;
    setUserInfo: Dispatch<SetStateAction<UserInfo | null>>;
    logout: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode}) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
   
    const router = useRouter();

    function logout() {
        setUserInfo(null);
        router.push("/login");
    }

    return (
        <AppContext.Provider 
            value={{
                userInfo,
                setUserInfo,
                logout,
            }}
        >
            {!!userInfo ? children : <LoginForm />}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("AppContext must be used withing an AppContextProvider");
    }
    return context;
};