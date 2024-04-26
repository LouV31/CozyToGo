import { useEffect, useState } from "react";
const TopVioletSvg = () => {
    const [width, setWidth] = useState(window.innerWidth);

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
        let myDiv = document.getElementById("topBgVioletFill");
        let height = -0.26 * width + 298;
        myDiv.style.height = height + "px";
    }, [width]);
    return (
        <div id="topVioletSvg">
            <div id="topBgVioletFill"></div>
            <svg data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 484">
                <path
                    d="M304.15,781.61v258.55c180.75,19.51,287.73-18.84,387-41.51,98.4-22.48,169.27-36.56,231.75,9.3,39,28.63,135.16,29.46,205.2,25.63,103.44-5.65,207.75,5.41,299.62,32.82,235.54,70.27,316.43,199.21,316.43,199.21v-484Z"
                    transform="translate(-304.15 -781.61)"
                    fill="#615aa4"
                />
            </svg>
        </div>
    );
};
export default TopVioletSvg;
