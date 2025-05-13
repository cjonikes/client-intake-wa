import axios from "axios"
import { UserCredentialsProps } from "@/lib/types"

async function getUserFromDb({ email, password}: UserCredentialsProps) {
    try {
        const response = await axios.post(`/api/users/login`, {
            email,
            password,
        });
        return response.data || null;
    } catch (error) {
        console.error(error);
        return null
    }
}

export { getUserFromDb };