import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { getIngredients } from "../../Redux/actions/Ingredient/IngredientsAction";
import { useDispatch, useSelector } from "react-redux";

const AddDishModal = (props) => {
    const dispatch = useDispatch();
    const restaurant = useSelector((state) => state.restaurants.restaurant);
    const ingredients = useSelector((state) => state.ingredient.ingredients);
    useEffect(() => {
        dispatch(getIngredients(restaurant.idRestaurant));
    }, []);
    return (
        <Form onSubmit={props.handleSubmit}>
            <div className="d-block d-sm-flex justify-content-between align-items-center flex-column flex-sm-row">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="text-playfair text-italic fw-semibold fs-6">Nome</Form.Label>
                    <Form.Control
                        className="cozy-input-form"
                        type="text"
                        placeholder="Nome"
                        autoFocus
                        required
                        value={props.name}
                        onChange={(e) => props.setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label className="text-playfair text-italic fw-semibold fs-6">Descrizione</Form.Label>
                    <Form.Control
                        className="cozy-input-form"
                        type="text"
                        placeholder="Descrizione"
                        required
                        value={props.description}
                        onChange={(e) => props.setDescription(e.target.value)}
                    />
                </Form.Group>
            </div>
            <Form.Group className="IngredientListToAddContainer">
                <Form.Label className="text-playfair text-italic fw-semibold fs-6">Ingredienti</Form.Label>
                {ingredients &&
                    ingredients.map((ingredient) => (
                        <Form.Check
                            className="text-italic text-violet fw-semibold myCheckbox"
                            key={ingredient.idIngredient}
                            type="checkbox"
                            label={ingredient.name}
                            defaultChecked={props.ingredientsToAdd.includes(ingredient.idIngredient)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    props.setIngredientsToAdd((oldIngredients) => [
                                        ...oldIngredients,
                                        ingredient.idIngredient,
                                    ]);
                                } else {
                                    props.setIngredientsToAdd((oldIngredients) =>
                                        oldIngredients.filter((id) => id !== ingredient.idIngredient)
                                    );
                                }
                            }}
                        />
                    ))}
            </Form.Group>
            {!props.isEditMode && (
                <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput16">
                    <Form.Label className="text-playfair text-italic fw-semibold fs-6">Immagine</Form.Label>
                    <Form.Control
                        required
                        className="cozy-input-form"
                        type="file"
                        placeholder="Inserisci immagine"
                        onChange={(e) => props.setImage(e.target.files[0])}
                    />
                </Form.Group>
            )}
        </Form>
    );
};
export default AddDishModal;
