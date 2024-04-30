import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    addIngredient,
    editIngredient,
    getIngredients,
    searchIngredient,
} from "../../Redux/actions/Ingredient/IngredientsAction";
import { getRestaurantByOwner } from "../../Redux/actions/Restaurant/RestaurantsAction";
import { PenFill, Plus } from "react-bootstrap-icons";
import ModalComponent from "../Shared/ModalComponent";
import AddIngredientModal from "./AddIngredientModal";
import euroIcon from "../../assets/imgs/Euro.png";

const Ingredients = () => {
    const ingredients = useSelector((state) => state.ingredient.ingredients);
    const restaurant = useSelector((state) => state.restaurants.restaurant);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    const newIngredientDTO = {
        Name: name,
        Price: price,
        IdRestaurant: restaurant.idRestaurant,
    };

    const handleShowAddModal = () => {
        setIsEditMode(false);
        setShowModal(!showModal);
        setName("");
        setPrice("");
    };
    const handleShowEditModal = (ingredient) => {
        setIsEditMode(true);
        setName(ingredient.name);
        setPrice(ingredient.price);
        setEditingAddressId(ingredient.idIngredient);
        setShowModal(true);
        console.log("Edit");
        console.log(ingredient.name, ingredient.price);
    };

    const handleSearchIngredients = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditMode) {
            await dispatch(editIngredient(editingAddressId, name, price));
            await dispatch(getIngredients(restaurant.idRestaurant));
        } else {
            dispatch(addIngredient(newIngredientDTO));
        }
        setShowModal(false);
    };

    useEffect(() => {
        dispatch(getRestaurantByOwner());
    }, [dispatch]);

    useEffect(() => {
        if (restaurant) {
            dispatch(getIngredients(restaurant.idRestaurant));
        }
    }, [restaurant]);

    useEffect(() => {
        if (search.trim() !== "") {
            dispatch(searchIngredient(search));
        } else {
            dispatch(getIngredients(restaurant.idRestaurant));
        }
    }, [search]);
    return (
        <>
            <Row className="justify-content-center justify-content-xxl-start">
                <Col xs={12} xl={5} xxl={4} className="">
                    <h4 className="bg-violet border-message text-white text-center py-2 px-3 fs-5 text-playfair ">
                        Ingredienti
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
                        placeholder="Cerca un ingrediente"
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
                    <AddIngredientModal name={name} price={price} setName={setName} setPrice={setPrice} />
                </ModalComponent>
            </Row>
            <Row className="mt-5">
                {ingredients &&
                    ingredients.map((ingredient) => {
                        return (
                            <Col xs={12} key={ingredient.idIngredient}>
                                <div className="px-3 d-flex justify-content-between border-bottom-dashed align-items-center py-4">
                                    <p className="mb-0 text-playfair text-italic fs-5">{ingredient.name}</p>
                                    <div className="d-flex align-items-center">
                                        <p className="mb-0 text-playfair text-italic fs-5 fw-semibold me-2 me-md-4">
                                            {ingredient.price}{" "}
                                            <span>
                                                <img src={euroIcon} style={{ width: 16 }} />
                                            </span>
                                        </p>

                                        <PenFill
                                            className=" text-green cursor-pointer"
                                            size={20}
                                            onClick={() => handleShowEditModal(ingredient)}
                                        />
                                    </div>
                                </div>
                            </Col>
                        );
                    })}
            </Row>
        </>
    );
};
export default Ingredients;
