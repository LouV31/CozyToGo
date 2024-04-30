export const GET_LOCATION = "GET_LOCATION";
export const GET_SUGGESTIONS = "GET_SUGGESTIONS";
export const CLEAR_SUGGESTIONS = "CLEAR_SUGGESTIONS";

export const getLocation = (address) => {
    return async (dispatch) => {
        try {
            const responseLocation = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
            const locationData = await responseLocation.json();

            dispatch({
                type: GET_LOCATION,
                payload: locationData,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getSuggestions = (address) => {
    return async (dispatch) => {
        try {
            const responseSuggestions = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
            );
            const suggestionsData = await responseSuggestions.json();

            dispatch({
                type: GET_SUGGESTIONS,
                payload: suggestionsData,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const clearSuggestions = () => ({
    type: CLEAR_SUGGESTIONS,
});
