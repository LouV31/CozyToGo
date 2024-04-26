import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../Redux/actions/Category/CategoryAction";
import { useEffect } from "react";
const AddRestaurantAndOwnerModal = (props) => {
    const category = useSelector((state) => state.category.categories);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmit();
    };
    return (
        <Form onSubmit={handleSubmit}>
            <div className="pb-2 border-bottom-dashed mb-3">
                <div className="mb-5">
                    <span className="fw-semibold fs-4 border-message bg-violet text-white p-1 px-3">Proprietario</span>
                </div>
                <div className="d-block d-sm-flex justify-content-between align-items-center flex-column flex-sm-row">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className="text-playfair text-italic fw-semibold fs-6">Nome</Form.Label>
                        <Form.Control
                            className="cozy-input-form"
                            type="text"
                            placeholder="Nome"
                            autoFocus
                            required
                            onChange={(e) => props.setOwnerName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label className="text-playfair text-italic fw-semibold fs-6">Cognome</Form.Label>
                        <Form.Control
                            className="cozy-input-form"
                            type="text"
                            placeholder="Cognome"
                            required
                            onChange={(e) => props.setOwnerSurname(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <div className=" d-block d-sm-flex justify-content-between align-items-center flex-column flex-sm-row">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label className="text-playfair text-italic fw-semibold fs-6">Email</Form.Label>
                        <Form.Control
                            className="cozy-input-form"
                            type="email"
                            placeholder="Inserisci email"
                            required
                            onChange={(e) => props.setOwnerEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                        <Form.Label className="text-playfair text-italic fw-semibold fs-6">Password</Form.Label>
                        <Form.Control
                            className="cozy-input-form"
                            type="password"
                            placeholder="Inserisci password"
                            required
                            onChange={(e) => props.setOwnerPassword(e.target.value)}
                        />
                    </Form.Group>
                </div>
            </div>
            <div className="mt-4">
                <div className="mb-5">
                    <span className="fw-semibold fs-4 border-message bg-violet text-white p-1 px-3">Ristorante</span>
                </div>
                <div className="d-block d-sm-flex justify-content-between align-items-center flex-column flex-sm-row">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                        <Form.Label className="text-playfair text-italic fw-semibold fs-6">Nome</Form.Label>
                        <Form.Control
                            required
                            className="cozy-input-form"
                            type="text"
                            placeholder="Inserisci nome ristorante"
                            // value={props.name}
                            onChange={(e) => props.setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 flex-grow-1 ms-0 ms-sm-3" controlId="exampleForm.ControlInput6">
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
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput10">
                    <Form.Label className="text-playfair text-italic fw-semibold fs-6">Descrizione</Form.Label>
                    <Form.Control
                        required
                        className="cozy-input-form"
                        type="text"
                        placeholder="Inserisci descrizione"
                        // value={props.description}
                        onChange={(e) => props.setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                    <Form.Label className="text-playfair text-italic fw-semibold fs-6">Indirizzo</Form.Label>
                    <Form.Control
                        required
                        className="cozy-input-form"
                        type="text"
                        placeholder="Inserisci indirizzo"
                        // value={props.address}
                        onChange={(e) => props.setAddress(e.target.value)}
                    />
                </Form.Group>
                <div className="d-block d-sm-flex justify-content-between align-items-center flex-column flex-sm-row">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                        <Form.Label className="text-playfair text-italic fw-semibold fs-6">Città</Form.Label>
                        <Form.Control
                            required
                            className="cozy-input-form"
                            type="text"
                            placeholder="Inserisci città"
                            // value={props.city}
                            onChange={(e) => props.setCity(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput9">
                        <Form.Label className="text-playfair text-italic fw-semibold fs-6">CAP</Form.Label>
                        <Form.Control
                            required
                            className="cozy-input-form"
                            type="text"
                            placeholder="Inserisci CAP"
                            pattern="\d{5}"
                            onChange={(e) => props.setZipCode(e.target.value)}
                            onInvalid={(e) => e.target.setCustomValidity("Inserisci un CAP valido di 5 cifre")}
                            onInput={(e) => e.target.setCustomValidity("")}
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
                            // value={props.openingHours}
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
                            // value={props.closingHours}
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
                            // value={props.closingDay}
                            onChange={(e) => props.setClosingDay(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <div className="d-block d-sm-flex justify-content-s align-items-center flex-column flex-sm-row">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput14">
                        <Form.Label className="text-playfair text-italic fw-semibold fs-6">Tel.</Form.Label>
                        <Form.Control
                            required
                            className="cozy-input-form"
                            type="text"
                            placeholder="Inserisci cellulare"
                            // value={props.phone}
                            onChange={(e) => props.setPhone(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput15">
                        <Form.Label className="text-playfair text-italic fw-semibold fs-6">Email</Form.Label>
                        <Form.Control
                            required
                            className="cozy-input-form"
                            type="email"
                            placeholder="Inserisci email"
                            value={props.email}
                            onChange={(e) => props.setEmail(e.target.value)}
                        />
                    </Form.Group>
                </div>
            </div>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput16">
                <Form.Label className="text-playfair text-italic fw-semibold fs-6">Immagine</Form.Label>
                <Form.Control
                    required
                    className="cozy-input-form"
                    type="file"
                    placeholder="Inserisci immagine"
                    onChange={(e) => props.setImage(e.target.files[0])}
                />
            </Form.Group>
        </Form>
    );
};
export default AddRestaurantAndOwnerModal;
