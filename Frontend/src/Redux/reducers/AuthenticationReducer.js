import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "../actions/Authentication/AuthenticationAction";

const initalState = {
    isAuthenticated: false,
    user: null,
    error: null,
};

const AuthenticationReducer = (state = initalState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: false,
            };
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};
export default AuthenticationReducer;
