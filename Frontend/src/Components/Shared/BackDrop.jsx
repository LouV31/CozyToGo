import { useLocation } from "react-router-dom";
import GreenSVG from "./GreenSVG";
import VioletNavSvg from "./VioletNavSvg";
import TopVioletSvg from "./TopVioletSvg";
const BackDrop = () => {
    const location = useLocation();
    return (
        <>
            {location.pathname === "/" && <GreenSVG />}
            {(location.pathname === "/auth" ||
                location.pathname.includes("/profile") ||
                location.pathname === "/cart") && <VioletNavSvg />}
            {location.pathname === "/restaurants" && <VioletNavSvg />}
            {location.pathname.includes("/restaurant/") && <TopVioletSvg />}
        </>
    );
};
export default BackDrop;
