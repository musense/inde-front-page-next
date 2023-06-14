import { createContext, useReducer, useMemo, useContext} from 'react';
import { mainReducer, initialState } from "./reducer";


const MainContext = createContext(null);

export function Context({ children }) {
    const [state, dispatch] = useReducer(mainReducer, initialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return (
        <MainContext.Provider value={contextValue} >
            {children}
        </MainContext.Provider>
    )
}


export function useAppContext() {
    return useContext(MainContext);
}