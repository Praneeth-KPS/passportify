
import React from "react";

export type AppState = {
    img: string;
    aspect: number;
    cropped: string;
    dimensions: {
        width: number,
        height: number,
        unit: string,
        widthPx: number,
        heightPx: number
    };
    token: string;
};

export type ContextType = {
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
};
