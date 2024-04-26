import { Row, Col, Modal } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "../Shared/ModalComponent";
import AddRestaurantAndOwnerModal from "./AddRestaurantAndOwnerModal";
import {
    addRestaurantAndOwner,
    deactivateRestaurant,
    getRestaurant,
    searchRestaurant,
} from "../../Redux/actions/Restaurant/RestaurantsAction";
import defaultimage from "../../assets/imgs/default.png";

const BackOffice = () => {
    const restaurants = useSelector((state) => state.restaurants.restaurants);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [ownerName, setOwnerName] = useState("");
    const [ownerSurname, setOwnerSurname] = useState("");
    const [ownerEmail, setOwnerEmail] = useState("");
    const [ownerPassword, setOwnerPassword] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [description, setDescription] = useState("");
    const [openingHours, setOpeningHours] = useState("");
    const [closingHours, setClosingHours] = useState("");
    const [closingDay, setClosingDay] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRestaurant());
    }, [dispatch]);
    useEffect(() => {
        if (search.trim() !== "") {
            dispatch(searchRestaurant(search));
        } else {
            dispatch(getRestaurant());
        }
    }, [search]);
    const handleToggleRestaurant = (idRestaurant) => {
        dispatch(deactivateRestaurant(idRestaurant));
    };
    const handleShowAddModal = () => {
        setShowModal(!showModal);
    };

    const handleSearchRestaurant = (e) => {
        setSearch(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(
            addRestaurantAndOwner(
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
            )
        );
        await dispatch(getRestaurant());
        await setShowModal(false);
    };
    return (
        <Row className="mb-5 align-items-center justify-content-start justify-content-xl-between ">
            <Col xs={12} xl={5} xxl={4} className="">
                <h4 className="bg-violet border-message text-white text-center py-2 px-3 fs-5 text-playfair ">
                    Ristoranti
                </h4>
            </Col>
            <Col xs={12} xl={7} xxl={6} className="d-flex justify-content-between justify-content-xl-end">
                <input
                    type="text"
                    placeholder="Cerca un ristorante"
                    className="cozy-input-form border-0 mb-0"
                    onChange={handleSearchRestaurant}
                />
                <button className="btn-transparent border-0 bg-transparent">
                    <Plus size={42} className="text-green fw-bold" onClick={handleShowAddModal} />
                </button>
            </Col>
            <ModalComponent
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSubmit={handleSubmit}
                title={"Aggiungi un Risorante"}
            >
                <AddRestaurantAndOwnerModal
                    ownerName={ownerName}
                    setOwnerName={setOwnerName}
                    ownerSurname={ownerSurname}
                    setOwnerSurname={setOwnerSurname}
                    ownerEmail={ownerEmail}
                    setOwnerEmail={setOwnerEmail}
                    ownerPassword={ownerPassword}
                    setOwnerPassword={setOwnerPassword}
                    name={name}
                    setName={setName}
                    category={category}
                    setCategory={setCategory}
                    address={address}
                    setAddress={setAddress}
                    city={city}
                    setCity={setCity}
                    zipCode={zipCode}
                    setZipCode={setZipCode}
                    description={description}
                    setDescription={setDescription}
                    openingHours={openingHours}
                    setOpeningHours={setOpeningHours}
                    closingHours={closingHours}
                    setClosingHours={setClosingHours}
                    closingDay={closingDay}
                    setClosingDay={setClosingDay}
                    phone={phone}
                    setPhone={setPhone}
                    email={email}
                    setEmail={setEmail}
                    image={image}
                    setImage={setImage}
                />
            </ModalComponent>

            <Col xs={12}>
                {restaurants &&
                    (console.log(restaurants),
                    restaurants.map((restaurant) => {
                        return (
                            <Row
                                xs={12}
                                xl={8}
                                key={restaurant.idRestaurant}
                                className=" align-items-center gx-5 py-5  border-bottom-dashed"
                            >
                                <Col
                                    xs={{ span: 12 }}
                                    xl={{ span: 6, order: 1 }}
                                    className="d-flex justify-content-center align-items-center mt-sm-5 mt-lg-0 p-0"
                                >
                                    <div className="restaurantImgContainer">
                                        <img
                                            src={
                                                restaurant.image !== "default.jpg"
                                                    ? `https://localhost:7275/images/${restaurant.image}`
                                                    : defaultimage
                                            }
                                            alt="default"
                                            className="img-fluid RestaurantImgs"
                                        />
                                    </div>
                                </Col>
                                <Col xs={{ span: 12 }} xl={{ span: 4, order: 2 }} className="flex-grow-1">
                                    <Row>
                                        <Col xs={12}>
                                            <div className="px-0 pt-3 px-sm-4 pt-sm-4 px-md-0 pt-md-3 px-lg-3  pt-lg-3 px-xl-0">
                                                <div className="RestaurantLink">
                                                    <h4 className="text-black fw-bold fs-4 mb-0 text-hover-violet">
                                                        {restaurant.name}
                                                    </h4>
                                                </div>
                                                <p className="text-black text-italic fs-7">{restaurant.category}</p>
                                                <p className="  text-black fw-semibold fs-7">
                                                    {restaurant.description}
                                                </p>
                                                <div className="text-end">
                                                    <button
                                                        onClick={() => handleToggleRestaurant(restaurant.idRestaurant)}
                                                        className={`btn-form ${
                                                            restaurant.isActive ? "btn-violet" : "btn-green"
                                                        } py-1 px-3`}
                                                    >
                                                        {restaurant.isActive ? "Disattiva" : "Attiva"}
                                                    </button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        );
                    }))}
            </Col>
        </Row>
    );
};
export default BackOffice;
