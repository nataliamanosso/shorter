import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    timeout: 5000,
});

export async function shorten(url) {
    const res = await API.post("/api/shorten", { url });
    return res.data;
}

export async function getInfo(id) {
    const res = await API.get(`/api/urls/${id}`);
    return res.data;
}
