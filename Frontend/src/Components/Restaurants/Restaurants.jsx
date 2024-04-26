import VioletNavSvg from "../Shared/VioletNavSvg";
import { Container, Row, Col } from "react-bootstrap";
import IconaPizza from "../../assets/imgs/IconaPizza.png";
import IconaPesce from "../../assets/imgs/IconaPesce.png";
import IconaCarne from "../../assets/imgs/IconaCarne.png";
import IconaPasta from "../../assets/imgs/IconaPasta.png";
import IconaCarota from "../../assets/imgs/IconaCarota.png";
import IconaZuppa from "../../assets/imgs/IconaZuppa.png";
import IconaCornetto from "../../assets/imgs/IconaCornetto.png";
import IconaFoglie from "../../assets/imgs/IconaFoglie.png";
import defaultimage from "../../assets/imgs/pastaDefault.jpg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurant, searchRestaurant } from "../../Redux/actions/Restaurant/RestaurantsAction";
import { useNavigate } from "react-router-dom";
import { calculateDistance } from "../../CalculateDistance";
import { ClockFill, CollectionPlay, GeoAltFill } from "react-bootstrap-icons";
import DistanceFilter from "./DistanceRange";
import RestaurantStatus from "./RestaurantStatus";
import { toast } from "react-toastify";
import { isOpen } from "./restaurantUtility";
import { reactHooksModule } from "@reduxjs/toolkit/query/react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const Restaurants = () => {
    const [filterDistance, setFilterDistance] = useState(10);
    const [categories, setCategories] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [search, setSearch] = useState("");
    const restaurants = useSelector((state) => state.restaurants.restaurants);
    const userLocation = useSelector(
        (state) => state.location && state.location.location && state.location.location[0]
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDistanceChange = (distance) => {
        setFilterDistance(distance);
    };

    const handleRestaurantClick = (restaurant) => {
        if (restaurant && !isOpen(restaurant)) {
            toast.error("Il ristorante è chiuso al momento");
        } else {
            navigate(`/restaurant/${restaurant.idRestaurant}`);
        }
    };

    const handleCategoryChange = (category) => {
        setCategories((prevCategories) => {
            if (prevCategories.includes(category)) {
                // Se la categoria è già selezionata, rimuovila
                return prevCategories.filter((cat) => cat !== category);
            } else {
                // Altrimenti, aggiungila
                return [...prevCategories, category];
            }
        });
    };
    const handleSearchRestaurant = (e) => {
        setSearch(e.target.value);
    };
    // useEffect(() => {
    //     if (!userLocation) {
    //         toast.error("Non puoi visualizzare i ristoranti se non inserisci un indirizzo di consegna valido");
    //         navigate("/");
    //     }
    // }, []);

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

    useEffect(() => {
        if (!userLocation || !restaurants) return;
        let filtered = restaurants.filter((restaurant) => {
            const distance = calculateDistance(
                userLocation.lat,
                userLocation.lon,
                restaurant.latitude,
                restaurant.longitude
            );
            return (
                distance <= filterDistance &&
                (categories.length === 0 || categories.includes(restaurant.category)) &&
                restaurant.isActive === true
            );
        });
        setFilteredRestaurants(filtered);
    }, [userLocation, restaurants, filterDistance, categories]);
    return (
        <>
            <Container className="p-5">
                <Row className="pt-5 pt-md-0 mt-5 mb-5 justify-content-between align-items-center">
                    <Col xs={12} md={8} lg={6} className="me-auto">
                        <h2 className="bg-violet border-message text-white text-center py-3 px-3 text-playfair">
                            Di che cosa hai voglia oggi?
                        </h2>
                    </Col>
                    <Col xs={12} md={4} className="d-none d-lg-block">
                        <input
                            type="text"
                            placeholder="Cerca un ristorante"
                            className="cozy-input-form border-0 mb-0 w-100"
                            onChange={handleSearchRestaurant}
                        />
                    </Col>
                </Row>
                <Row xs={2} md={4} className="justify-content-center justify-content-lg-between pt-5 gy-5">
                    <Col
                        xl={1}
                        className={`d-flex justify-content-center align-items-center ${
                            categories.includes("Pizza") ? "selectedCategory" : ""
                        }`}
                    >
                        <img
                            className="filterIcon"
                            src={IconaPizza}
                            alt="Icona Pizza"
                            onClick={() => handleCategoryChange("Pizza")}
                        />
                    </Col>
                    <Col
                        xl={1}
                        className={`d-flex justify-content-center align-items-center ${
                            categories.includes("Fish") ? "selectedCategory" : ""
                        }`}
                    >
                        <img
                            className="filterIcon"
                            src={IconaPesce}
                            alt="Icona Pizza"
                            onClick={() => handleCategoryChange("Fish")}
                        />
                    </Col>
                    <Col
                        xl={1}
                        className={`d-flex justify-content-center align-items-center ${
                            categories.includes("Meat") ? "selectedCategory" : ""
                        }`}
                    >
                        <img
                            className="filterIcon"
                            src={IconaCarne}
                            alt="Icona Pizza"
                            onClick={() => handleCategoryChange("Meat")}
                        />
                    </Col>
                    <Col
                        xl={1}
                        className={`d-flex justify-content-center align-items-center ${
                            categories.includes("HomeMade") ? "selectedCategory" : ""
                        }`}
                    >
                        <img
                            className="filterIcon"
                            src={IconaPasta}
                            alt="Icona Pizza"
                            onClick={() => handleCategoryChange("HomeMade")}
                        />
                    </Col>
                    <Col
                        xl={1}
                        className={`d-flex justify-content-center align-items-center ${
                            categories.includes("Vegetarian") ? "selectedCategory" : ""
                        }`}
                    >
                        <img
                            className="filterIcon"
                            src={IconaCarota}
                            alt="Icona Pizza"
                            onClick={() => handleCategoryChange("Vegetarian")}
                        />
                    </Col>
                    <Col
                        xl={1}
                        className={`d-flex justify-content-center align-items-center ${
                            categories.includes("GlutenFree") ? "selectedCategory" : ""
                        }`}
                    >
                        <img
                            className="filterIcon"
                            src={IconaZuppa}
                            alt="Icona Pizza"
                            onClick={() => handleCategoryChange("GlutenFree")}
                        />
                    </Col>
                    <Col
                        xl={1}
                        className={`d-flex justify-content-center align-items-center ${
                            categories.includes("Candy") ? "selectedCategory" : ""
                        }`}
                    >
                        <img
                            className="filterIcon"
                            src={IconaCornetto}
                            alt="Icona Pizza"
                            onClick={() => handleCategoryChange("Candy")}
                        />
                    </Col>
                    <Col
                        xl={1}
                        className={`d-flex justify-content-center align-items-center ${
                            categories.includes("Vegan") ? "selectedCategory" : ""
                        }`}
                    >
                        <img
                            className="filterIcon"
                            src={IconaFoglie}
                            alt="Icona Pizza"
                            onClick={() => handleCategoryChange("Vegan")}
                        />
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col
                        xs={12}
                        lg={4}
                        className="pt-5 mb-lg-0 d-flex flex-column flex-md-row justify-content-between d-lg-block  align-items-center"
                    >
                        <div className="order-2">
                            <h4>Filtra la distanza</h4>
                            <DistanceFilter distance={filterDistance} onDistanceChange={handleDistanceChange} />
                        </div>
                        <div className="mb-4 d-lg-none">
                            <input
                                type="text"
                                placeholder="Cerca un ristorante"
                                className="cozy-input-form border-0 mb-0 "
                                onChange={handleSearchRestaurant}
                            />
                        </div>
                    </Col>
                    <Col xs={12} lg={8}>
                        <TransitionGroup>
                            {restaurants &&
                                (console.log(restaurants),
                                filteredRestaurants.map((restaurant) => {
                                    const distance = calculateDistance(
                                        userLocation.lat,
                                        userLocation.lon,
                                        restaurant.latitude,
                                        restaurant.longitude
                                    );

                                    return (
                                        <CSSTransition key={restaurant.idRestaurant} timeout={500} classNames="item">
                                            <Row
                                                xs={12}
                                                xl={8}
                                                className="align-items-center py-5 gx-5 border-bottom-dashed"
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
                                                <Col
                                                    xs={{ span: 12 }}
                                                    xl={{ span: 4, order: 2 }}
                                                    className="flex-grow-1"
                                                >
                                                    <Row className="justify-content-center justify-content-xl-start mt-3 mt-xl-0">
                                                        <Col xs={12} md={8} lg={9} xl={12}>
                                                            <div className="d-flex justify-content-between align-items-center px-0  px-sm-4  px-md-0  px-lg-3   px-xl-0">
                                                                <div className="px-lg- px-xl-0  fs-7 fw-semibold">
                                                                    <span className=" border-dotted p-1 ">
                                                                        <GeoAltFill
                                                                            size={14}
                                                                            className="text-violet me-2"
                                                                        />
                                                                        <span>{distance.toFixed(2)} km</span>
                                                                    </span>
                                                                </div>
                                                                <div className="d-flex justify-content-end">
                                                                    <RestaurantStatus restaurant={restaurant} />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col xs={12} md={8} lg={9} xl={12}>
                                                            <div className="px-0 pt-3 px-sm-4 pt-sm-4 px-md-0 pt-md-3 px-lg-3  pt-lg-3 px-xl-0">
                                                                <div
                                                                    className="RestaurantLink"
                                                                    onClick={() => handleRestaurantClick(restaurant)}
                                                                >
                                                                    <h4 className="text-hover-violet text-black fw-bold fs-4  mb-0 ">
                                                                        {restaurant.name}
                                                                    </h4>
                                                                </div>
                                                                <p className="text-black text-italic fs-7">
                                                                    {restaurant.category}
                                                                </p>
                                                                <p className="d-none d-lg-block text-black fw-semibold">
                                                                    {restaurant.description}
                                                                </p>
                                                                {isOpen(restaurant) && (
                                                                    <div className="d-flex align-items-center">
                                                                        <ClockFill className="text-violet" />
                                                                        <span className="ms-2">
                                                                            {restaurant.openingHours
                                                                                .split(":")
                                                                                .slice(0, 2)
                                                                                .join(":")}{" "}
                                                                            -{" "}
                                                                            {restaurant.closingHours
                                                                                .split(":")
                                                                                .slice(0, 2)
                                                                                .join(":")}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </CSSTransition>
                                    );
                                }))}
                        </TransitionGroup>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default Restaurants;
