import { Col } from "react-bootstrap";
const IconCards = (props) => {
    return (
        <Col>
            <div className=" px-5 d-flex flex-column align-items-center">
                <div>
                    {" "}
                    <img src={props.icon} alt={props.iconAlt} className="icon-cards" />{" "}
                </div>
                <div className="text-center  ">
                    <h3 className="text-lightViolet text-center text-playfair fs-2 fw-semibold mb-3">
                        {props.title} <span className="text-italic text-playfair">{props.titleSpan}</span>
                    </h3>
                    <p className="fw-bold">{props.text}</p>
                </div>
            </div>
        </Col>
    );
};
export default IconCards;
