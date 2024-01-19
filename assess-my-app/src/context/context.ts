import {createContext} from "react";

export const StateContext = createContext<any>(null);
export const DispatchContext = createContext((() => {}) as any);

