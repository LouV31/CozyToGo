import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../assets/imgs/Logo.png";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { Cart, CartFill, PersonFill } from "react-bootstrap-icons";
import { logoutUser } from "../../Redux/actions/Authentication/AuthenticationAction";
import { useEffect, useState } from "react";
import { getUser } from "../../Redux/actions/Profile/ProfileActions";
import { Badge } from "react-bootstrap";
function CozyNavbar({ toggleCart }) {
    const navigate = useNavigate();
    const userAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const [isSticky, setIsSticky] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const cartItems = useSelector((state) => state.cart.items);
    const totalItems = cartItems.map((item) => item.quantity).reduce((acc, curr) => acc + curr, 0);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/");
    };
    const handleOrderClick = () => {
        navigate(`/profile?idUser=${user.id}&name=${user.name}&surname=${user.surname}`, {
            state: { selected: "orders" },
        });
    };
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (location.pathname === "/" && width < 768) {
            document.getElementById("myDropMenu").classList.add("bg-violet");

            console.log(innerWidth);
        } else {
            document.getElementById("myDropMenu").classList.remove("bg-violet");
        }
        if (location.pathname !== "/" && width < 768) {
            document.getElementById("myDropMenu").classList.add("bg-green");
        } else {
            document.getElementById("myDropMenu").classList.remove("bg-green");
        }
    }, [width, location.pathname]);

    return (
        <>
            <Navbar
                expand="md"
                className={`px-5 pt-2 pt-lg-5 mb-5 ${isSticky ? "sticky-nav" : ""} ${
                    !isSticky ? "bg-transparent" : ""
                } ${location.pathname === "/" ? "nav-green" : "nav-violet"}`}
                variant="dark"
            >
                <Navbar.Brand onClick={() => navigate("/")}>
                    <img src={Logo} alt="Logo" id="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-white" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav
                        id="myDropMenu"
                        className="ms-auto align-items-start align-items-md-center mt-5 mt-md-0 rounded-5 rounded-md-0 p-5 p-md-0"
                    >
                        {userAuthenticated ? (
                            <>
                                <div className="d-block d-md-none">
                                    <p className="mb-2 text-white fw-semibold fs-5">Area Personale</p>
                                    <div className="ps-2 text-italic">
                                        <div>
                                            <Link
                                                className="text-white fw-semibold "
                                                to={`/profile?idUser=${user.id}&name=${user.name}&surname=${user.surname}`}
                                            >
                                                Profilo
                                            </Link>
                                        </div>
                                        <div>
                                            <Link className="text-white fw-semibold " to={`/cart`}>
                                                Carrello
                                            </Link>
                                        </div>
                                        <p
                                            className="text-white fw-semibold text-decoration-underline mt-1 mb-0"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </p>
                                    </div>
                                </div>
                                {location.pathname.includes("/restaurant/") && (
                                    <Link
                                        className="text-white fw-semibold text-decoration-none rounded-pill shadow p-2 me-3"
                                        to={"/restaurants"}
                                    >
                                        Ristoranti
                                    </Link>
                                )}
                                <NavDropdown
                                    className="d-none d-md-flex align-items-center rounded-pill shadow"
                                    align="end"
                                    title={
                                        <span className="text-white">
                                            <span className="me-3">{user.name}</span>
                                            <PersonFill color="white" size={22} />
                                        </span>
                                    }
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item
                                        className=" py-2 text-hover-violet"
                                        href={`/profile?idUser=${user.id}&name=${user.name}&surname=${user.surname}`}
                                    >
                                        Profilo
                                    </NavDropdown.Item>

                                    <NavDropdown.Item className="py-2 text-hover-violet" onClick={handleLogout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <div className="d-none d-md-flex align-items-center ms-md-5 cursor-pointer position-relative ">
                                    <CartFill
                                        className="d-none d-lg-block"
                                        color="white"
                                        size={22}
                                        onClick={toggleCart}
                                    />
                                    {totalItems > 0 && (
                                        <Badge
                                            pill
                                            bg="success"
                                            className="position-absolute top-0 start-100 translate-middle"
                                        >
                                            {totalItems}
                                        </Badge>
                                    )}

                                    <Link to="/cart" className="d-lg-none text-decotation-none mb-0">
                                        <CartFill color="white" size={22} />
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <Button
                                    className="btn btn-light rounded-pill px-3 text-decoration-underline fs-7 text-green"
                                    onClick={() => navigate("/auth")}
                                >
                                    Sign in / Login
                                </Button>
                            </> // Replace this comment with what you want to render when the user is not authenticated
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default CozyNavbar;
