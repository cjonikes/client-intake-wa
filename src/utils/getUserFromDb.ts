import axios from "axios"
import { userCredentials } from "@/lib/types"

async function getUserFromDb({ email, password}: userCredentials) {
    try {
        const response = await axios.post(`/api/users/login`, {
            email,
            password,
        });
        return response.data || null;
    } catch (error) {
        // console.error(error);
        return null
    }
}

export { getUserFromDb };