import { toast } from "react-toastify";
import {
    addDishAction,
    editDishAction,
    getRestaurantDishesAction,
    searchDishAction,
    toggleDishAvailabilityAction,
    uploadDishImageAction,
} from "../../../reducers/DishesReducer";
import fetchWithAuth from "../../FetchWithAuth";

export const getRestaurantDishes = (idRestaurant) => {
    return async (dispatch) => {
        try {
            const restaurantDishesResponse = await fetch(
                `https://localhost:7275/api/Dishes/restaurantId/${idRestaurant}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "GET",
                }
            );
            if (restaurantDishesResponse.ok) {
                const restaurantDishesData = await restaurantDishesResponse.json();
                dispatch(getRestaurantDishesAction(restaurantDishesData));
            } else {
                throw new Error("Error fetching data from server!");
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const addDish = (idRestaurant, Name, Description, Ingredients, image) => {
    return async (dispatch) => {
        try {
            const responseData = await fetchWithAuth("https://localhost:7275/api/Dishes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idRestaurant,
                    Name,
                    Description,
                    Ingredients,
                }),
            });
            const data = await responseData;
            console.log("Tutto OK DataPiatto: ", responseData);
            const formData = new FormData();
            formData.append("file", image);
            const imageResponse = await fetchWithAuth(`https://localhost:7275/api/Dishes/${data.idDish}/uploadImage`, {
                method: "PUT",
                body: formData,
            });
            const imageResponseData = await imageResponse.image;
            console.log("Image upload response:", imageResponseData);
            dispatch(addDishAction(responseData));
            toast.success("Piatto aggiunto con successo!");
        } catch (error) {
            console.log(error);
            toast.error("Errore durante l'aggiunta del piatto!");
        }
    };
};

export const editDish = (idDish, Name, Description, Ingredients) => {
    return async (dispatch) => {
        try {
            const responseData = await fetchWithAuth(`https://localhost:7275/api/Dishes/edit/${idDish}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Name,
                    Description,
                    Ingredients,
                }),
            });
            dispatch(editDishAction(responseData));
            toast.success("Piatto modificato con successo!");
        } catch (error) {
            console.log(error);
            toast.error("Errore durante la modifica del piatto!");
        }
    };
};

export const toggleDishAvailability = (idDish) => {
    return async (dispatch) => {
        try {
            const responseData = await fetchWithAuth(`https://localhost:7275/api/Dishes/${idDish}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idDish,
                }),
            });
            dispatch(toggleDishAvailabilityAction(responseData));
            if (responseData.isAvailable) {
                toast.success("Piatto reso disponibile con successo!");
            } else {
                toast.success("Piatto reso non disponibile con successo!");
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const uploadDishImage = (idDish, image) => {
    return async (dispatch) => {
        try {
            const formData = new FormData();
            formData.append("file", image);
            const imageResponse = await fetchWithAuth(`https://localhost:7275/api/Dishes/${idDish}/uploadImage`, {
                method: "PUT",
                body: formData,
            });
            console.log("Image Response:", imageResponse);
            dispatch(uploadDishImageAction(imageResponse));
            toast.success("Immagine caricata con successo!");
        } catch (error) {
            console.log(error);
            toast.error("Errore durante il caricamento dell'immagine!");
        }
    };
};

export const searchDishes = (dishName) => {
    return async (dispatch) => {
        try {
            const responseData = await fetchWithAuth(`https://localhost:7275/api/Dishes/search/${dishName}`);

            console.log(responseData);
            dispatch(searchDishAction(responseData));
        } catch (error) {
            console.log(error);
        }
    };
};

export const searchDishesByRestaurant = (restaurantId, dishesName) => {
    return async (dispatch) => {
        try {
            const responseData = await fetchWithAuth(
                `https://localhost:7275/api/Dishes/searchDishes/${restaurantId}/${dishesName}`
            );
            dispatch(searchDishAction(responseData));
        } catch (error) {
            console.log(error);
        }
    };
};
