import { getCategoriesAction } from "../../reducers/CategoryReducer";

export const getCategories = () => {
    return async (dispatch) => {
        try {
            const response = await fetch("https://localhost:7275/api/Categories");
            if (!response.ok) {
                throw new Error("Error fetching data from server!");
            }
            const data = await response.json();

            dispatch(getCategoriesAction(data));
        } catch (error) {
            console.log(error);
        }
    };
};
