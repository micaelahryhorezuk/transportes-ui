
export const defaultState = {
    data: undefined,
};

const toaster = (state = defaultState, action) => {
    switch (action.type) {
        case "setToaster":
            return {
                data: action.payload,
            };        
        default:
            return state
    }
}

export default toaster;