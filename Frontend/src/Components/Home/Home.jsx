import { Container, Row, Col, Form } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearSuggestions, getLocation, getSuggestions } from "../../Redux/actions/Home/SearchLocationAction";
import CupIcon from "../Icons/CupIcon";
import SearchIcon from "../Icons/SearchIcon";
import DeliveryIcon from "../../assets/imgs/DeliveryIcon.png";
import Shop from "../../assets/imgs/Shop.png";
import Cucina from "../../assets/imgs/Cucina.png";
import IconCards from "./IconCards";
import VioletSvg from "../Shared/VioletSvg";
import Footer from "./Footer";
import GreenSVG from "../Shared/GreenSVG";
import { toast } from "react-toastify";

const Home = () => {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
    const suggestions = useSelector((state) => state.location.suggestions);
    const addresses = useSelector((state) => state.location.addresses);
    const [flag, setFlag] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 200);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    useEffect(() => {
        if (debouncedSearch.length > 2 && !flag) {
            dispatch(getSuggestions(debouncedSearch));
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [debouncedSearch]);

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedSuggestion((prev) => Math.min(prev + 1, suggestions.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedSuggestion((prev) => Math.max(prev - 1, -1));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (selectedSuggestion >= 0) {
                setSearch(suggestions[selectedSuggestion].display_name);
                setShowSuggestions(false);
            }
        }
    };

    const handleReset = () => {
        setSelectedSuggestion(-1);
        dispatch(clearSuggestions());
    };

    const handleSuggestionClick = (suggestion) => {
        setSearch(suggestion.display_name);
        setShowSuggestions(false);
        setFlag(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) {
            toast.error("Devi inserire un indirizzo");
            return;
        }
        dispatch(getLocation(search));
        navigate("/restaurants");
    };

    return (
        <>
            <Container className="pt-5 mt-4 mb-5">
                <Row xs={1} sm={1} md={2} className="pb-5">
                    <Col xs={{ order: 2 }} md={{ order: 1 }} className="d-flex flex-column justify-content-end">
                        <div>
                            <h1 className="text-playfair fw-bold mb-5">
                                Come vuoi <br />{" "}
                                <span className="text-violet text-italic fw-bold text-playfair">coccolarti</span> oggi?
                            </h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="position-relative">
                                    <Form.Control
                                        className="rounded-pill r border-2 border-violet fs-7 px-4 py-3 "
                                        placeholder="Inserisci indirizzo di consegna"
                                        onClick={handleReset}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onBlur={() => setTimeout(handleReset, 100)}
                                        onKeyDown={handleKeyDown}
                                        value={search}
                                        ref={inputRef}
                                    />
                                    {suggestions && showSuggestions && (
                                        <ul className="suggestions-list">
                                            {suggestions.map((suggestion, index) => (
                                                <li
                                                    key={index}
                                                    className={`suggestion-item ${
                                                        index === selectedSuggestion ? "active" : ""
                                                    }`}
                                                    onClick={() => handleSuggestionClick(suggestion)}
                                                >
                                                    {suggestion.display_name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    <button className="search-icon" style={{ border: "none", background: "none" }}>
                                        <SearchIcon />
                                    </button>
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>
                    <Col xs={{ order: 1 }} md={{ order: 2 }} className="text-end mb-5 mb-md-0">
                        <CupIcon />
                    </Col>
                </Row>
                <section className="mt-5">
                    <div className="d-flex justify-content-center pt-5 mb-5">
                        <h2 className="text-montserrat fw-bold text-white text-italic bg-violet border-message  px-4 py-2">
                            Perché scegliere noi?
                        </h2>
                    </div>
                    <Row xs={1} lg={3} className="pt-5">
                        <IconCards
                            icon={DeliveryIcon}
                            iconAlt={DeliveryIcon}
                            title={"Delivery"}
                            titleSpan={"attento"}
                            text={
                                "Potrai ordinare dove vuoi senza rinunciare al gusto e alla salute, cosa vuoi di più?"
                            }
                        />
                        <IconCards
                            icon={Shop}
                            iconAlt={Shop}
                            title={"Spesa e"}
                            titleSpan={"ricette"}
                            text={
                                "Ti risolviamo il problema del frigo vuoto! Potrai ordinare sia da catene che da shop locali."
                            }
                        />
                        <IconCards
                            icon={Cucina}
                            iconAlt={Cucina}
                            title={"La tua"}
                            titleSpan={"cucina"}
                            text={
                                "Il nostro obiettivo è farti sentire a casa, super semplice con le nostre personalizzazioni!"
                            }
                        />
                    </Row>
                </section>
            </Container>
            <div className="pt-2 mb-5">
                <VioletSvg />
            </div>
            <Container className="mt-5 p-5">
                <Row xs={1} md={2} className="justify-content-center pt-5">
                    <Col className="d-flex align-items-end justify-content-center justify-content-md-start">
                        <div className="mb-4 mb-md-0">
                            <h2 className="text-violet fw-bold fs-1 text-playfair">
                                {" "}
                                In quali <span className="text-italic text-playfair">città</span> <br /> siamo presenti?
                            </h2>
                        </div>
                    </Col>
                    <Col>
                        <Row className="justify-content-center justify-content-md-around">
                            <Col className="d-flex flex-column align-items-center">
                                <p className="mb-3 fw-semibold">Napoli</p>
                                <p className="mb-3 fw-semibold">Caserta</p>
                                <p className="mb-3 fw-semibold">Milano</p>
                                <p className="mb-3 fw-semibold">Monza</p>
                                <p className="mb-3 fw-semibold">Torino</p>
                            </Col>
                            <Col className="d-flex flex-column align-items-center">
                                <p className="mb-3 fw-semibold">Firenze</p>
                                <p className="mb-3 fw-semibold">Pisa</p>
                                <p className="mb-3 fw-semibold">Siena</p>
                                <p className="mb-3 fw-semibold">Riccione</p>
                                <p className="mb-3 fw-semibold">Rimini</p>
                            </Col>
                            <Col className="d-flex flex-column align-items-center">
                                <p className="mb-3 fw-semibold">Ravenna</p>
                                <p className="mb-3 fw-semibold">Messina</p>
                                <p className="mb-3 fw-semibold">Palermo</p>
                                <p className="mb-3 fw-semibold">Cagliari</p>
                                <p className="mb-3 fw-semibold">Lecce</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};
export default Home;
