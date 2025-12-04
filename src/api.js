import axios from "axios";

// export const API_BASE = import.meta.env.VITE_API_BASE || "https://rs-tours-travels-server.vercel.app";
export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

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
export const fetchAllHeroBanners = () => api.get("/hero-banner").then(r => r.data);
export const createHeroBanner = (payload) => api.post("/hero-banner", payload).then(r => r.data);
export const updateHeroBanner = (id, payload) => api.put(`/hero-banner/${id}`, payload).then(r => r.data);
export const deleteHeroBanner = (id) => api.delete(`/hero-banner/${id}`).then(r => r.data);

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

// ---- SERVICES ----
export const fetchAllServices = () => api.get("/services").then(r => r.data);
export const fetchService = (id) => api.get(`/services/${id}`).then(r => r.data);
export const createService = (payload) => api.post("/services", payload).then(r => r.data);
export const updateService = (id, payload) => api.put(`/services/${id}`, payload).then(r => r.data);
export const deleteService = (id) => api.delete(`/services/${id}`).then(r => r.data);

// ---- CLIENT REVIEWS ----
export const fetchAllClientReviews = () => api.get("/client-reviews").then(r => r.data);
export const fetchClientReview = (id) => api.get(`/client-reviews/${id}`).then(r => r.data);
export const createClientReview = (payload) => api.post("/client-reviews", payload).then(r => r.data);
export const updateClientReview = (id, payload) => api.put(`/client-reviews/${id}`, payload).then(r => r.data);
export const deleteClientReview = (id) => api.delete(`/client-reviews/${id}`).then(r => r.data);

// ---- PROFILE ----
export const getProfile = (token) =>
    api.get("/auth/profile", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

export const updateProfile = (token, payload) =>
    api.put("/auth/profile", payload, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

export const changePassword = (token, payload) =>
    api.put("/auth/change-password", payload, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

// ---- ADMIN MANAGEMENT ----
export const getAllAdmins = (token) =>
    api.get("/auth/admins", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

export const createAdmin = (token, payload) =>
    api.post("/auth/admins", payload, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

export const updateAdmin = (token, id, payload) =>
    api.put(`/auth/admins/${id}`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

export const deleteAdmin = (token, id) =>
    api.delete(`/auth/admins/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
