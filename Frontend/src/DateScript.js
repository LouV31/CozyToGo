export function formatReadableDate(dateString) {
    const myDate = new Date(dateString);
    const readableDate = `${myDate.getDate().toString().padStart(2, "0")}/${(myDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${myDate.getFullYear()} ${myDate.getHours().toString().padStart(2, "0")}:${myDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    return readableDate;
}
