import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchService, fetchLogo, fetchHotline, fetchEmail, fetchSocial } from "../api";
import "./ServiceDetails.css";

export default function ServiceDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Site data for navbar and footer
    const [logo, setLogo] = useState(null);
    const [hotline, setHotline] = useState(null);
    const [email, setEmail] = useState(null);
    const [social, setSocial] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [serviceRes, logoRes, hotlineRes, emailRes, socialRes] = await Promise.all([
                    fetchService(id),
                    fetchLogo(),
                    fetchHotline(),
                    fetchEmail(),
                    fetchSocial(),
                ]);

                if (serviceRes?.data) {
                    setService(serviceRes.data);
                } else {
                    setError("Service not found");
                }

                setLogo(logoRes.data);
                setHotline(hotlineRes.data);
                setEmail(emailRes.data);
                setSocial(socialRes.data);
            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError("Failed to load service details");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    // jQuery initialization for back-to-top button
    useEffect(() => {
        const $ = window.$ || window.jQuery;
        if (!$) return;

        // WOW init
        if (window.WOW) {
            new window.WOW().init();
        }

        // Back to top
        const backToTop = $(".back-to-top");
        if (backToTop.length) {
            const handleScroll = () => {
                if ($(window).scrollTop() > 300) {
                    backToTop.fadeIn("slow");
                } else {
                    backToTop.fadeOut("slow");
                }
            };

            $(window).on("scroll", handleScroll);

            backToTop.on("click", function (e) {
                e.preventDefault();
                $("html, body").animate({ scrollTop: 0 }, 600, "easeInOutExpo");
            });

            // Cleanup
            return () => {
                $(window).off("scroll", handleScroll);
                backToTop.off("click");
            };
        }
    }, []);

    const hotlineText = hotline?.number || "09617-616263";
    const emailText = email?.email || "info@rstours.com";
    const logoUrl = logo?.imageUrl || "/img/logo.png";

    if (loading) {
        return (
            <div className="service-details-loading">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading service details...</p>
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="service-details-error">
                <div className="error-content">
                    <i className="fas fa-exclamation-circle fa-4x text-danger mb-4"></i>
                    <h2>{error || "Service not found"}</h2>
                    <p>The service you're looking for doesn't exist or has been removed.</p>
                    <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
                        <i className="fas fa-home me-2"></i>Back to Home
                    </button>
                </div>
            </div>
        );
    }

    const displayImage = service.service_extra_img || service.service_img;

    return (
        <>
            {/* Topbar Start */}
            <div className="container-fluid bg-primary px-5 d-none d-lg-block">
                <div className="row gx-0 align-items-center">
                    <div className="col-lg-8 text-center text-md-start mb-lg-0">
                        <div className="d-flex">
                            <a href={`mailto:${emailText}`} className="text-white me-4">
                                <i className="fas fa-envelope text-white me-2"></i>
                                {emailText}
                            </a>
                            <a href={`tel:${hotlineText}`} className="text-white me-0">
                                <i className="fas fa-phone-alt text-white me-2"></i>
                                {hotlineText}
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 text-center text-lg-end">
                        <div className="d-inline-flex align-items-center" style={{ height: 45 }}>
                            <a className="btn btn-sm btn-outline-light btn-square rounded-circle me-2" href={social?.twitter || "#"}>
                                <i className="fab fa-twitter fw-normal text-white"></i>
                            </a>
                            <a className="btn btn-sm btn-outline-light btn-square rounded-circle me-2" href={social?.facebook || "#"}>
                                <i className="fab fa-facebook-f fw-normal text-white"></i>
                            </a>
                            <a className="btn btn-sm btn-outline-light btn-square rounded-circle me-2" href={social?.linkedin || "#"}>
                                <i className="fab fa-linkedin-in fw-normal text-white"></i>
                            </a>
                            <a className="btn btn-sm btn-outline-light btn-square rounded-circle me-2" href={social?.instagram || "#"}>
                                <i className="fab fa-instagram fw-normal text-white"></i>
                            </a>
                            <a className="btn btn-sm btn-outline-light btn-square rounded-circle" href={social?.youtube || "#"}>
                                <i className="fab fa-youtube fw-normal text-white"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Topbar End */}

            {/* Navbar & Hero Start */}
            <div className="container-fluid nav-bar p-0">
                <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 px-lg-5 py-3 py-lg-0">
                    <a href="/" className="navbar-brand p-0">
                        <h2 className="display-7 text-secondary m-0">
                            <img src={logoUrl} className="img-fluid" alt="" />
                            <b>RS Tours & Travels</b>
                        </h2>
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                    >
                        <span className="fa fa-bars"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto py-0">
                            <a href="/" className="nav-item nav-link">
                                Home
                            </a>
                            <a href="/#about_section" className="nav-item nav-link">
                                About
                            </a>
                            <a href="/#service_section" className="nav-item nav-link active">
                                Service
                            </a>
                            <a href="/#contact_section" className="nav-item nav-link">
                                Contact
                            </a>
                        </div>
                        <a
                            href={`tel:${hotlineText}`}
                            className="btn btn-primary border-secondary rounded-pill py-2 px-4 px-lg-3 mb-3 mb-md-3 mb-lg-0"
                        >
                            {hotlineText}
                        </a>
                    </div>
                </nav>
            </div>
            {/* Navbar & Hero End */}

            {/* Breadcrumb Start */}
            <div className="container-fluid breadcrumb-section py-5">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">
                        {service.service_name}
                    </h1>
                    <ol className="breadcrumb justify-content-center mb-0 animated slideInDown">
                        <li className="breadcrumb-item">
                            <a href="/" className="text-white">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="/#service_section" className="text-white">Services</a>
                        </li>
                        <li className="breadcrumb-item text-white active" aria-current="page">
                            {service.service_name}
                        </li>
                    </ol>
                </div>
            </div>
            {/* Breadcrumb End */}

            {/* Service Details Start */}
            <div className="container-fluid service-details-section py-5">
                <div className="container py-5">
                    <div className="row g-5">
                        {/* Main Image */}
                        <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.1s">
                            <div className="service-details-image-wrapper">
                                <img
                                    src={displayImage}
                                    alt={service.service_name}
                                    className="img-fluid rounded service-main-image"
                                />
                                {service.service_extra_img && service.service_img && (
                                    <div className="service-thumbnail mt-3">
                                        <img
                                            src={service.service_img}
                                            alt={`${service.service_name} - Main`}
                                            className="img-fluid rounded"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Service Info */}
                        <div className="col-lg-6 wow fadeInRight" data-wow-delay="0.3s">
                            <div className="service-details-content">
                                <div className="service-badge mb-3">
                                    <span className="badge bg-primary">
                                        <i className="fas fa-star me-1"></i>
                                        Premium Service
                                    </span>
                                </div>

                                <h2 className="display-5 mb-4">{service.service_name}</h2>

                                <div className="service-short-desc mb-4">
                                    <div className="icon-box d-flex align-items-start">
                                        <div className="icon-wrapper me-3">
                                            <i className="fas fa-quote-left fa-2x text-primary"></i>
                                        </div>
                                        <p className="lead text-muted">
                                            {service.service_short_desc}
                                        </p>
                                    </div>
                                </div>

                                <div className="service-features mb-4">
                                    <h4 className="mb-3">
                                        <i className="fas fa-check-circle text-primary me-2"></i>
                                        Key Features
                                    </h4>
                                    <ul className="feature-list">
                                        <li>
                                            <i className="fas fa-arrow-right text-secondary me-2"></i>
                                            Professional and experienced team
                                        </li>
                                        <li>
                                            <i className="fas fa-arrow-right text-secondary me-2"></i>
                                            Complete documentation support
                                        </li>
                                        <li>
                                            <i className="fas fa-arrow-right text-secondary me-2"></i>
                                            Fast and reliable processing
                                        </li>
                                        <li>
                                            <i className="fas fa-arrow-right text-secondary me-2"></i>
                                            24/7 customer assistance
                                        </li>
                                    </ul>
                                </div>

                                <div className="service-actions">
                                    <a href="#contact_section" className="btn btn-primary btn-lg me-3">
                                        <i className="fas fa-envelope me-2"></i>
                                        Contact Us
                                    </a>
                                    <button className="btn btn-outline-secondary btn-lg" onClick={() => navigate("/")}>
                                        <i className="fas fa-arrow-left me-2"></i>
                                        Back to Home
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Full Description */}
                    <div className="row mt-5">
                        <div className="col-12 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-full-description">
                                <h3 className="mb-4">
                                    <i className="fas fa-info-circle text-primary me-2"></i>
                                    Detailed Information
                                </h3>
                                <div className="description-content">
                                    {service.service_desc.split('\n\n').map((paragraph, idx) => (
                                        <p key={idx} className="mb-3 text-justify">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="row mt-5">
                        <div className="col-12 wow fadeInUp" data-wow-delay="0.7s">
                            <div className="service-cta text-center">
                                <div className="cta-content p-5 rounded bg-light">
                                    <h3 className="mb-3">Ready to Get Started?</h3>
                                    <p className="lead mb-4">
                                        Contact us today and let our experts guide you through the process
                                    </p>
                                    <a href="/#contact_section" className="btn btn-primary btn-lg">
                                        <i className="fas fa-phone-alt me-2"></i>
                                        Get in Touch
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Service Details End */}

            {/* Footer Start */}
            <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <h4 className="text-secondary mb-4">Contact Info</h4>
                                <a href=""><i className="fa fa-map-marker-alt me-2"></i> Chowdhury Market (2nd Floor), Barura West Bazar, College Road, Barura, Comilla</a>
                                <a href={`mailto:${emailText}`}><i className="fas fa-envelope me-2"></i> {emailText}</a>
                                <a href={`tel:${hotlineText}`}><i className="fas fa-phone me-2"></i> {hotlineText}</a>
                                <div className="d-flex align-items-center">
                                    <i className="fas fa-share fa-2x text-secondary me-2"></i>
                                    <a className="btn mx-1" href={social?.facebook || "#"}><i className="fab fa-facebook-f"></i></a>
                                    <a className="btn mx-1" href={social?.twitter || "#"}><i className="fab fa-twitter"></i></a>
                                    <a className="btn mx-1" href={social?.instagram || "#"}><i className="fab fa-instagram"></i></a>
                                    <a className="btn mx-1" href={social?.linkedin || "#"}><i className="fab fa-linkedin-in"></i></a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <h4 className="text-secondary mb-4">Opening Time</h4>
                                <div className="mb-3">
                                    <h6 className="text-muted mb-0">Sat - Friday</h6>
                                    <p className="text-white mb-0">24 Hours Service</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <h4 className="text-secondary mb-4">Our Services</h4>
                                <a href="/#service_section" className=""><i className="fas fa-angle-right me-2"></i> Ticketing</a>
                                <a href="/#service_section" className=""><i className="fas fa-angle-right me-2"></i> Hajj Ticket Service</a>
                                <a href="/#service_section" className=""><i className="fas fa-angle-right me-2"></i> Umrah Ticket Service</a>
                                <a href="/#service_section" className=""><i className="fas fa-angle-right me-2"></i> Visa Service</a>
                                <a href="/#service_section" className=""><i className="fas fa-angle-right me-2"></i> Hajj Package</a>
                                <a href="/#service_section" className=""><i className="fas fa-angle-right me-2"></i> Umrah Package</a>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item">
                                <h4 className="text-secondary mb-4">Newsletter</h4>
                                <p className="text-white mb-3">
                                    Subscribe to our newsletter to get the latest updates and offers.
                                </p>
                                <div className="position-relative mx-auto rounded-pill">
                                    <input
                                        className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5"
                                        type="text"
                                        placeholder="Enter your email"
                                    />
                                    <button type="button" className="btn btn-primary rounded-pill position-absolute top-0 end-0 py-2 mt-2 me-2">
                                        SignUp
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer End */}

            {/* Copyright Start */}
            <div className="container-fluid copyright py-4">
                <div className="container">
                    <div className="row g-4 align-items-center">
                        <div className="col-md-6 text-center text-md-start mb-md-0">
                            <span className="text-white">
                                <a href="#" className="border-bottom text-white">
                                    <i className="fas fa-copyright text-light me-2"></i>RS Tours & Travels
                                </a>
                                , All right reserved.
                            </span>
                        </div>
                        <div className="col-md-6 text-center text-md-end text-white">
                            Designed By{" "}
                            <a className="border-bottom text-white" href="https://smartitsolutionsnz.vercel.app/">
                                Smart IT Solution
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Copyright End */}

            {/* Back to Top */}
            <a href="#" className="btn btn-primary btn-lg-square back-to-top">
                <i className="fa fa-arrow-up"></i>
            </a>
        </>
    );
}
