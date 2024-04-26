import { Button, Form, Modal } from "react-bootstrap";
const ModalComponent = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Body>{props.children}</Modal.Body>
                <Modal.Footer>
                    <button className="btn-form btn-violet" onClick={props.handleClose}>
                        Chiudi
                    </button>
                    <button className="btn-form btn-green" type="submit" onClick={props.handleSubmit}>
                        Salva
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalComponent;
