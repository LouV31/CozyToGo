import { Col, Row } from "react-bootstrap";
import ModalComponent from "../Shared/ModalComponent";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "react-bootstrap-icons";
import {
    addDish,
    editDish,
    getRestaurantDishes,
    searchDishes,
    toggleDishAvailability,
    uploadDishImage,
} from "../../Redux/actions/Restaurant/Dishes/DishesAction";
import AddDishModal from "./AddDishModal";
import Euro from "../../assets/imgs/Euro.png";
import FotoCibo from "../../assets/imgs/FotoCibo.avif";
import { set } from "react-hook-form";

const Dishes = () => {
    const restaurant = useSelector((state) => state.restaurants.restaurant);
    const dishes = useSelector((state) => state.restaurantDishes.dishes);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const fileInput = useRef(null);
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [editingDishId, setDishAddressId] = useState(null);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [ingredientsToAdd, setIngredientsToAdd] = useState([]);
    const dispatch = useDispatch();
    const handleShowAddModal = () => {
        setIsEditMode(false);
        setShowModal(!showModal);
        setName("");
        setDescription("");
        setIngredientsToAdd([]);
    };
    const handleShowEditModal = (dish) => {
        setIsEditMode(true);
        setName(dish.name);
        setDescription(dish.description);
        setIngredientsToAdd(dish.ingredients.map((ingredient) => ingredient.idIngredient));
        setDishAddressId(dish.idDish);

        setShowModal(true);
        console.log("Edit");
        console.log(dish.name, dish.price);
    };

    const handleImageClick = () => {
        fileInput.current.click();
    };

    const handleImageChange = async (e, idDish) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            await dispatch(uploadDishImage(idDish, file));
            await dispatch(getRestaurantDishes(restaurant.idRestaurant));
        }
    };

    const handleSearchIngredients = (e) => {
        setSearch(e.target.value);
    };

    const handleToggleDishAvailability = async (idDish) => {
        await dispatch(toggleDishAvailability(idDish));
        await dispatch(getRestaurantDishes(restaurant.idRestaurant));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditMode) {
            await dispatch(editDish(editingDishId, name, description, ingredientsToAdd));
            await dispatch(getRestaurantDishes(restaurant.idRestaurant));
        } else {
            await dispatch(addDish(restaurant.idRestaurant, name, description, ingredientsToAdd, image));
            await dispatch(getRestaurantDishes(restaurant.idRestaurant));
            setIngredientsToAdd([]);
        }
        setShowModal(false);
    };
    useEffect(() => {
        dispatch(getRestaurantDishes(restaurant.idRestaurant));
    }, [dispatch]);
    useEffect(() => {
        if (search.trim() !== "") {
            dispatch(searchDishes(search));
        } else {
            dispatch(getRestaurantDishes(restaurant.idRestaurant));
        }
    }, [search]);
    const handleMouseOver = (e) => {
        e.currentTarget.querySelector(".EditDishImg").style.opacity = "1";
        e.currentTarget.querySelector(".dishImageContainerID img").style.opacity = "0.8";
    };

    const handleMouseOut = (e) => {
        e.currentTarget.querySelector(".EditDishImg").style.opacity = "0";
        e.currentTarget.querySelector(".dishImageContainerID img").style.opacity = "1";
    };
    return (
        <>
            <Row className="justify-content-center justify-content-xxl-start">
                <Col xs={12} xl={5} xxl={4} className="">
                    <h4 className="bg-violet border-message text-white text-center py-2 px-3 fs-5 text-playfair ">
                        Piatti
                    </h4>
                </Col>
                <Col
                    xs={12}
                    xl={7}
                    xxl={6}
                    className="flex-grow-1 d-flex justify-content-between justify-content-xl-end"
                >
                    <input
                        type="text"
                        placeholder="Cerca un piatto"
                        className="cozy-input-form border-0 mb-0"
                        onChange={handleSearchIngredients}
                    />
                    <button className="btn-transparent border-0 bg-transparent">
                        <Plus size={42} className="text-green fw-bold" onClick={handleShowAddModal} />
                    </button>
                </Col>
                <ModalComponent
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    handleSubmit={handleSubmit}
                    title={"Aggiungi un Ingrediente"}
                >
                    <AddDishModal
                        setName={setName}
                        setDescription={setDescription}
                        setIngredientsToAdd={setIngredientsToAdd}
                        setImage={setImage}
                        isEditMode={isEditMode}
                        name={name}
                        description={description}
                        ingredientsToAdd={ingredientsToAdd}
                    />
                </ModalComponent>
            </Row>
            <Row className="pt-5 gy-5">
                {dishes &&
                    dishes.map((dish) => {
                        return (
                            <Col key={dish.idDish} xs={12} xxl={6}>
                                <div className="card border-lightViolet overflow-hidden">
                                    <div
                                        className="dishImgContainerID dishImageContainer position-relative "
                                        onMouseOver={handleMouseOver}
                                        onMouseOut={handleMouseOut}
                                    >
                                        <input
                                            type="file"
                                            style={{ display: "none" }}
                                            ref={fileInput}
                                            onChange={(e) => handleImageChange(e, dish.idDish)}
                                        />
                                        <img
                                            className="dish-image"
                                            src={
                                                dish.image != "default.jpg"
                                                    ? `https://localhost:7275/images/${dish.image}`
                                                    : FotoCibo
                                            }
                                            alt={dish.name}
                                            onClick={handleImageClick}
                                        />
                                        <p className="EditDishImg mb-0 h5">Modifica</p>
                                    </div>
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div className="border-bottom-dashed pb-5">
                                            <h5 className="card-title fw-bold mb-2">{dish.name}</h5>
                                            {dish.ingredients.map((ingredient) => (
                                                <span className="me-2 text-italic fs-6" key={ingredient.idIngredient}>
                                                    {ingredient.name}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="d-flex align-items-center justify-content-between">
                                            <p className="card-text mb-0 d-flex align-items-center flex-grow-1 ">
                                                <img src={Euro} style={{ width: 14 }} />{" "}
                                                <span className="ms-1">{dish.price}</span>
                                            </p>

                                            <div>
                                                <button
                                                    className="btn-form btn-violet py-1 px-2 me-2"
                                                    onClick={() => handleToggleDishAvailability(dish.idDish)}
                                                >
                                                    {dish.isAvailable ? "Disattiva" : "Attiva"}
                                                </button>
                                                <button
                                                    onClick={() => handleShowEditModal(dish)}
                                                    className="btn-form btn-green py-1 px-2"
                                                >
                                                    Modifica
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        );
                    })}
            </Row>
        </>
    );
};
export default Dishes;
