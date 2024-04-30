import { toast } from "react-toastify";
import {
    addIngredientAction,
    editIngredientAction,
    getIngredientsAction,
    searchIngredientAction,
} from "../../reducers/IngredientsReducer";
import fetchWithAuth from "../FetchWithAuth";

export const getIngredients = (idRestaurant) => {
    return async (dispatch) => {
        try {
            const responseData = await fetchWithAuth(`https://localhost:7275/api/Ingredients/${idRestaurant}`);
            dispatch(getIngredientsAction(responseData));
        } catch (error) {
            console.log(error);
        }
    };
};

export const addIngredient = (newIngredient) => {
    return async (dispatch) => {
        try {
            const responseData = await fetchWithAuth(`https://localhost:7275/api/Ingredients`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newIngredient),
            });

            toast.success("Ingrediente aggiunto con successo!");
            dispatch(addIngredientAction(responseData));
        } catch (error) {
            console.log(error);
            toast.error("Errore durante l'aggiunta dell'ingrediente!");
        }
    };
};

export const editIngredient = (idIngredient, Name, Price) => {
    return async (dispatch) => {
        try {
            const responseData = await fetchWithAuth(`https://localhost:7275/api/Ingredients/${idIngredient}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Name, Price }),
            });

            toast.success("Ingrediente modificato con successo!");
            dispatch(editIngredientAction(responseData));
        } catch (error) {
            console.log(error);
            toast.error("Errore durante la modifica dell'ingrediente!");
        }
    };
};

export const searchIngredient = (ingredientName) => {
    return async (dispatch) => {
        try {
            const responseData = await fetchWithAuth(`https://localhost:7275/api/Ingredients/search/${ingredientName}`);
            dispatch(searchIngredientAction(responseData));
        } catch (error) {
            console.log(error);
        }
    };
};
