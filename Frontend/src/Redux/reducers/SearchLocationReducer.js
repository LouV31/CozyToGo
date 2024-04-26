import { CLEAR_SUGGESTIONS, GET_LOCATION, GET_SUGGESTIONS } from "../actions/Home/SearchLocationAction";

const initialState = {
    location: null,
    suggestions: null,
};

const SearchLocationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOCATION:
            return {
                ...state,
                location: action.payload,
            };
        case GET_SUGGESTIONS:
            return {
                ...state,
                suggestions: action.payload,
            };
        case CLEAR_SUGGESTIONS:
            return {
                ...state,
                suggestions: null,
            };
        default:
            return state;
    }
};
export default SearchLocationReducer;
