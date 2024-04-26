import { useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Auth from "./Components/Authentication/Auth";
import CozyNavbar from "./Components/Shared/CozyNavbar";
import Cart from "./Components/Shared/Cart";
import Profile from "./Components/Profile/Profile";
import ToasterComponent from "./Components/Shared/ToasterComponent";
import Restaurants from "./Components/Restaurants/Restaurants";
import Restaurant from "./Components/Restaurants/Restaurant";
import BackDrop from "./Components/Shared/BackDrop";
import CartMobile from "./Components/Shared/CartMobile";

function App() {
    const [showCart, setShowCart] = useState(false);
    const toggleCart = () => setShowCart(!showCart);
    return (
        <BrowserRouter>
            <div id="backdrop">
                <BackDrop />
            </div>
            <ToasterComponent />
            <CozyNavbar toggleCart={toggleCart} />
            {showCart && <Cart show={showCart} />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<CartMobile />} />
                <Route path="/restaurants" element={<Restaurants />} />
                <Route path="/restaurant/:restaurantId/" element={<Restaurant />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
