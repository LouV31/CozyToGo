import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantDishes, searchDishesByRestaurant } from "../../Redux/actions/Restaurant/Dishes/DishesAction";
import { useNavigate, useParams } from "react-router-dom";
import { addItemAction } from "../../Redux/reducers/CartReducers";
import TopVioletSvg from "../Shared/TopVioletSvg";
import { getRestaurant, getSingleRestaurant } from "../../Redux/actions/Restaurant/RestaurantsAction";
import { ClockFill, GeoAltFill } from "react-bootstrap-icons";
import RestaurantStatus from "./RestaurantStatus";
import { isOpen } from "./restaurantUtility";
import { calculateDistance } from "../../CalculateDistance";
import defaultimage from "../../assets/imgs/pastaDefault.jpg";
import FotoCibo from "../../assets/imgs/FotoCibo.avif";
import Euro from "../../assets/imgs/Euro.png";
import { toast } from "react-toastify";

const Restaurant = () => {
    const [quantities, setQuantities] = useState({});
    const navigate = useNavigate();
    //const [quantitiesInitialized, setQuantitiesInitialized] = useState(false);
    const dispatch = useDispatch();
    const userAuth = useSelector((state) => state.auth.user);
    const restaurant = useSelector((state) => state.restaurants.restaurant);
    const dishes = useSelector((state) => state.restaurantDishes.dishes);
    const userLocation = useSelector(
        (state) => state.location && state.location.location && state.location.location[0]
    );
    const { restaurantId } = useParams();
    const restaurantIdInt = parseInt(restaurantId);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (restaurant && !isOpen(restaurant)) {
            toast.error("Ristorante chiuso");
            navigate("/restaurants");
        }
    }, [restaurant]);

    useEffect(() => {
        dispatch(getSingleRestaurant(restaurantIdInt));
        dispatch(getRestaurantDishes(restaurantId));
    }, [dispatch, restaurantId]);

    useEffect(() => {
        // Inizializzazione delle quantità predefinite a 1 per ogni piatto solo una volta
        if (dishes && Object.keys(quantities).length === 0) {
            const initialQuantities = {};
            dishes.forEach((dish) => {
                initialQuantities[dish.idDish] = 1;
            });
            setQuantities(initialQuantities);
        }
    }, [dishes, quantities]);

    let distance;
    if (userLocation && restaurant) {
        distance = calculateDistance(userLocation.lat, userLocation.lon, restaurant.latitude, restaurant.longitude);
    }

    const handleQuantityChange = (e, dishId) => {
        const newQuantity = e.target.value === "" ? null : parseInt(e.target.value);
        if (!isNaN(newQuantity) && (newQuantity === null || newQuantity >= 1)) {
            const newQuantities = { ...quantities, [dishId]: newQuantity };
            setQuantities(newQuantities);
        }
    };

    const handleAddToCart = (dish) => {
        dispatch(addItemAction({ dish, quantity: quantities[dish.idDish] }));
        // Reimposta le quantità a 1 dopo aver aggiunto il prodotto al carrello
        const updatedQuantities = { ...quantities, [dish.idDish]: 1 };
        setQuantities(updatedQuantities);
    };

    const handleSearchIngredients = (e) => {
        setSearch(e.target.value);
    };
    useEffect(() => {
        if (search.trim() !== "") {
            dispatch(searchDishesByRestaurant(restaurantIdInt, search));
        } else {
            dispatch(getRestaurantDishes(restaurantId));
        }
    }, [search]);
    return (
        <>
            <Container className="pt-5 mt-4 mb-5">
                {restaurant && (
                    <Row className="mt-5 mb-5 justify-content-center">
                        <Col xs={8} lg={9} xl={8} xxl={8}>
                            <Row className="justify-content-between align-items-center bg-lightBlue px-3 py-4 rounded-5 shadow">
                                <Col className="pb-3 p-lg-0 p-xl-2 d-flex w-100 ">
                                    <img
                                        src={
                                            restaurant.image !== "default.jpg"
                                                ? `https://localhost:7275/images/${restaurant.image}`
                                                : defaultimage
                                        }
                                        alt="default"
                                        className="img-fluid RestaurantImgs flex-grow-1"
                                        style={{ width: 350, height: 250, borderRadius: 30 }}
                                    />
                                </Col>
                                <Col
                                    className="d-flex flex-column align-items-center"
                                    xs={{ span: 12, order: 1 }}
                                    lg={{ span: 5, order: 2 }}
                                >
                                    <Row>
                                        <Col xs={12} className="">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <div className="fs-7 p-1 p-xl-2 fw-semibold p-0">
                                                    <p className=" border-dotted mb-0 d-flex align-items-center">
                                                        <GeoAltFill size={14} className="text-violet me-2" />{" "}
                                                        <span>{distance.toFixed(2)} km</span>
                                                    </p>
                                                </div>
                                                <div className="p-0 d-flex justify-content-center">
                                                    <RestaurantStatus restaurant={restaurant} />
                                                </div>
                                            </div>

                                            <h4 className="text-black fw-bold h3 mb-0 ">{restaurant.name}</h4>

                                            <p className="text-black text-italic fs-7">{restaurant.category}</p>
                                            <p className="d-none d-lg-block text-black fw-semibold">
                                                {restaurant.description}
                                            </p>
                                            {isOpen(restaurant) && (
                                                <div className="d-flex align-items-center">
                                                    <ClockFill className="text-violet" />
                                                    <span className="ms-2">
                                                        {restaurant.openingHours.split(":").slice(0, 2).join(":")} -{" "}
                                                        {restaurant.closingHours.split(":").slice(0, 2).join(":")}
                                                    </span>
                                                </div>
                                            )}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                )}
                <Row className="pt-5 gy-5">
                    <div className="d-flex justify-content-end">
                        <input
                            type="text"
                            placeholder="Cerca un piatto"
                            className="cozy-input-form border-0 mb-0"
                            onChange={handleSearchIngredients}
                        />
                    </div>
                    {dishes &&
                        dishes
                            .filter((dish) => dish.isAvailable)
                            .map((dish) => {
                                return (
                                    <Col key={dish.idDish} xs={12} sm={6} lg={4} xl={3}>
                                        <div className="card border-lightViolet overflow-hidden ">
                                            <div className="dishImageContainer">
                                                <img
                                                    className="dish-image"
                                                    src={
                                                        dish.image != "default.jpg"
                                                            ? `https://localhost:7275/images/${dish.image}`
                                                            : FotoCibo
                                                    }
                                                    alt={dish.name}
                                                />
                                            </div>
                                            <div className="card-body d-flex flex-column justify-content-between">
                                                <div className="border-bottom-dashed pb-4">
                                                    <h5 className="card-title fw-bold mb-2">{dish.name}</h5>
                                                    <div className="ingredientDishContainer">
                                                        {dish.ingredients.map((ingredient) => (
                                                            <span
                                                                className="me-2 text-italic fs-6"
                                                                key={ingredient.idIngredient}
                                                            >
                                                                {ingredient.name},
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="d-flex align-items-center justify-content-between">
                                                    <p className="card-text mb-0 d-flex align-items-center flex-grow-1 ">
                                                        <img src={Euro} style={{ width: 14 }} />{" "}
                                                        <span className="ms-1">{dish.price}</span>
                                                    </p>
                                                    <div className="d-flex justify-content-center">
                                                        <input
                                                            type="number"
                                                            value={
                                                                quantities[dish.idDish] === null
                                                                    ? ""
                                                                    : quantities[dish.idDish]
                                                            }
                                                            onChange={(e) => handleQuantityChange(e, dish.idDish)}
                                                            className="form-control  cozy-number-input me-2 "
                                                            min="1"
                                                            max="10"
                                                        />
                                                    </div>
                                                    <div>
                                                        <button
                                                            onClick={() => handleAddToCart(dish)}
                                                            className="btn-form btn-green px-1"
                                                        >
                                                            Aggiungi
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                );
                            })}
                </Row>
            </Container>
        </>
    );
};
export default Restaurant;
