import { isOpen } from "./restaurantUtility";

const RestaurantStatus = ({ restaurant }) => {
    if (!restaurant) {
        return null; // or some fallback UI
    }
    return (
        <p className={isOpen(restaurant) ? "badge-open mb-0" : "badge-closed mb-0"}>
            {isOpen(restaurant) ? "Aperto" : "Chiuso"}
        </p>
    );
};

export default RestaurantStatus;
