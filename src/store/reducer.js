const initialState = {
    contents: null,
    clientWidth: null,
    clientHeight: null,
}

const mainReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WINDOW_SIZE':
            return {
                ...state,
                clientWidth: action.payload.width,
                clientHeight: action.payload.height,
            };
        case 'SET_ALL_CONTENTS':
            return {
                ...state,
                contents: action.payload,
            };
        default:
            throw Error('Unknown action: ' + action.type);
    }
}

export { mainReducer, initialState }