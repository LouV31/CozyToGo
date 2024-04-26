import { Form } from "react-bootstrap";
const EditEmailAndPasswordModal = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="text-playfair text-italic fw-semibold fs-6">Email</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Inserisci il nome dell'indirizzo"
                    className="cozy-input-form"
                    autoFocus
                    value={props.email}
                    onChange={(e) => props.setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label className="text-playfair text-italic fw-semibold fs-6">Phone</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Inserisci l'indirizzo"
                    className="cozy-input-form"
                    value={props.phone}
                    onChange={(e) => props.setPhone(e.target.value)}
                />
            </Form.Group>
        </Form>
    );
};
export default EditEmailAndPasswordModal;
