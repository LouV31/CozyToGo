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
            console.log("User data: ", userData);
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
        } catch (error) {
            console.log(error);
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
        } catch (error) {
            console.log(error);
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
            console.log(addressData);
        } catch (error) {
            console.log(error);
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

            console.log(settedData);
            dispatch(setPrimaryAddressAction(settedData));
            dispatch(getAddresses());
        } catch (error) {
            console.log(error);
        }
    };
};

export const GetOrders = () => {
    return async (dispatch) => {
        try {
            const ordersData = await fetchWithAuth("https://localhost:7275/api/Orders");
            console.log(ordersData);
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
            console.log(data);
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
            console.log("searched orders: ", responseData);
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
            console.log(responseData);
        } catch (error) {
            console.log(error);
        }
    };
};

export const getSales = () => {
    return async (dispatch) => {
        try {
            const responseData = await fetchWithAuth(`https://localhost:7275/api/Orders/sales`);
            dispatch(getSalesAction(responseData));
            console.log("My Sales: ", responseData);
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
            console.log("My Sales by Date: ", responseData);
        } catch (error) {
            console.log(error);
        }
    };
};
