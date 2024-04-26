import { store } from "../store/store";
async function fetchWithAuth(url, options = {}) {
    const state = store.getState();
    const token = state.auth.user.token;
    console.log(token);
    if (token) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}
export default fetchWithAuth;
