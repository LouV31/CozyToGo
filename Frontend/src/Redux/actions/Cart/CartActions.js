import fetchWithAuth from "../FetchWithAuth";

export const sendOrder = async (order) => {
    try {
        console.log(order);
        const orderData = await fetchWithAuth(`https://localhost:7275/api/Cart/submitOrder`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(order),
        });

        return orderData;
    } catch (error) {
        console.log(error);
    }
};
