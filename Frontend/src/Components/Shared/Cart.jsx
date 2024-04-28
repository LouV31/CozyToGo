import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Fragment, useEffect, useRef, useState } from "react";
import { clearCartAction, removeItemAction, updateQuantityAction } from "../../Redux/reducers/CartReducers";
import { getAddresses, getUser } from "../../Redux/actions/Profile/ProfileActions";
import { sendOrder } from "../../Redux/actions/Cart/CartActions";
import { loadStripe } from "@stripe/stripe-js";
import { Displayport, Trash2Fill } from "react-bootstrap-icons";
import { Row, Col, Container } from "react-bootstrap";
import { set } from "react-hook-form";
import { CSSTransition } from "react-transition-group";

const Cart = ({ show }) => {
    const stripePromise = loadStripe(
        ""
    );
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.profile.user);
    const addresses = useSelector((state) => state.profile.addresses);
    const [notes, setNotes] = useState("");
    const [selectedAddress, setSelectedAddress] = useState(null);
    const selectedAddressRef = useRef();
    const [inProp, setInProp] = useState(false);

    useEffect(() => {
        setInProp(true);
        return () => {
            setInProp(false);
        };
    }, []);

    useEffect(() => {
        dispatch(getUser());
        dispatch(getAddresses());
    }, []);

    useEffect(() => {
        if (addresses && addresses.length > 0) {
            selectedAddressRef.current = addresses[0].completeAddress;
            setSelectedAddress(addresses[0].completeAddress);
            console.log("Selected Address", selectedAddressRef.current);
        }
    }, [addresses]);

    const handleSelectAddress = (e) => {
        setSelectedAddress(e.target.value);
        selectedAddressRef.current = e.target.value;
        console.log(selectedAddressRef.current);
    };

    const handleSubmitOrder = async () => {
        const order = {
            DeliveryAddress: selectedAddressRef.current ? selectedAddressRef.current : user.address,
            City: user.address.split(",")[1].trim(),
            Notes: notes === "" ? "" : notes,
            Dishes: cartItems.map((item) => ({
                IdDish: item.idDish,
                Quantity: item.quantity,
            })),
        };
        const orderData = await sendOrder(order);
        console.log(orderData);
        dispatch(clearCartAction());

        const stripe = await stripePromise;

        const result = await stripe.redirectToCheckout({
            sessionId: orderData.sessionId,
        });
        if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer.
            console.log(result.error.message);
        }
    };

    const handleIncreaseQuantity = (idDish, quantity) => {
        dispatch(updateQuantityAction({ idDish, quantity: quantity + 1 }));
    };

    const handleDecreaseQuantity = (idDish, quantity) => {
        if (quantity > 1) {
            dispatch(updateQuantityAction({ idDish, quantity: quantity - 1 }));
        } else {
            dispatch(removeItemAction(idDish));
        }
    };

    const cartContainerClass = `cart-container d-flex align-items-center  ${show ? "show" : ""}`;
    return (
        // <CSSTransition in={inProp} timeout={300} classNames="slide" unmountOnExit>
        <div className={cartContainerClass}>
            <Container className="">
                <Row className="d-flex flex-column align-items-start">
                    <div className="mb-3">
                        <span className="border-message bg-violet fw-semibold py-1 text-white px-3 ">
                            Il mio ordine
                        </span>
                    </div>
                    <div className="orders-container ">
                        {cartItems.map((item) => (
                            <div className="d-flex justify-content-between align-items-center mb-3" key={item.idDish}>
                                <div className="d-flex justify-content-between border-message-reverse bg-lightBlue  flex-grow-1">
                                    <div className="fw-semibold px-3 py-1">
                                        <p className="mb-0 fs-7">
                                            {item.quantity} x {item.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center ms-3">
                                    <button
                                        className="btn-quantity btn-green p-0 me-2"
                                        onClick={() => handleIncreaseQuantity(item.idDish, item.quantity)}
                                    >
                                        +
                                    </button>
                                    <button
                                        className="btn-quantity btn-violet"
                                        onClick={() => handleDecreaseQuantity(item.idDish, item.quantity)}
                                    >
                                        -
                                    </button>

                                    {/* <button
                                        className="btn-form btn-green p-0"
                                        onClick={() => handleRemoveItem(item.idDish)}
                                    >
                                        <Trash2Fill />
                                    </button> */}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-between border-y-dashed align-items-center p-2 mb-4">
                        <p className="mb-0 fw-semibold text-violet fs-5">Totale:</p>
                        <p className="mb-0 fw-bold text-violet fs-5">
                            {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} €
                        </p>
                    </div>
                    <div className="mb-3">
                        <span className="border-message bg-violet fw-semibold py-1 text-white px-3 ">
                            Indirizzo di consegna
                        </span>
                    </div>
                    <div className="mb-5">
                        <select className="select-address" onChange={handleSelectAddress}>
                            <option disabled value="">
                                Seleziona Indirizzo
                            </option>
                            {addresses &&
                                addresses.map((address) => (
                                    <option key={address.idAddress} value={address.completeAddress}>
                                        {address.addressName}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <span className="border-message bg-violet fw-semibold py-1 text-white px-3 ">
                            Aggiungi note
                        </span>
                    </div>
                    <div className="mb-5">
                        <input
                            className="cozy-input-form-reverse form-control"
                            type="text"
                            placeholder="Aggiungi note al tuo ordine"
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                    <div className="d-flex  flex-column align-items-end">
                        <button className="btn-form btn-green" onClick={handleSubmitOrder}>
                            Acquista
                        </button>
                    </div>
                </Row>
            </Container>
        </div>
        // </CSSTransition>
    );
};

export default Cart;
