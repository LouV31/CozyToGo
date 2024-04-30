import { toast } from "react-toastify";
import {
    addAddressAction,
    editAddressAction,
    editUserAction,
    getAddressesAction,
    getOrdersAction,
    getSalesAction,
    getUserAction,
    searchOrderByEmailAction,
    setDeliveredOrderAction,
    setPrimaryAddressAction,
} from "../../reducers/ProfileReducers";
import fetchWithAuth from "../FetchWithAuth";

export const getUser = () => {
    return async (dispatch) => {
        try {
            const userData = await fetchWithAuth("https://localhost:7275/api/Users");
            dispatch(getUserAction(userData));
        } catch (error) {
            console.log(error);
        }
    };
};

export const editUser = (userDTO) => {
    return async (dispatch) => {
        try {
            const userData = await fetchWithAuth(`https://localhost:7275/api/Users/editUser`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(userDTO),
            });
            dispatch(editUserAction(userData));
            dispatch(getUser());
            toast.success("Utente modificato con successo!");
        } catch (error) {
            console.log(error);
            toast.error("Errore durante la modifica dell'utente!");
        }
    };
};

export const getAddresses = () => {
    return async (dispatch) => {
        try {
            const addressesData = await fetchWithAuth(`https://localhost:7275/api/Addresses`);
            dispatch(getAddressesAction(addressesData));
        } catch (error) {
            console.log(error);
        }
    };
};

export const AddAddress = (AddressName, CompleteAddress) => {
    const [StreetAddress, City, ZipCode] = CompleteAddress.split(",");
    return async (dispatch) => {
        try {
            const addressData = await fetchWithAuth(`https://localhost:7275/api/Addresses`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    AddressName: AddressName,
                    StreetAddress: StreetAddress,
                    City: City,
                    ZipCode: ZipCode,
                }),
            });
            dispatch(addAddressAction(addressData));
            toast.success("Indirizzo aggiunto con successo!");
        } catch (error) {
            console.log(error);
            toast.error("Errore durante l'aggiunta dell'indirizzo!");
        }
    };
};

export const EditAddress = (IdAddress, AddressName, CompleteAddress) => {
    const [StreetAddress, City, ZipCode] = CompleteAddress.split(",").map((item) => item.trim());
    return async (dispatch) => {
        try {
            const addressData = await fetchWithAuth(`https://localhost:7275/api/Addresses/${IdAddress}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({
                    IdAddress: IdAddress,
                    AddressName: AddressName,
                    StreetAddress: StreetAddress,
                    City: City,
                    ZipCode: ZipCode,
                }),
            });
            dispatch(editAddressAction(addressData));
            dispatch(getAddresses());
            toast.success("Indirizzo modificato con successo!");
        } catch (error) {
            console.log(error);
            toast.error("Errore durante la modifica dell'indirizzo!");
        }
    };
};

export const SetPrimaryAddress = (idAddress) => {
    return async (dispatch) => {
        try {
            const settedData = await fetchWithAuth(`https://localhost:7275/api/Addresses/SetPrimary/${idAddress}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PUT",
            });

            dispatch(setPrimaryAddressAction(settedData));
            dispatch(getAddresses());
            toast.success("Indirizzo principale impostato con successo!");
        } catch (error) {
            console.log(error);
            toast.error("Errore durante l'impostazione dell'indirizzo principale!");
        }
    };
};

export const GetOrders = () => {
    return async (dispatch) => {
        try {
            const ordersData = await fetchWithAuth("https://localhost:7275/api/Orders");

            dispatch(getOrdersAction(ordersData));
        } catch (error) {
            console.log(error);
        }
    };
};

export const getRestaurantOrders = () => {
    return async (dispatch) => {
        try {
            const response = fetchWithAuth(`https://localhost:7275/api/Orders/restaurantOrders`);
            const data = await response;

            dispatch(getOrdersAction(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const getRestaurantOrdersByEmail = (userEmail) => {
    return async (dispatch) => {
        try {
            const responseData = await fetchWithAuth(`https://localhost:7275/api/Orders/search/${userEmail}`);
            dispatch(searchOrderByEmailAction(responseData));
        } catch (error) {
            console.log(error);
        }
    };
};

export const setDeliveredOrder = (orderDetailId) => {
    return async (dispatch) => {
        try {
            const responseData = await fetchWithAuth(`https://localhost:7275/api/Orders/deliverOrderDetails`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderDetailId),
            });

            dispatch(setDeliveredOrderAction(responseData));
            toast.success("Ordine consegnato con successo!");
        } catch (error) {
            console.log(error);
            toast.error("Errore durante la consegna dell'ordine!");
        }
    };
};

export const getSales = () => {
    return async (dispatch) => {
        try {
            const responseData = await fetchWithAuth(`https://localhost:7275/api/Orders/sales`);
            dispatch(getSalesAction(responseData));
        } catch (error) {
            console.log(error);
        }
    };
};

export const getSalesByDate = (orderDate) => {
    return async (dispatch) => {
        try {
            const responseData = await fetchWithAuth(`https://localhost:7275/api/Orders/sales/${orderDate}`);
            dispatch(getSalesAction(responseData));
        } catch (error) {
            console.log(error);
        }
    };
};
