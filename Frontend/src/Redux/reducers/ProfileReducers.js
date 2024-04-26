import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    addresses: [],
    orders: [],
    sales: null,
    isLoading: false,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        getAddressesAction: (state, action) => {
            state.addresses = action.payload;
            state.isLoading = false;
        },
        addAddressAction: (state, action) => {
            state.addresses.push(action.payload);
            state.isLoading = false;
        },
        editAddressAction: (state, action) => {
            state.addresses = state.addresses.filter((address) => address.idAddress !== action.payload);
        },
        setPrimaryAddressAction: (state, action) => {
            state.addresses = state.addresses.map((address) =>
                address.IdAddress === action.payload.IdAddress
                    ? { ...address, isPrimary: true }
                    : { ...address, isPrimary: false }
            );
            state.isLoading = false;
        },
        editUserAction: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        },
        getUserAction: (state, action) => {
            state.user = action.payload;
        },
        getOrdersAction: (state, action) => {
            state.orders = action.payload;
        },
        searchOrderByEmailAction: (state, action) => {
            state.orders = action.payload;
        },
        setDeliveredOrderAction: (state, action) => {
            action.payload.forEach((deliveredOrderDetail) => {
                state.orders.forEach((order) => {
                    order.orderDetails.forEach((orderDetail) => {
                        if (orderDetail.idOrderDetail === deliveredOrderDetail.idOrderDetail) {
                            orderDetail.isDelivered = deliveredOrderDetail.isDelivered;
                        }
                    });
                });
            });
        },
        getSalesAction: (state, action) => {
            state.sales = action.payload;
        },
    },
});

export const {
    getAddressesAction,
    searchOrderByEmailAction,
    addAddressAction,
    editAddressAction,
    setPrimaryAddressAction,
    editUserAction,
    getUserAction,
    getOrdersAction,
    setDeliveredOrderAction,
    getSalesAction,
} = profileSlice.actions;

export default profileSlice.reducer;
