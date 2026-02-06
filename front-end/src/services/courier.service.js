import { api } from "../api/client";

export const fetchCourierProfile = async (courierId) => {
    try {
        const response = await api.get(`couriers/${courierId}`);
        console.log("Fetched courier profile:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching courier profile:", error, "courierId:", courierId);
        throw error;
    }
}
