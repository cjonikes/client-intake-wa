import axios from "axios"
import { NextResponse } from "next/server"


async function logoutUserFromSession() {

    try {
        const response = await axios.post(`/api/users/logout`)
        return response
    }catch (error) {
        return NextResponse.json(
        { error: `Server error ${error}` },
        { status: 500 }
        );
    }
}

export { logoutUserFromSession };