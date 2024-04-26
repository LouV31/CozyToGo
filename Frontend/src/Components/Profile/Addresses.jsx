import { Row, Col } from "react-bootstrap";
import { Heart, HeartFill, PencilFill, Plus } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { AddAddress, EditAddress, getAddresses, SetPrimaryAddress } from "../../Redux/actions/Profile/ProfileActions";
import ModalComponent from "../Shared/ModalComponent";
import AddAddressModal from "./AddAddressModal";

const Addresses = () => {
    const addresses = useSelector((state) => state.profile.addresses);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [addressName, setAddressName] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");

    const handleShowAddModal = () => {
        setIsEditMode(false);
        setShowModal(true);
        setAddressName("");
        setStreetAddress("");
        setCity("");
        setZipCode("");
    };

    const handleShowEditModal = (address) => {
        setIsEditMode(true);
        setAddressName(address.addressName);
        setStreetAddress(address.streetAddress);
        setCity(address.city);
        setZipCode(address.zipCode);
        setEditingAddressId(address.idAddress);
        setShowModal(true);
        console.log(address.idAddress);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const completeAddress = `${streetAddress}, ${city}, ${zipCode}`;
        if (isEditMode) {
            dispatch(EditAddress(editingAddressId, addressName, completeAddress));
            console.log(editingAddressId);
        } else {
            dispatch(AddAddress(addressName, completeAddress));
        }

        setShowModal(false);
    };

    const handleMainAddress = (idAddress) => {
        dispatch(SetPrimaryAddress(idAddress));
    };

    useEffect(() => {
        dispatch(getAddresses());
    }, [dispatch]);
    return (
        <>
            <Row className="mb-5 align-items-center ">
                <Col xs={8} lg={6} xl={5} xxl={4} className="me-auto">
                    <h4 className="bg-violet border-message text-white text-center py-2 px-3 fs-5 text-playfair ">
                        I miei indirizzi
                    </h4>
                </Col>
                <Col xs={4} lg={6} xl={7} xxl={6} className="d-flex justify-content-end">
                    <button className="btn-transparent border-0 bg-transparent">
                        <Plus size={42} className="text-green fw-bold" onClick={handleShowAddModal} />
                    </button>
                </Col>
                <ModalComponent show={showModal} handleClose={() => setShowModal(false)} handleSubmit={handleSubmit}>
                    <AddAddressModal
                        handleSubmit={handleSubmit}
                        setAddressName={setAddressName}
                        setStreetAddress={setStreetAddress}
                        setCity={setCity}
                        setZipCode={setZipCode}
                        addressName={addressName}
                        streetAddress={streetAddress}
                        city={city}
                        zipCode={zipCode}
                    />
                </ModalComponent>
            </Row>
            <Row className="align-items-center">
                {addresses && addresses.length > 0 ? (
                    addresses.map((address, index) => (
                        <Fragment key={index}>
                            <Col xs={10} className="mb-4">
                                <h3 className="fs-5 ps-3">{address.addressName}</h3>
                                <div className=" border-lightViolet-message text-violet fw-medium text-italic p-2 d-flex ">
                                    <p className="mb-0 me-auto">{address.completeAddress}</p>
                                </div>
                            </Col>
                            <Col xs={2}>
                                <button
                                    className="btn-transparent border-0 bg-transparent"
                                    onClick={() => handleShowEditModal(address)}
                                >
                                    <PencilFill size={24} className="text-green fw-bold" />
                                </button>
                                <button
                                    className="btn-transparent border-0 bg-transparent"
                                    onClick={() => handleMainAddress(address.idAddress)}
                                >
                                    {address.isPrimary ? (
                                        <HeartFill size={24} className="text-green fw-bold" />
                                    ) : (
                                        <Heart size={24} className="text-green fw-bold" />
                                    )}
                                </button>
                            </Col>
                        </Fragment>
                    ))
                ) : (
                    <p> Non ci sono indirizzi</p>
                )}
            </Row>
        </>
    );
};
export default Addresses;
