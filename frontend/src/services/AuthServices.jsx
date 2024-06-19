import axios from "axios"

export const userSignUp = (payload) => {
    try {
        const response = axios.post("http://localhost:3105/api/passengers/", payload);
        console.log(response)
    } catch (error) {
        console.log(error);
    }
}