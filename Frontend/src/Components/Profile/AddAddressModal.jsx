import { Form } from "react-bootstrap";
const AddAddressModal = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="text-playfair text-italic fw-semibold fs-6">Nome Indirizzo</Form.Label>
                <Form.Control
                    className="cozy-input-form"
                    type="text"
                    placeholder="Inserisci il nome dell'indirizzo"
                    autoFocus
                    value={props.addressName}
                    onChange={(e) => props.setAddressName(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label className="text-playfair text-italic fw-semibold fs-6">Indirizzo</Form.Label>
                <Form.Control
                    className="cozy-input-form"
                    type="text"
                    placeholder="Inserisci l'indirizzo"
                    value={props.streetAddress}
                    onChange={(e) => props.setStreetAddress(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label className="text-playfair text-italic fw-semibold fs-6">Città</Form.Label>
                <Form.Control
                    className="cozy-input-form"
                    type="text"
                    placeholder="Inserisci la città"
                    value={props.city}
                    onChange={(e) => props.setCity(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                <Form.Label className="text-playfair text-italic fw-semibold fs-6">Codice Postale</Form.Label>
                <Form.Control
                    className="cozy-input-form"
                    type="text"
                    placeholder="Inserisci il codice postale"
                    value={props.zipCode}
                    onChange={(e) => props.setZipCode(e.target.value)}
                />
            </Form.Group>
        </Form>
    );
};
export default AddAddressModal;
