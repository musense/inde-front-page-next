import { createContext } from 'react';
import * as types from "./types";


export const MainContext = createContext<types.StateProps | null>(null);
// export const MainDispatchContext = createContext(null);