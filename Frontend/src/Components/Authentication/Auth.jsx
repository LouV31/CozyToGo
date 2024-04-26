import { Row, Col, Container, Button } from "react-bootstrap";

import { useState } from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import VioletNavSvg from "../Shared/VioletNavSvg";

const Auth = () => {
    const [isRegister, setIsRegister] = useState(false);
    const handleRegister = () => {
        setIsRegister(false);
    };

    return (
        <>
            <Container className=" p-5 ">
                <Row className="mt-5 justify-content-center">
                    <Col xs={12} md={8} lg={6} xl={5} xxl={4} className="border border-1 rounded-5 shadow p-5">
                        <div className="py-5">
                            {isRegister ? (
                                <>
                                    <h2 className="text-center text-italic text-green text-playfair fw-semibold mb-5">
                                        Benvenuto!
                                    </h2>{" "}
                                    <RegisterForm navigateToLogin={handleRegister} />
                                </>
                            ) : (
                                <>
                                    <h2 className="text-center fw-semibold mb-5">
                                        Accedi a{" "}
                                        <span className="text-green text-playfair text-italic fw-bold">Cozy</span>{" "}
                                        <span className="text-violet text-playfair fw-bold">to go</span>
                                    </h2>
                                    <LoginForm />
                                </>
                            )}
                            {isRegister ? (
                                <div className="d-flex justify-content-between align-items-center mt-5">
                                    <p className="mb-0">Hai già un account?</p>
                                    <Button
                                        variant="link"
                                        className="text-green fw-bold text-decoration-none"
                                        onClick={() => setIsRegister(!isRegister)}
                                    >
                                        Accedi ora
                                    </Button>
                                </div>
                            ) : (
                                <div className="d-flex justify-content-between align-items-center mt-5">
                                    <p className="mb-0">Non hai un account?</p>
                                    <Button
                                        variant="link"
                                        className="text-green fw-bold text-decoration-none"
                                        onClick={() => setIsRegister(!isRegister)}
                                    >
                                        Registrati ora
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default Auth;
