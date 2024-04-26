import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../Redux/actions/Category/CategoryAction";
const EditRestaurantModal = (props) => {
    const category = useSelector((state) => state.category.categories);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
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
                        value={props.restaurantName}
                        onChange={(e) => props.setRestaurantName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3 flex-grow-1 ms-0 ms-sm-3" controlId="exampleForm.ControlInput2">
                    <Form.Label className="text-playfair text-italic fw-semibold fs-6">Categoria</Form.Label>
                    <div className="">
                        <select
                            className="cozy-input-form w-100 border-0"
                            required
                            value={props.category}
                            onChange={(e) => props.setCategory(e.target.value)}
                        >
                            {category &&
                                category.map((cat, index) => (
                                    <option key={index} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                        </select>
                    </div>
                </Form.Group>
            </div>
            <div className="d-block d-sm-flex justify-content-between align-items-center flex-column flex-sm-row">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="text-playfair text-italic fw-semibold fs-6">Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Inserisci il nome dell'indirizzo"
                        className="cozy-input-form"
                        autoFocus
                        value={props.restaurantEmail}
                        onChange={(e) => props.setRestaurantEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label className="text-playfair text-italic fw-semibold fs-6">Phone</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Inserisci l'indirizzo"
                        className="cozy-input-form"
                        value={props.restaurantPhone}
                        onChange={(e) => props.setRestaurantPhone(e.target.value)}
                    />
                </Form.Group>
            </div>
            <div className="d-block d-sm-flex justify-content-between align-items-center flex-column flex-sm-row">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput11">
                    <Form.Label className="text-playfair text-italic fw-semibold fs-6">Apertura</Form.Label>
                    <Form.Control
                        required
                        className="cozy-input-form"
                        type="time"
                        placeholder="Inserisci orario apertura"
                        value={props.openingHours}
                        onChange={(e) => props.setOpeningHours(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput12">
                    <Form.Label className="text-playfair text-italic fw-semibold fs-6">Chiusura</Form.Label>
                    <Form.Control
                        required
                        className="cozy-input-form"
                        type="time"
                        placeholder="Inserisci orario chiusura"
                        value={props.closingHours}
                        onChange={(e) => props.setClosingHours(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput13">
                    <Form.Label className="text-playfair text-italic fw-semibold fs-6">Festivo</Form.Label>
                    <Form.Control
                        required
                        className="cozy-input-form"
                        type="text"
                        placeholder="Inserisci giorno festivo"
                        value={props.closingDay}
                        onChange={(e) => props.setClosingDay(e.target.value)}
                    />
                </Form.Group>
            </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput13">
                <Form.Label className="text-playfair text-italic fw-semibold fs-6">Festivo</Form.Label>
                <Form.Control
                    required
                    className="cozy-input-form"
                    type="text"
                    placeholder="Inserisci giorno festivo"
                    value={props.description}
                    onChange={(e) => props.setDescription(e.target.value)}
                />
            </Form.Group>
        </Form>
    );
};
export default EditRestaurantModal;
