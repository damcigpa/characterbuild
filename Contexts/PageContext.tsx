'use client'
import React, {createContext, ReactNode, useContext} from "react"

type PageContextType = {
    name: string;
}

type UserContextProviderProps = {
    children: ReactNode;
};

const PageContext = createContext<PageContextType |undefined>(undefined)


export const PageContextProvider = ({children}: UserContextProviderProps) => {
    return (
        <PageContext.Provider value={{name: "Page"}}>
            {children}
        </PageContext.Provider>
    )
};

export const usePageContext = () => useContext(PageContext)