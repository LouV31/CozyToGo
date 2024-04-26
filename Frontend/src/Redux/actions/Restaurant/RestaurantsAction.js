import { toast } from "react-toastify";
import {
    addRestaurantAction,
    editRestaurantAction,
    getRestaurantsAction,
    getSingleRestaurantAction,
    searchRestaurantAction,
    toggleRestaurantAction,
    uploadImageAction,
} from "../../reducers/RestaurantReducer";
import fetchWithAuth from "../FetchWithAuth";

export const getRestaurant = () => {
    return async (dispatch) => {
        try {
            const restaurantResponse = await fetch("https://localhost:7275/api/Restaurants");
            if (restaurantResponse.ok) {
                const restaurantData = await restaurantResponse.json();
                console.log(restaurantData);
                dispatch(getRestaurantsAction(restaurantData));
            } else {
                throw new Error("Error fetching data from server!");
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getSingleRestaurant = (idRestaurant) => {
    return async (dispatch) => {
        try {
            const restaurantResponse = await fetch(`https://localhost:7275/api/Restaurants/${idRestaurant}`);
            if (restaurantResponse.ok) {
                const restaurantData = await restaurantResponse.json();
                console.log(restaurantData);
                dispatch(getSingleRestaurantAction(restaurantData));
            } else {
                throw new Error("Error fetching data from server!");
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getRestaurantByOwner = () => {
    return async (dispatch) => {
        try {
            const restaurantData = await fetchWithAuth(`https://localhost:7275/api/Restaurants/ownerRestaurant`);
            dispatch(getSingleRestaurantAction(restaurantData));
            console.log(restaurantData);
        } catch (error) {
            console.log(error);
        }
    };
};

export const searchRestaurant = (restaurantName) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`https://localhost:7275/api/Restaurants/search/${restaurantName}`);
            if (!response.ok) {
                throw new Error("Error fetching data from server!");
            }
            const data = await response.json();
            console.log(data);
            dispatch(searchRestaurantAction(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const addRestaurantAndOwner = (
    ownerName,
    ownerSurname,
    ownerEmail,
    ownerPassword,
    name,
    category,
    address,
    city,
    zipCode,
    description,
    openingHours,
    closingHours,
    closingDay,
    phone,
    email,
    image
) => {
    return async (dispatch) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${address},${city},${zipCode}`
            );
            if (!response.ok) {
                throw new Error("Error fetching location data, HttpStatus: " + response.status);
            }
            const locationData = await response.json();
            console.log("Location data:", locationData);
            const latitude = locationData[0].lat;
            const longitude = locationData[0].lon;

            const restaurantAndOwnerData = {
                NewRestaurant: {
                    name,
                    category,
                    address,
                    city,
                    zipCode,
                    latitude,
                    longitude,
                    description,
                    openingHours,
                    closingHours,
                    closingDay,
                    phone,
                    email,
                },
                NewOwner: {
                    name: ownerName,
                    surname: ownerSurname,
                    email: ownerEmail,
                    password: ownerPassword,
                },
            };
            console.log("Restaurant and Owner data:", restaurantAndOwnerData);
            const resp = await fetchWithAuth("https://localhost:7275/api/Restaurants", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(restaurantAndOwnerData),
            });

            const data = await resp;
            console.log("Response data:", data);
            const formData = new FormData();
            formData.append("file", image);
            const imageResponse = await fetchWithAuth(
                `https://localhost:7275/api/Restaurants/${data.idRestaurant}/uploadImage`,
                {
                    method: "PUT",
                    body: formData,
                }
            );

            const imageResponseData = await imageResponse.image;
            console.log("Image upload response:", imageResponseData);
            dispatch(addRestaurantAction(data));

            toast.success("Ristorante creato con successo!");
        } catch (error) {
            console.log(error);
            toast.error("Errore durante la creazione del ristorante!");
        }
    };
};

export const editRestaurant = (
    idRestaurant,
    Name,
    Category,
    Description,
    OpeningHours,
    ClosingHours,
    ClosingDay,
    Phone,
    Email
) => {
    return async (dispatch) => {
        try {
            console.log("Qui ci entro.");
            const responseData = await fetchWithAuth(`https://localhost:7275/api/Restaurants/${idRestaurant}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Name,
                    Category,
                    Description,
                    OpeningHours,
                    ClosingHours,
                    ClosingDay,
                    Phone,
                    Email,
                }),
            });
            console.log("Response data:", responseData);
            dispatch(editRestaurantAction(responseData));

            toast.success("Ristorante modificato con successo!");
            console.log(responseData);
        } catch (error) {
            console.log(error);
            toast.error("Errore durante la modifica del ristorante!", error);
        }
    };
};

export const uploadImage = (idRestaurant, image) => {
    return async (dispatch) => {
        try {
            const formData = new FormData();
            formData.append("file", image);
            const imageResponse = await fetchWithAuth(
                `https://localhost:7275/api/Restaurants/${idRestaurant}/uploadImage`,
                {
                    method: "PUT",
                    body: formData,
                }
            );
            dispatch(uploadImageAction(imageResponse.image));
            toast.success("Immagine caricata con successo!");
        } catch (error) {
            console.log(error);
            toast.error("Errore durante il caricamento dell'immagine!", error);
        }
    };
};

export const deactivateRestaurant = (idRestaurant) => {
    return async (dispatch) => {
        try {
            const responseData = await fetchWithAuth(
                `https://localhost:7275/api/Restaurants/deactivate/${idRestaurant}`,
                {
                    method: "PUT",
                    "Content-Type": "application/json",
                    body: JSON.stringify({ idRestaurant }),
                }
            );

            console.log("Response data:", responseData);

            dispatch(toggleRestaurantAction(responseData));
            if (responseData.isActive) {
                toast.success("Ristorante attivato con successo!");
            } else {
                toast.success("Ristorante disattivato con suceesso!");
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };
};
