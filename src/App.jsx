import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Site from "./pages/Site";
import Admin from "./pages/Admin";
import ServiceDetails from "./pages/ServiceDetails";
import { Toaster } from "react-hot-toast";

export default function App() {
    // Removed global jQuery initialization - now handled in individual components

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Site />} />
                    <Route path="/service/:id" element={<ServiceDetails />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
