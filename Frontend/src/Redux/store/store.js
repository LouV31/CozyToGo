import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import expireReducer from "redux-persist-expire";

import SearchLocationReducer from "../reducers/SearchLocationReducer";
import AuthenticationReducer from "../reducers/AuthenticationReducer";
import ProfileReducer from "../reducers/ProfileReducers";

import RestaurantsReducer from "../reducers/RestaurantReducer";
import DishesReducer from "../reducers/DishesReducer";
import CartReducers from "../reducers/CartReducers";
import CategoryReducer from "../reducers/CategoryReducer";
import IngredientsReducer from "../reducers/IngredientsReducer";

// Redux middleware

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "location", "cart"],
    transforms: [
        expireReducer("auth", {
            expireSeconds: 7 * 24 * 60 * 60, // 7 days
            expiredState: { user: null },
            autoExpire: true,
        }),
    ],
};

const rootReducer = combineReducers({
    auth: AuthenticationReducer,
    profile: ProfileReducer,
    location: SearchLocationReducer,
    restaurants: RestaurantsReducer,
    restaurantDishes: DishesReducer,
    cart: CartReducers,
    category: CategoryReducer,
    ingredient: IngredientsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);
