import { Row, Col, FormControl, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import ModalComponent from "../Shared/ModalComponent";
import { useState, useEffect, useRef } from "react";
import EditEmailAndPasswordModal from "./EditEmailAndPhoneModal";
import { editUser, getUser } from "../../Redux/actions/Profile/ProfileActions";
import { editRestaurant, getRestaurantByOwner, uploadImage } from "../../Redux/actions/Restaurant/RestaurantsAction";
import defaultimage from "../../assets/imgs/default.png";
import { ClockFill, EnvelopeFill, PhoneFill } from "react-bootstrap-icons";
import EditRestaurantModal from "./EditRestaurantModal";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Account = () => {
    const user = useSelector((state) => state.profile.user);
    const owner = useSelector((state) => state.auth.user);
    const restaurant = useSelector((state) => state.restaurants.restaurant);
    const fileInput = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState(user?.email);
    const [phone, setPhone] = useState(user?.phone);
    const [restaurantName, setRestaurantName] = useState(restaurant?.name);
    const [category, setCategory] = useState(restaurant?.category);
    const [description, setDescription] = useState(restaurant?.description);
    const [openingHours, setOpeningHours] = useState(restaurant?.openingHours.substring(0, 5));
    const [closingHours, setClosingHours] = useState(restaurant?.closingHours.substring(0, 5));
    const [closingDay, setClosingDay] = useState(restaurant?.closingDay);
    const [restaurantPhone, setRestaurantPhone] = useState(restaurant?.phone);
    const [restaurantEmail, setRestaurantEmail] = useState(restaurant?.email);
    const [image, setImage] = useState("");

    const dispatch = useDispatch();

    const handleImageClick = () => {
        fileInput.current.click();
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            dispatch(uploadImage(restaurant.idRestaurant, file));
            dispatch(getRestaurantByOwner());
        }
    };

    const userDTO = {
        Email: email,
        Phone: phone,
    };
    // Edit user function to dispatch the editUser action
    const handleSubmit = (e) => {
        if (owner && owner.role === "Owner") {
            e.preventDefault();
            console.log("sono un owner");
            dispatch(
                editRestaurant(
                    restaurant.idRestaurant,
                    restaurantName,
                    category,
                    description,
                    openingHours,
                    closingHours,
                    closingDay,
                    restaurantPhone,
                    restaurantEmail
                )
            );

            setShowModal(false);
        } else {
            e.preventDefault();
            dispatch(editUser(userDTO));
            setShowModal(false);
        }
    };

    // UseEffect to get user data when the component mounts
    useEffect(() => {
        if (owner && owner.role === "Owner") {
            dispatch(getRestaurantByOwner());
        } else {
            dispatch(getUser());
        }
    }, [dispatch]);
    // useEffect to set the email and phone state when the user data is fetched
    useEffect(() => {
        setEmail(user?.email);
        setPhone(user?.phone);
    }, [user]);
    useEffect(() => {
        if (restaurant) {
            setRestaurantName(restaurant.name || "");
            setCategory(restaurant.category || "");
            setDescription(restaurant.description || "");
            setOpeningHours(restaurant.openingHours.substring(0, 5) || "");
            setClosingHours(restaurant.closingHours.substring(0, 5) || "");
            setClosingDay(restaurant.closingDay || "");
            setRestaurantPhone(restaurant.phone || "");
            setRestaurantEmail(restaurant.email || "");
        }
    }, [restaurant]);

    const handleMouseOver = () => {
        document.getElementById("EditImg").style.opacity = "1";
        document.querySelector("#restaurantImgContainerID img").style.opacity = "0.8";
    };
    const handleMouseOut = () => {
        document.getElementById("EditImg").style.opacity = "0";
        document.querySelector("#restaurantImgContainerID img").style.opacity = "1";
    };
    return (
        <>
            <TransitionGroup>
                {owner && restaurant && owner.role === "Owner" ? (
                    <>
                        {console.log(owner)}
                        <Row className="justify-content-center justify-content-xxl-start">
                            <Col md={12} xxl={4} className="p-0 ">
                                <h4 className="bg-violet border-message text-white text-center py-2 px-3 fs-5 text-playfair ">
                                    Il mio ristorante
                                </h4>
                            </Col>
                        </Row>
                        <Row xs={12} xxl={8} key={restaurant.idRestaurant} className=" align-items-center gx-5 py-5">
                            <Col
                                xs={{ span: 12 }}
                                xxl={{ span: 6, order: 1 }}
                                className="d-flex justify-content-center align-items-center mt-sm-5 mt-lg-0 p-0"
                            >
                                <div
                                    id="restaurantImgContainerID"
                                    className="restaurantImgContainer position-relative bg-dark"
                                    onMouseOver={handleMouseOver}
                                    onMouseOut={handleMouseOut}
                                >
                                    <input
                                        type="file"
                                        style={{ display: "none" }}
                                        ref={fileInput}
                                        onChange={handleImageChange}
                                    />
                                    <img
                                        src={
                                            restaurant.image !== "default.jpg"
                                                ? `https://localhost:7275/images/${restaurant.image}`
                                                : defaultimage
                                        }
                                        alt="default"
                                        className="img-fluid RestaurantImgs"
                                        onClick={handleImageClick}
                                    />
                                    <p id="EditImg" className="mb-0 h5">
                                        Modifica
                                    </p>
                                </div>
                            </Col>
                            <Col xs={{ span: 12 }} xxl={{ span: 4, order: 2 }} className="flex-grow-1">
                                <Row>
                                    <Col xs={12}>
                                        <div className="px-0 pt-3 px-sm-4 pt-sm-4 px-md-0 pt-md-3 px-lg-3  pt-lg-3 px-xl-5 pt-xl-4 px-xxl-0">
                                            <div className="RestaurantLink">
                                                <h4 className="text-black fw-bold fs-4 mb-0 text-hover-violet ">
                                                    {restaurant.name}
                                                </h4>
                                            </div>
                                            <p className="text-black text-italic fs-7">{restaurant.category}</p>
                                            <p className="  text-black fw-semibold fs-7">{restaurant.description}</p>
                                            <div className="d-flex align-items-center">
                                                <ClockFill className="text-violet" />
                                                <span className="ms-2">
                                                    {restaurant.openingHours.split(":").slice(0, 2).join(":")} -{" "}
                                                    {restaurant.closingHours.split(":").slice(0, 2).join(":")}
                                                </span>
                                            </div>
                                            <div className="d-flex align-items-center mt-1">
                                                <PhoneFill className="text-violet" />
                                                <span className="ms-2">{restaurant.phone}</span>
                                            </div>
                                            <div className="d-flex align-items-center mt-1">
                                                <EnvelopeFill className="text-violet" />
                                                <span className="ms-2">{restaurant.email}</span>
                                            </div>
                                            <p className="mb-0 fw-semibold mt-1">DayOff: {restaurant.closingDay}</p>
                                            <div className="text-end">
                                                <button
                                                    onClick={() => setShowModal(true)}
                                                    className="btn-form btn-green px-2 py-1"
                                                >
                                                    Modifica
                                                </button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <ModalComponent
                            show={showModal}
                            handleClose={() => setShowModal(false)}
                            handleSubmit={handleSubmit}
                        >
                            <EditRestaurantModal
                                restaurantName={restaurantName}
                                setRestaurantName={setRestaurantName}
                                category={category}
                                setCategory={setCategory}
                                description={description}
                                setDescription={setDescription}
                                openingHours={openingHours}
                                setOpeningHours={setOpeningHours}
                                closingHours={closingHours}
                                setClosingHours={setClosingHours}
                                closingDay={closingDay}
                                setClosingDay={setClosingDay}
                                restaurantPhone={restaurantPhone}
                                setRestaurantPhone={setRestaurantPhone}
                                restaurantEmail={restaurantEmail}
                                setRestaurantEmail={setRestaurantEmail}
                            />
                        </ModalComponent>
                    </>
                ) : user && user.name && user.surname && user.email && user.phone && user.address ? (
                    <>
                        <Row className="mb-5">
                            <Col md={8} lg={6} xl={5} xxl={4}>
                                <h4 className="bg-violet border-message text-white text-center py-2 px-3 fs-5 text-playfair ">
                                    Il mio account
                                </h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Row>
                                    <Col xs={12} lg={6}>
                                        <p className="text-black  fs-6 mb-2 ps-2">Nome</p>
                                        <FormControl
                                            className="cozy-input-form"
                                            type="text"
                                            value={user.name}
                                            readOnly
                                        />
                                    </Col>
                                    <Col xs={12} lg={6}>
                                        <p className="text-black  fs-6 mb-2 ps-2">Cognome</p>
                                        <FormControl
                                            className="cozy-input-form"
                                            type="text"
                                            value={user.surname}
                                            readOnly
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} lg={6}>
                                        <p className="text-black  fs-6 mb-2 ps-2">Email</p>
                                        <FormControl
                                            className="cozy-input-form"
                                            type="email"
                                            value={user.email}
                                            readOnly
                                        />
                                    </Col>
                                    <Col xs={12} lg={6}>
                                        <p className="text-black  fs-6 mb-2 ps-2">Cellulare</p>
                                        <FormControl
                                            className="cozy-input-form"
                                            type="tel"
                                            value={user.phone}
                                            readOnly
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <p className="text-black  fs-6 mb-2 ps-2">Indirizzo</p>
                                        <FormControl
                                            className="cozy-input-form"
                                            type="text"
                                            value={user.address}
                                            readOnly
                                        />
                                    </Col>
                                </Row>

                                <div className="d-flex justify-content-center justify-content-lg-end mt-4 ">
                                    <button className="btn-form btn-violet" onClick={() => setShowModal(true)}>
                                        Modifica
                                    </button>
                                </div>
                            </Col>
                        </Row>
                        <ModalComponent
                            show={showModal}
                            handleClose={() => setShowModal(false)}
                            handleSubmit={handleSubmit}
                        >
                            <EditEmailAndPasswordModal
                                handleSubmit={handleSubmit}
                                email={email}
                                setEmail={setEmail}
                                phone={phone}
                                setPhone={setPhone}
                            />
                        </ModalComponent>
                    </>
                ) : (
                    <h1>loading...</h1>
                )}
            </TransitionGroup>
        </>
    );
};

export default Account;
