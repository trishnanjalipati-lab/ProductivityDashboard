import React, { createContext, useContext } from "react";

export const Themecontext= createContext({
    mode: "light",
    lightmode: () => { },
    darkmode: () => { }
})

export const Themeprovider=Themecontext.Provider
export default function usetheme(){
    return useContext(Themecontext)
}