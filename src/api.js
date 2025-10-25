import axios from "axios";

export const API_BASE = import.meta.env.VITE_API_BASE || "https://rs-tours-travels-server.vercel.app";

const api = axios.create({
    baseURL: `${API_BASE}/api`,
});

// AUTH
export const registerAdmin = (payload) =>
    api.post("/auth/register", payload).then(r => r.data);

export const loginAdmin = (payload) =>
    api.post("/auth/login", payload).then(r => r.data);

export const verifyToken = (token) =>
    api.get("/auth/verify", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

// ---- HERO BANNER ----
export const fetchHeroBanner = () => api.get("/hero-banner/latest").then(r => r.data);
export const createHeroBanner = (payload) => api.post("/hero-banner", payload).then(r => r.data);

// ---- LOGO ----
export const fetchLogo = () => api.get("/logo/latest").then(r => r.data);
export const createLogo = (payload) => api.post("/logo", payload).then(r => r.data);

// ---- HOTLINE ----
export const fetchHotline = () => api.get("/hotline/latest").then(r => r.data);
export const createHotline = (payload) => api.post("/hotline", payload).then(r => r.data);

// ---- EMAIL ----
export const fetchEmail = () => api.get("/email/latest").then(r => r.data);
export const createEmail = (payload) => api.post("/email", payload).then(r => r.data);

// ---- ADDRESS ----
export const fetchAddress = () => api.get("/address/latest").then(r => r.data);
export const createAddress = (payload) => api.post("/address", payload).then(r => r.data);

// ---- SOCIAL LINKS ----
export const fetchSocial = () => api.get("/social-links/latest").then(r => r.data);
export const createSocial = (payload) => api.post("/social-links", payload).then(r => r.data);
