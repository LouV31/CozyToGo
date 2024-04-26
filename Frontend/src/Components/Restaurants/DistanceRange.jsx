import { useState } from "react";

function DistanceFilter({ distance, onDistanceChange }) {
    const handleDistanceChange = (event) => {
        onDistanceChange(event.target.value);
    };

    return (
        <div>
            <input type="range" min="0" max="15" value={distance} onChange={handleDistanceChange} />
            <p>Distance: {distance} km</p> {/* Mostra la distanza corrente */}
        </div>
    );
}

export default DistanceFilter;
