import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL|| "http://localhost:8080/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Response interceptor — handles token expiry globally
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config;

        // If access token expired, try refreshing once
        if (
            error.response?.status === 401 &&
            error.response?.data?.code === "TOKEN_EXPIRED" &&
            !original._retry
        ) {
            original._retry = true;

            try {
                await api.post("/auth/refresh");
                return api(original); // retry the original request
            } catch {
                // Refresh also failed — redirect to login
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;