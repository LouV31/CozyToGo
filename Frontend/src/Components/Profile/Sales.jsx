import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { getSales, getSalesByDate } from "../../Redux/actions/Profile/ProfileActions";
import euroIcon from "../../assets/imgs/Euro.png";
import { formatReadableDate } from "../../DateScript";
const Sales = () => {
    const sales = useSelector((state) => state.profile.sales);
    const dispatch = useDispatch();
    const [date, setDate] = useState("");

    const handleSearchSale = (e) => {
        dispatch(getSalesByDate(e.target.value));
    };
    useEffect(() => {
        dispatch(getSales());
    }, [dispatch]);
    return (
        <>
            <Row className="mb-5 align-items-center ">
                <Col xs={12} md={8} lg={6} xl={5} xxl={4} className="me-auto">
                    <h4 className="bg-violet border-message text-white text-center py-2 px-3 fs-5 text-playfair ">
                        Fatturato
                    </h4>
                </Col>
                <Col xs={12} xl={7} xxl={6} className="d-flex justify-content-between justify-content-xl-end">
                    <input
                        type="date"
                        placeholder="Cerca un ristorante"
                        className="cozy-input-form border-0 mb-0"
                        onChange={handleSearchSale}
                    />
                </Col>
            </Row>
            <Row className="mt-5">
                {sales &&
                    [...sales].reverse().map((sale, index) => {
                        return (
                            <Col xs={12} key={index}>
                                <div className="px-3 d-flex justify-content-between border-bottom-dashed align-items-center py-4">
                                    <p className="mb-0 text-playfair text-italic fs-5">
                                        {formatReadableDate(sale.orderDate).split(" ")[0]}
                                    </p>
                                    <p className="mb-0 text-playfair text-italic fs-5 fw-semibold">
                                        {sale.total}{" "}
                                        <span>
                                            <img src={euroIcon} style={{ width: 16 }} />
                                        </span>
                                    </p>
                                </div>
                            </Col>
                        );
                    })}
            </Row>
        </>
    );
};
export default Sales;
