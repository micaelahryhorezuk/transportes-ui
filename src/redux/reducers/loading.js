
export const defaultState = {
    data: undefined,
};

const loading = (state = defaultState, action) => {
    switch (action.type) {
        case "setLoading":
            return {
                data: action.payload,
            };        
        default:
            return state
    }
}

export default loading;