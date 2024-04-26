import { Form } from "react-bootstrap";

const AddIngredientModal = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="text-playfair text-italic fw-semibold fs-6">Prezzo</Form.Label>
                <Form.Control
                    className="cozy-input-form"
                    type="text"
                    placeholder="Prezzo in €"
                    autoFocus
                    required
                    value={props.price}
                    onChange={(e) => props.setPrice(e.target.value)}
                />
            </Form.Group>
        </Form>
    );
};
export default AddIngredientModal;
