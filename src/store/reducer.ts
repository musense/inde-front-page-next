import {
    StateProps,
    ReducerAction,
    ReducerActionEnum,
} from './types';


const initialState: StateProps = {
    clientWidth: 0,
    clientHeight: 0,
    contents: '',
    categoryName: '',
    pathname: '',
    lastPathname: '',
}

const mainReducer = (
    state: StateProps,
    action: ReducerAction
) => {
    switch (action.type) {
        case ReducerActionEnum.SET_WINDOW_SIZE:
            return {
                ...state,
                clientWidth: action.payload.width,
                clientHeight: action.payload.height,
            };
        case ReducerActionEnum.SET_ALL_CONTENTS:
            return {
                ...state,
                contents: action.payload.contents,
            };
        case ReducerActionEnum.SET_CATEGORY_NAME:
            return {
                ...state,
                categoryName: action.payload.categoryName,
            };
        case ReducerActionEnum.SET_PATHNAME:
            return {
                ...state,
                pathname: action.payload.pathname,
            };
        case ReducerActionEnum.SET_LAST_PATHNAME:
            return {
                ...state,
                lastPathname: action.payload.lastPathname,
            };
        default:
            throw Error('Unknown action: ' + action.type);
    }
}

export { mainReducer, initialState }