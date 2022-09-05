
export const defaultState = {
    data: undefined,
};

const dialog = (state = defaultState, action) => {
    switch (action.type) {
        case "setDialog":
            return {
                data: action.payload,
            };        
        default:
            return state
    }
}

export default dialog;