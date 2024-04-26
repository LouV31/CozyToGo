import { Row, Col, Container } from "react-bootstrap";
import { clearCartAction, removeItemAction, updateQuantityAction } from "../../Redux/reducers/CartReducers";
import { sendOrder } from "../../Redux/actions/Cart/CartActions";
import { useEffect, useRef, useState } from "react";
import { getAddresses, getUser } from "../../Redux/actions/Profile/ProfileActions";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
const CartMobile = () => {
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
    return (
        <Container className="p-5">
            <Row className="pt-5 pt-md-0 mt-5 mb-5 justify-content-between align-items-center">
                <div className="mb-5">
                    <span className="border-message h4 bg-violet fw-semibold py-1 text-white px-3 ">Il mio ordine</span>
                </div>
                <div className="orders-container  ">
                    {cartItems.map((item) => (
                        <div className="d-flex justify-content-between align-items-center mb-4" key={item.idDish}>
                            <div className="d-flex justify-content-between border-message-reverse bg-lightBlue  flex-grow-1">
                                <div className="fw-semibold px-3 py-1">
                                    <p className="mb-0 fs-6">
                                        {item.quantity} x {item.name}
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center ms-3">
                                <button
                                    className="btn-quantity btn-green p-0 fw-bold me-2"
                                    onClick={() => handleIncreaseQuantity(item.idDish, item.quantity)}
                                >
                                    +
                                </button>
                                <button
                                    className="btn-quantity btn-violet fw-bold "
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
                    <span className="border-message bg-violet fw-semibold h4 py-1 text-white px-3 ">
                        Indirizzo di consegna
                    </span>
                </div>
                <div className="mb-5">
                    <select className="select-address fs-5" onChange={handleSelectAddress}>
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
                    <span className="border-message bg-violet fw-semibold py-1 text-white px-3 h4 ">Aggiungi note</span>
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
    );
};
export default CartMobile;
