export const isOpen = (restaurant) => {
    const days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
    const currentDay = days[new Date().getDay()];
    const currentTime = new Date().getHours() + ":" + new Date().getMinutes();
    if (currentDay === restaurant.closingDay) {
        return false;
    }

    if (currentTime >= restaurant.openingHours && currentTime <= restaurant.closingHours) {
        return true;
    }

    return false;
};
