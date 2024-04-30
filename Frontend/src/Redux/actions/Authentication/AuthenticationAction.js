import { toast } from "react-toastify";

export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const registerUser = (name, surname, email, password, city, address, zipCode, phone) => {
    return async (dispatch) => {
        try {
            const response = await fetch("https://localhost:7275/api/Auth/register", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    Name: name,
                    Surname: surname,
                    Email: email,
                    Password: password,
                    City: city,
                    StreetAddress: address,
                    ZipCode: zipCode,
                    Phone: phone,
                }),
            });
            if (response.ok) {
                toast.success("Registrazione effettuata con successo");

                const registerData = await response.json();

                dispatch({
                    type: REGISTER_USER,
                    payload: registerData.user,
                });
            } else {
                console.log("Error posting data!");
            }
        } catch (error) {
            toast.error("Registrazione fallita");
            console.log(error);
        }
    };
};

export const loginUser = (Email, Password, navigate) => {
    return async (dispatch) => {
        try {
            const response = await fetch("https://localhost:7275/api/Auth/authentication", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    Email: Email,
                    Password: Password,
                }),
            });
            if (response.ok) {
                const loginData = await response.json();

                dispatch({
                    type: LOGIN_USER,
                    payload: loginData,
                });
                toast.success("Login effettuata con successo");
                navigate("/");
            } else {
                throw new Error("Error fetching data from server!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Login fallita");
        }
    };
};

export const logoutUser = () => {
    toast.success("Logout effettuata con successo");
    return {
        type: LOGOUT_USER,
    };
};
