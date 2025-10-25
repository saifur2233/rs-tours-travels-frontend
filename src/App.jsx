import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Site from "./pages/Site";
import Admin from "./pages/Admin";
import { Toaster } from "react-hot-toast";

export default function App() {
    useEffect(() => {
        // Ensure jQuery is available
        const $ = window.$ || window.jQuery;

        // Spinner: hide when page is ready
        const hideSpinner = () => {
            $("#spinner").removeClass("show");
        };
        $(window).on("load", hideSpinner);
        // Also hide after a short delay (fallback)
        setTimeout(hideSpinner, 800);

        // WOW init
        if (window.WOW) {
            new window.WOW().init();
        }

        // Counter-Up init
        if ($ && $.fn.counterUp) {
            $("[data-toggle='counter-up']").counterUp({
                delay: 10,
                time: 2000,
            });
        }

        // Owl Carousel for testimonials
        if ($ && $.fn.owlCarousel) {
            $(".testimonial-carousel").owlCarousel({
                autoplay: true,
                smartSpeed: 1000,
                center: false,
                dots: true,
                loop: true,
                margin: 25,
                responsive: {
                    0: { items: 1 },
                    768: { items: 2 },
                    1200: { items: 3 },
                },
            });
        }

        // Back to top
        const backToTop = $(".back-to-top");
        $(window).scroll(function () {
            if ($(this).scrollTop() > 300) {
                backToTop.fadeIn("slow");
            } else {
                backToTop.fadeOut("slow");
            }
        });
        backToTop.on("click", function (e) {
            e.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, 600, "easeInOutExpo");
        });
    }, []);

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Site />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
