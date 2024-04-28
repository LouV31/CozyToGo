import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    GetOrders,
    getRestaurantOrders,
    getRestaurantOrdersByEmail,
    setDeliveredOrder,
} from "../../Redux/actions/Profile/ProfileActions";
import { Row, Col } from "react-bootstrap";
import { formatReadableDate } from "../../DateScript";
import { Link } from "react-router-dom";
import { CheckCircleFill, FlagFill, HourglassSplit } from "react-bootstrap-icons";
import { set } from "react-hook-form";
const Orders = () => {
    const orders = useSelector((state) => state.profile.orders);
    const restaurantOwner = useSelector((state) => state.auth.user);
    const [searchEmail, setSearchEmail] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        if (restaurantOwner.role === "Owner") {
            dispatch(getRestaurantOrders());
            console.log("Sono owner");
        } else {
            dispatch(GetOrders());
            console.log("Sono user", orders);
        }
    }, []);

    useEffect(() => {
        if (restaurantOwner.role === "Owner") {
            if (searchEmail.trim() !== "") {
                dispatch(getRestaurantOrdersByEmail(searchEmail));
            } else {
                dispatch(getRestaurantOrders());
            }
        }
    }, [searchEmail]);

    const handleDeliverOrder = async (idOrderDetails) => {
        await dispatch(setDeliveredOrder(idOrderDetails));
        console.log(idOrderDetails);
    };
    const handleSearchOrders = (e) => {
        setSearchEmail(e.target.value);
    };
    return (
        <>
            <Row className="mb-5 align-items-center ">
                <Col xs={12} md={8} lg={6} xl={5} xxl={4} className="me-auto">
                    <h4 className="bg-violet border-message text-white text-center py-2 px-3 fs-5 text-playfair ">
                        I miei ordini
                    </h4>
                </Col>
                {restaurantOwner.role === "Owner" && (
                    <Col xs={12} xl={7} xxl={6} className="d-flex justify-content-between justify-content-xl-end">
                        <input
                            type="text"
                            placeholder="Cerca per email"
                            className="cozy-input-form border-0 mb-0"
                            onChange={handleSearchOrders}
                        />
                    </Col>
                )}
            </Row>
            <Row xs={1} className="gy-3">
                {orders && orders.length > 0 ? (
                    [...orders]
                        .sort((a, b) => {
                            let aDelivered, bDelivered;
                            if (restaurantOwner.role === "Owner") {
                                aDelivered = a.orderDetails.every((orderDetail) => orderDetail.isDelivered);
                                bDelivered = b.orderDetails.every((orderDetail) => orderDetail.isDelivered);
                            } else {
                                aDelivered = a.restaurants.every((restaurant) =>
                                    restaurant.dishes.every((dish) => dish.isDelivered)
                                );
                                bDelivered = b.restaurants.every((restaurant) =>
                                    restaurant.dishes.every((dish) => dish.isDelivered)
                                );
                            }
                            return aDelivered === bDelivered ? 0 : aDelivered ? -1 : 1;
                        })
                        .reverse()
                        .map((order) => (
                            <Col key={order.idOrder} className="border-message border-lightViolet p-5">
                                <Row xs={1} xl={2} className="justify-content-md-between mb-4">
                                    <Col className="d-flex justify-content-center justify-content-xl-start mb-3 mb-xl-0">
                                        <h3>Ordine n#{order.idOrder}</h3>
                                    </Col>
                                    <Col className="d-flex flex-column align-items-center align-items-xl-end">
                                        <h4>Stato dell'ordine</h4>
                                        {restaurantOwner.role === "Owner" ? (
                                            <p
                                                className={`text-italic ${
                                                    order.orderDetails.every((orderDetail) => orderDetail.isDelivered)
                                                        ? "text-green"
                                                        : "text-warning"
                                                }`}
                                            >
                                                {order.orderDetails.every((orderDetail) => orderDetail.isDelivered)
                                                    ? "Consegnato"
                                                    : "In Consegna"}
                                            </p>
                                        ) : (
                                            <p
                                                className={`text-italic ${
                                                    order.restaurants.every((restaurant) =>
                                                        restaurant.dishes.every((dish) => dish.isDelivered)
                                                    )
                                                        ? "text-green"
                                                        : "text-warning"
                                                }`}
                                            >
                                                {order.restaurants.every((restaurant) =>
                                                    restaurant.dishes.every((dish) => dish.isDelivered)
                                                )
                                                    ? `Consegnato:  ${formatReadableDate(order.deliveryDate)}`
                                                    : `In consegna`}
                                            </p>
                                        )}
                                    </Col>
                                </Row>
                                {restaurantOwner.role === "Owner"
                                    ? order.orderDetails && (
                                          <>
                                              <div className="d-flex align-items-center justify-content-between mb-2">
                                                  <p className="text-decoration-none text-playfair h4 mb-0">
                                                      {order.user.email}
                                                  </p>
                                              </div>
                                              <Row xs={1} className="p-3 align-items-center">
                                                  {order.orderDetails.map((orderDetail) => (
                                                      <Fragment key={orderDetail.idOrderDetail}>
                                                          <Col className="border-bottom-dashed pb-4 d-flex justify-content-between align-items-center mb-4">
                                                              <img
                                                                  src={`https://localhost:7275/images/${orderDetail.dish.image}`}
                                                                  style={{
                                                                      width: 100,
                                                                      height: 56,
                                                                      borderRadius: 20,
                                                                      objectFit: "cover",
                                                                      objectPosition: "center",
                                                                  }}
                                                              />
                                                              <p className="mb-0">{orderDetail.dish.name}</p>
                                                              <p className="mb-0">x{orderDetail.dish.quantity}</p>
                                                          </Col>
                                                      </Fragment>
                                                  ))}
                                              </Row>
                                          </>
                                      )
                                    : order.restaurants &&
                                      order.restaurants.map((restaurant) => (
                                          <Fragment key={restaurant.idRestaurant}>
                                              <div className="d-flex justify-content-between align-items-center">
                                                  <Link
                                                      to={`/restaurant/` + restaurant.idRestaurant}
                                                      className="text-decoration-none text-playfair h4 text-hover-violet"
                                                  >
                                                      {restaurant.name}
                                                  </Link>
                                                  {restaurant.dishes.every((dish) => dish.isDelivered) ? (
                                                      <CheckCircleFill className="text-green" />
                                                  ) : (
                                                      <HourglassSplit className="text-warning" />
                                                  )}
                                              </div>
                                              <Row xs={1} className="p-3 align-items-center">
                                                  {restaurant.dishes.map((dish) => (
                                                      <Fragment key={dish.idDish}>
                                                          <Col className="border-bottom-dashed pb-4 d-flex justify-content-between align-items-center mb-4">
                                                              <img
                                                                  src={`https://localhost:7275/images/${dish.image}`}
                                                                  style={{
                                                                      width: 80,
                                                                      height: 80,
                                                                      objectFit: "cover",
                                                                      borderRadius: 20,
                                                                  }}
                                                              />
                                                              <p className="mb-0">{dish.name}</p>
                                                              <p className="mb-0">x{dish.quantity}</p>
                                                          </Col>
                                                      </Fragment>
                                                  ))}
                                              </Row>
                                          </Fragment>
                                      ))}

                                <div className="d-flex flex-column align-items-end">
                                    <h4 className="text-playfair">Totale</h4>
                                    <p>
                                        {restaurantOwner.role === "Owner"
                                            ? order.orderDetails.reduce(
                                                  (total, orderDetail) =>
                                                      total + orderDetail.dish.price * orderDetail.dish.quantity,
                                                  0
                                              )
                                            : order.total}
                                        €
                                    </p>
                                </div>
                                <h4 className="text-playfair">Indirizzo di consegna</h4>
                                <p className="border-message bg-lightViolet px-3 py-2 text-italic">
                                    {order.deliveryAddress}
                                </p>
                                {order.notes && (
                                    <>
                                        <h4 className="text-playfair">Note</h4>
                                        <p className="border-message bg-lightViolet px-3 py-2 text-italic">
                                            {order.notes}
                                        </p>
                                    </>
                                )}
                                {restaurantOwner.role === "Owner" && (
                                    <div className="d-flex align-items-center justify-content-end">
                                        <button
                                            className={`btn-form btn-green ${
                                                order.orderDetails.every((orderDetail) => orderDetail.isDelivered)
                                                    ? "d-none"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleDeliverOrder(
                                                    order.orderDetails.map((orderDetail) => orderDetail.idOrderDetail)
                                                )
                                            }
                                        >
                                            Consegna
                                        </button>
                                    </div>
                                )}
                            </Col>
                        ))
                ) : (
                    <p>Nessun ordine trovato</p>
                )}
            </Row>
        </>
    );
};
export default Orders;
