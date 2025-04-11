
import { createContext, useState, useContext, ReactNode } from "react";
import { ContextType } from "./types";

const AppContext = createContext<ContextType | null>(null);

export const ReactProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState({
        img: "",
        aspect: 0,
        cropped: "",
        country: "",
        dimensions: {
            width: 35,
            height: 35,
            unit: "mm",
            widthPx: 0,
            heightPx: 0
        },
        token: "",
        loading: false
    });

    return (
        <AppContext.Provider value = {{ state, setState }}>
            {children}
        </AppContext.Provider>
    );
};

export const Context = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('AppContext must be used inside AppProvider');
    return context;
};
