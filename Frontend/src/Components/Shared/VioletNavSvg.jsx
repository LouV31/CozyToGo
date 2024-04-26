import { useState, useEffect } from "react";
const VioletNavSvg = () => {
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
        let myDiv = document.getElementById("bgVioletFill");
        let height = -0.26 * width + 298;
        myDiv.style.height = height + "px";
    }, [width]);
    return (
        <div id="violetSvg">
            <div id="bgVioletFill"></div>
            <svg data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1441 168.65">
                <path
                    fill="#615aa4"
                    d="M1744.83,939.79v168.65q-12.84-3.95-26.2-7.72c-115.68-32.62-247-45.78-377.28-39.06-88.19,4.56-209.31,3.57-258.38-30.5-78.68-54.58-167.92-37.82-291.82-11.08-125,27-259.72,72.63-487.32,49.41V939.79Z"
                    transform="translate(-303.83 -939.79)"
                />
            </svg>
        </div>
    );
};
export default VioletNavSvg;
