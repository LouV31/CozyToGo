import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import IconaProfilo from "../../assets/imgs/IconaProfilo.png";
import Account from "./Account";
import Addresses from "./Addresses";
import Orders from "./Orders";
import BackOffice from "./BackOffice";
import Ingredients from "./Ingredients";
import Dishes from "./Dishes";
import Sales from "./Sales";

const Profile = () => {
    const location = useLocation();
    const [selected, setSelected] = useState(location.state?.selected || "account");
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    const handleSelected = (item) => {
        setSelected(item);
    };

    return (
        <>
            <Container className="p-5 ">
                <Row className="pt-5 pt-md-0 mt-5">
                    <Col md={4} lg={3} className="d-flex flex-column justufy-content-end mb-5 mb-md-0">
                        <div className="d-flex flex-column p-2  border-lightViolet sticky">
                            <div className="d-flex justify-content-center pt-4">
                                <img src={IconaProfilo} id="IconaProfilo" alt={IconaProfilo} className="mb-5" />
                            </div>

                            <div className="d-flex flex-column align-items-start px-3">
                                {user && user.role === "Owner" ? (
                                    <>
                                        <a
                                            className={`mb-4 cursor-pointer text-hover-lightViolet-underline ${
                                                selected === "account" ? "text-violet fw-semibold" : "text-black"
                                            }`}
                                            onClick={() => handleSelected("account")}
                                        >
                                            Il mio ristorante
                                        </a>
                                        <a
                                            className={`mb-4 cursor-pointer text-hover-lightViolet-underline ${
                                                selected === "dishes" ? "text-violet fw-semibold" : "text-black"
                                            }`}
                                            onClick={() => handleSelected("dishes")}
                                        >
                                            I miei piatti
                                        </a>
                                        <a
                                            className={`mb-4 cursor-pointer text-hover-lightViolet-underline ${
                                                selected === "ingredients" ? "text-violet fw-semibold" : "text-black"
                                            }`}
                                            onClick={() => handleSelected("ingredients")}
                                        >
                                            I miei ingredienti
                                        </a>
                                        <a
                                            className={`mb-4 cursor-pointer text-hover-lightViolet-underline ${
                                                selected === "orders" ? "text-violet fw-semibold" : "text-black"
                                            }`}
                                            onClick={() => handleSelected("orders")}
                                        >
                                            Ordini
                                        </a>
                                        <a
                                            className={`mb-4 cursor-pointer text-hover-lightViolet-underline ${
                                                selected === "sales" ? "text-violet fw-semibold" : "text-black"
                                            }`}
                                            onClick={() => handleSelected("sales")}
                                        >
                                            Fatturato
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        <a
                                            className={`mb-4 cursor-pointer text-hover-lightViolet-underline ${
                                                selected === "account" ? "text-violet fw-semibold" : "text-black"
                                            }`}
                                            onClick={() => handleSelected("account")}
                                        >
                                            Account
                                        </a>
                                        <a
                                            className={`mb-4 cursor-pointer text-hover-lightViolet-underline ${
                                                selected === "addresses" ? "text-violet fw-semibold" : "text-black"
                                            }`}
                                            onClick={() => handleSelected("addresses")}
                                        >
                                            I miei indirizzi
                                        </a>
                                        <a
                                            className={`mb-4 cursor-pointer text-hover-lightViolet-underline ${
                                                selected === "orders" ? "text-violet fw-semibold" : "text-black"
                                            }`}
                                            onClick={() => handleSelected("orders")}
                                        >
                                            I miei ordini
                                        </a>
                                        {user && user.role === "Admin" ? (
                                            <>
                                                <hr className="w-100" />
                                                <a
                                                    className={`mb-4 cursor-pointer text-hover-lightViolet-underline ${
                                                        selected === "backoffice"
                                                            ? "text-violet fw-semibold"
                                                            : "text-black"
                                                    }`}
                                                    onClick={() => handleSelected("backoffice")}
                                                >
                                                    Back Office
                                                </a>
                                            </>
                                        ) : null}
                                    </>
                                )}
                            </div>
                        </div>
                    </Col>

                    <Col md={7} lg={6} className="offset-md-1 offset-lg-2 pt-2">
                        {selected === "account" ? (
                            <Account />
                        ) : selected === "addresses" ? (
                            <Addresses />
                        ) : selected === "orders" ? (
                            <Orders />
                        ) : selected === "backoffice" ? (
                            <BackOffice />
                        ) : selected === "ingredients" ? (
                            <Ingredients />
                        ) : selected === "dishes" ? (
                            <Dishes />
                        ) : selected === "sales" ? (
                            <Sales />
                        ) : null}
                    </Col>
                </Row>
            </Container>
            {/* <CroppedVioletSvg /> */}
        </>
    );
};

export default Profile;
