const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false, // stop fetching as we finished our process
                error: false
            };
        case "LOGIN_FAILURE":
            return {
                user: null, //No user fetched as login failed
                isFetching: false,
                error: true
            };
        case "UPDATE_START":
            return {
                ...state,
                isFetching: true
            };
        case "UPDATE_SUCCESS":
            return {
                user: action.payload,
                isFetching: false, // stop fetching as we finished our process
                error: false
            };
        case "UPDATE_FAILURE":
            return {
                user: state.user,
                isFetching: false,
                error: true
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false
            };

        default:
            return state;
    }
};

export default Reducer;