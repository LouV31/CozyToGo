import { Row, Col, Container } from "react-bootstrap";
const Footer = () => {
    return (
        <footer className="bg-black p-5 mt-5">
            <Row className="justify-content-center px-5">
                <Col xs={12} md={8}>
                    <Row>
                        <Col
                            xs={12}
                            md={4}
                            className="d-flex flex-column align-items-center align-items-md-start mb-4 mb-md-0"
                        >
                            <h3 className="text-playfair fw-bold text-violet">Chi siamo</h3>
                            <a className="text-decoration-underline text-white">Faq</a>
                            <a className="text-decoration-underline text-white">Contattaci</a>
                            <a className="text-decoration-underline text-white">Lavora con noi</a>
                        </Col>
                        <Col
                            xs={12}
                            md={4}
                            className="d-flex flex-column align-items-center align-items-md-start mb-4 mb-md-0"
                        >
                            <h3 className="text-playfair fw-bold text-violet">Seguici</h3>
                            <a className="text-decoration-underline text-white">Facebook</a>
                            <a className="text-decoration-underline text-white">Instagram</a>
                            <a className="text-decoration-underline text-white">Threads</a>
                        </Col>
                        <Col
                            xs={12}
                            md={4}
                            className="d-flex flex-column align-items-center align-items-md-start mb-4 mb-md-0"
                        >
                            <h3 className="text-playfair fw-bold text-violet">Feedback</h3>
                            <a className="text-decoration-underline text-white text-center">
                                Lascia un feedback, la tua opinione è importante!
                            </a>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={4}>
                    <Row>
                        <Col xs={12} className="d-flex flex-column align-items-center align-items-md-end  ">
                            <a className="text-decoration-none text-white text-center mb-3 mb-md-1">
                                TERMINI E CONDIZIONI
                            </a>
                            <a className="text-decoration-none text-white text-center mb-3 mb-md-1">
                                POLITICA SULLA PRIVACY
                            </a>
                            <a className="text-decoration-none text-white text-center mb-3 mb-md-1">
                                POLITICA SUI COOKIE
                            </a>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </footer>
    );
};
export default Footer;
