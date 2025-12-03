import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, ValidationError } from "@formspree/react";
import { toast } from "react-hot-toast";

import {
    fetchAllHeroBanners,
    fetchAllServices,
    fetchLogo,
    fetchHotline,
    fetchEmail,
    fetchAddress,
    fetchSocial,
    fetchAllClientReviews,
} from "../api";

// You already have your big JSX in App.jsx. Move it here and bind to state where needed.
export default function Site() {
    const navigate = useNavigate();
    const [heroBanners, setHeroBanners] = useState([]);
    const [services, setServices] = useState([]);
    const [logo, setLogo] = useState(null);
    const [hotline, setHotline] = useState(null);
    const [email, setEmail] = useState(null);
    const [address, setAddress] = useState(null);
    const [social, setSocial] = useState(null);
    const [clientReviews, setClientReviews] = useState([]);

    const [state, handleSubmit] = useForm("xldqnnry");

    useEffect(() => {
        if (state.succeeded) {
            toast.success("✅ Message sent successfully! We'll get back to you soon.");
        }
    }, [state.succeeded]);

    useEffect(() => {
        (async () => {
            try {
                const [hb, svc, lg, hl, em, ad, so, reviews] = await Promise.all([
                    fetchAllHeroBanners(),
                    fetchAllServices(),
                    fetchLogo(),
                    fetchHotline(),
                    fetchEmail(),
                    fetchAddress(),
                    fetchSocial(),
                    fetchAllClientReviews(),
                ]);
                setHeroBanners(hb.data || []);
                setServices(svc.data || []);
                setLogo(lg.data);
                setHotline(hl.data);
                setEmail(em.data);
                setAddress(ad.data);
                setSocial(so.data);
                setClientReviews(reviews.data || []);
            } catch (err) {
                console.error("Data load failed", err);
            }
        })();
    }, []);

    // jQuery plugins initialization
    useEffect(() => {
        const $ = window.$ || window.jQuery;
        if (!$) return;

        // Spinner: hide when page is ready
        const hideSpinner = () => {
            if ($("#spinner").length) {
                $("#spinner").removeClass("show");
            }
        };
        setTimeout(hideSpinner, 800);

        // WOW init
        if (window.WOW) {
            new window.WOW().init();
        }

        // Counter-Up init - with safety check
        setTimeout(() => {
            if ($.fn.counterUp && $("[data-toggle='counter-up']").length) {
                $("[data-toggle='counter-up']").counterUp({
                    delay: 10,
                    time: 2000,
                });
            }
        }, 1000);

        // Owl Carousel for testimonials - with safety check
        setTimeout(() => {
            if ($.fn.owlCarousel && $(".testimonial-carousel").length) {
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
        }, 1000);

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

    const hotlineText = hotline?.number || "{hotlineText}";
    const emailText = email?.email || "{emailText}";
    const addressText = address?.text || "Chowdhury Market (2nd Floor), Barura West Bazar, College Road, Barura, Comilla";
    const logoUrl = logo?.imageUrl || "/img/logo.png";

    // -----
    // Paste your large JSX here (from the previous conversion) and replace static spots:
    // - Navbar logo src -> {logoUrl}
    // - Hotline button text -> {`Hotline: ${hotlineText}`}
    // - Contact section email/address/hotline -> use emailText/addressText/hotlineText
    // - Social buttons href -> use social?.facebook etc. (fallback to "#")
    // - Hero carousel first slide -> use heroImage, heroTopSubtitle, heroTitle, heroSubtitle, heroBtnLabel, heroBtnHref
    // -----

    return (
        <>
            {/* Spinner Start */}
            <div
                id="spinner"
                className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
            >
                <div
                    className="spinner-border text-secondary"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            {/* Spinner End */}

            {/* Topbar Start */}
            <div className="container-fluid bg-primary px-5 d-none d-lg-block">
                <div className="row gx-0 align-items-center">
                    <div className="col-lg-8 text-center text-md-start mb-lg-0">
                        <div className="d-flex">
                            <a href="#" className="text-white me-4">
                                <i className="fas fa-envelope text-white me-2"></i>
                                {emailText}
                            </a>
                            <a href="tel:09617616263" className="text-white me-0">
                                <i className="fas fa-phone-alt text-white me-2"></i>
                                {hotlineText}
                            </a>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 text-center text-lg-end">
                        <div className="d-inline-flex align-items-center" style={{ height: 45 }}>
                            <a className="btn btn-sm btn-outline-light btn-square rounded-circle me-2" href="">
                                <i className="fab fa-twitter fw-normal text-white"></i>
                            </a>
                            <a className="btn btn-sm btn-outline-light btn-square rounded-circle me-2" href="">
                                <i className="fab fa-facebook-f fw-normal text-white"></i>
                            </a>
                            <a className="btn btn-sm btn-outline-light btn-square rounded-circle me-2" href="">
                                <i className="fab fa-linkedin-in fw-normal text-white"></i>
                            </a>
                            <a className="btn btn-sm btn-outline-light btn-square rounded-circle me-2" href="">
                                <i className="fab fa-instagram fw-normal text-white"></i>
                            </a>
                            <a className="btn btn-sm btn-outline-light btn-square rounded-circle" href="">
                                <i className="fab fa-youtube fw-normal text-white"></i>
                            </a>
                        </div>
                        {/* <div className="d-inline-flex align-items-center" style={{ height: 45 }}>
                            <a href="#" className="text-white me-2">
                                {" "}
                                Help
                            </a>
                            <small> / </small>
                            <a href="#" className="text-white mx-2">
                                {" "}
                                Support
                            </a>
                            <small> / </small>
                            <a href="#" className="text-white ms-2">
                                {" "}
                                Contact
                            </a>
                        </div> */}
                    </div>
                </div>
            </div>
            {/* Topbar End */}

            {/* Navbar & Hero Start */}
            <div className="container-fluid nav-bar p-0">
                <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 px-lg-5 py-3 py-lg-0">
                    <a href="#" className="navbar-brand p-0">
                        <h2 className="display-7 text-secondary m-0">
                            <img src="/img/logo.png" className="img-fluid" alt="" />
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
                            <a href="/" className="nav-item nav-link active">
                                Home
                            </a>
                            <a href="#about_section" className="nav-item nav-link">
                                About
                            </a>
                            <a href="#service_section" className="nav-item nav-link">
                                Service
                            </a>
                            {/* <div className="nav-item dropdown">
                                <a href="#" className="nav-link" data-bs-toggle="dropdown">
                                    <span className="dropdown-toggle">Pages</span>
                                </a>
                                <div className="dropdown-menu m-0">
                                    <a href="#" className="dropdown-item">
                                        Feature
                                    </a>
                                    <a href="#" className="dropdown-item">
                                        Countries
                                    </a>
                                    <a href="#" className="dropdown-item">
                                        Testimonial
                                    </a>
                                    <a href="#" className="dropdown-item">
                                        Training
                                    </a>
                                    <a href="#" className="dropdown-item">
                                        404 Page
                                    </a>
                                </div>
                            </div> */}
                            <a href="#contact_section" className="nav-item nav-link">
                                Contact
                            </a>
                        </div>
                        <a
                            href="tel:09617616263"
                            className="btn btn-primary border-secondary rounded-pill py-2 px-4 px-lg-3 mb-3 mb-md-3 mb-lg-0"
                        >
                            {hotlineText}
                        </a>
                    </div>
                </nav>
            </div>
            {/* Navbar & Hero End */}

            {/* Carousel Start */}
            <div className="carousel-header">
                <div id="carouselId" className="carousel slide" data-bs-ride="carousel">
                    {heroBanners.length > 0 && (
                        <ol className="carousel-indicators">
                            {heroBanners.map((_, index) => (
                                <li
                                    key={index}
                                    data-bs-target="#carouselId"
                                    data-bs-slide-to={index}
                                    className={index === 0 ? "active" : ""}
                                ></li>
                            ))}
                        </ol>
                    )}
                    <div className="carousel-inner" role="listbox">
                        {heroBanners.length > 0 ? (
                            heroBanners.map((banner, index) => (
                                <div key={banner._id || index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                    <img src={banner.imageUrl} className="img-fluid" alt="Hero Banner" />
                                    <div className="carousel-caption">
                                        <div className="text-center p-4" style={{ maxWidth: 900 }}>
                                            {banner.topSubtitle && (
                                                <h5
                                                    className="text-white text-uppercase fw-bold mb-3 mb-md-4 wow fadeInUp"
                                                    data-wow-delay="0.1s"
                                                >
                                                    {banner.topSubtitle}
                                                </h5>
                                            )}
                                            {banner.title && (
                                                <h1
                                                    className="display-1 text-capitalize text-white mb-3 mb-md-4 wow fadeInUp"
                                                    data-wow-delay="0.3s"
                                                >
                                                    {banner.title}
                                                </h1>
                                            )}
                                            {banner.subtitle && (
                                                <p
                                                    className="text-white mb-4 mb-md-5 fs-5 wow fadeInUp"
                                                    data-wow-delay="0.5s"
                                                >
                                                    {banner.subtitle}
                                                </p>
                                            )}
                                            {banner.btnLabel && (
                                                <a
                                                    className="btn btn-primary border-secondary rounded-pill text-white py-3 px-5 wow fadeInUp"
                                                    data-wow-delay="0.7s"
                                                    href={banner.btnHref || "#"}
                                                >
                                                    {banner.btnLabel}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="carousel-item active">
                                <img src="/img/carousel-1.jpg" className="img-fluid" alt="Default Banner" />
                                <div className="carousel-caption">
                                    <div className="text-center p-4" style={{ maxWidth: 900 }}>
                                        <h5
                                            className="text-white text-uppercase fw-bold mb-3 mb-md-4 wow fadeInUp"
                                            data-wow-delay="0.1s"
                                        >
                                            Solution For All Type Of Ticketing & Visas Services
                                        </h5>
                                        <h1
                                            className="display-1 text-capitalize text-white mb-3 mb-md-4 wow fadeInUp"
                                            data-wow-delay="0.3s"
                                        >
                                            Ticketing & Visa Process Starts Here!
                                        </h1>
                                        <a
                                            className="btn btn-primary border-secondary rounded-pill text-white py-3 px-5 wow fadeInUp"
                                            data-wow-delay="0.7s"
                                            href="#"
                                        >
                                            Contact Us
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon bg-secondary wow fadeInLeft" data-wow-delay="0.2s" aria-hidden="false"></span>
                        <span className="visually-hidden-focusable">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                        <span className="carousel-control-next-icon bg-secondary wow fadeInRight" data-wow-delay="0.2s" aria-hidden="false"></span>
                        <span className="visually-hidden-focusable">Next</span>
                    </button>
                </div>
            </div>
            {/* Carousel End */}

            {/* Modal Search Start */}
            <div
                className="modal fade"
                id="searchModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h4 className="modal-title text-secondary mb-0" id="exampleModalLabel">
                                Search by keyword
                            </h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex align-items-center">
                            <div className="input-group w-75 mx-auto d-flex">
                                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                <span id="search-icon-1" className="input-group-text p-3">
                                    <i className="fa fa-search"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Search End */}

            {/* About Start */}
            <div className="container-fluid py-5" id="about_section">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-xl-5 wow fadeInLeft" data-wow-delay="0.1s">
                            <div className="bg-light rounded">
                                <img src="/img/about-2.png" className="img-fluid w-100" style={{ marginBottom: -7 }} alt="Image" />
                                <img
                                    src="/img/about-3.jpg"
                                    className="img-fluid w-100 border-bottom border-5 border-primary"
                                    style={{ borderTopRightRadius: 300, borderTopLeftRadius: 300 }}
                                    alt="Image"
                                />
                            </div>
                        </div>
                        <div className="col-xl-7 wow fadeInRight" data-wow-delay="0.3s">
                            <h5 className="sub-title pe-3">About the company</h5>
                            <h1 className="display-5 mb-4">We're Trusted Ticketing & Flight Booking Agency.</h1>
                            <p className="mb-4">
                                We specialize in providing comprehensive travel solutions including domestic and international flight bookings, Hajj and Umrah packages, visa processing for multiple countries, and personalized travel consultation services. Our commitment to excellence, competitive pricing, and customer-first approach ensures that every journey with us is smooth, secure, and memorable, making us your reliable partner for all travel needs.
                            </p>
                            <div className="row gy-4 align-items-center">
                                <div className="col-12 col-sm-6 d-flex align-items-center">
                                    <i className="fas fa-map-marked-alt fa-3x text-secondary"></i>
                                    <h5 className="ms-4">Best Immigration Resources</h5>
                                </div>
                                <div className="col-12 col-sm-6 d-flex align-items-center">
                                    <i className="fas fa-passport fa-3x text-secondary"></i>
                                    <h5 className="ms-4">Return Visas Availabile</h5>
                                </div>
                                <div className="col-4 col-md-3">
                                    <div className="bg-light text-center rounded p-3">
                                        <div className="mb-2">
                                            <i className="fas fa-ticket-alt fa-4x text-primary"></i>
                                        </div>
                                        <h1 className="display-5 fw-bold mb-2">5</h1>
                                        <p className="text-muted mb-0">Years of Experience</p>
                                    </div>
                                </div>
                                <div className="col-8 col-md-9">
                                    <div className="mb-5">
                                        <p className="text-primary h6 mb-3">
                                            <i className="fa fa-check-circle text-secondary me-2"></i> Offer 100 % Genuine Assistance
                                        </p>
                                        <p className="text-primary h6 mb-3">
                                            <i className="fa fa-check-circle text-secondary me-2"></i> It’s Faster & Reliable Execution
                                        </p>
                                        <p className="text-primary h6 mb-3">
                                            <i className="fa fa-check-circle text-secondary me-2"></i> Accurate & Expert Advice
                                        </p>
                                    </div>
                                    <div className="d-flex flex-wrap">
                                        <div id="phone-tada" className="d-flex align-items-center justify-content-center me-4">
                                            <a href="" className="position-relative wow tada" data-wow-delay=".9s">
                                                <i className="fa fa-phone-alt text-primary fa-3x"></i>
                                                <div className="position-absolute" style={{ top: 0, left: 25 }}>
                                                    <span>
                                                        <i className="fa fa-comment-dots text-secondary"></i>
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <span className="text-primary">Have any questions?</span>
                                            <a href="tel:09617616263" className="text-secondary fw-bold fs-5" style={{ letterSpacing: 2 }}>
                                                Free: {hotlineText}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* About End */}

            {/* Counter Facts Start */}
            <div className="container-fluid counter-facts py-5">
                <div className="container py-5">
                    <div className="row g-4">
                        {[
                            { icon: "fa-passport", title: "Visa Categories", value: "11", suffix: "+" },
                            { icon: "fa-users", title: "Team Members", value: "10", suffix: "+" },
                            { icon: "fa-user-check", title: "Visa Process", value: "10", suffix: "K" },
                            { icon: "fa-handshake", title: "Success Rates", value: "100", suffix: "%" },
                        ].map((c, idx) => (
                            <div className="col-12 col-sm-6 col-md-6 col-xl-3 wow fadeInUp" data-wow-delay={`${0.1 + idx * 0.2}s`} key={c.title}>
                                <div className="counter">
                                    <div className="counter-icon">
                                        <i className={`fas ${c.icon}`}></i>
                                    </div>
                                    <div className="counter-content">
                                        <h3>{c.title}</h3>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <span className="counter-value" data-toggle="counter-up">
                                                {c.value}
                                            </span>
                                            <h4 className="text-secondary mb-0" style={{ fontWeight: 600, fontSize: 25 }}>
                                                {c.suffix}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Counter Facts End */}

            {/* Services Start */}
            <div className="container-fluid service overflow-hidden pt-5" id="service_section">
                <div className="container py-5">
                    <div className="section-title text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="sub-style">
                            <h5 className="sub-title text-primary px-3">Visa & Ticketing Categories</h5>
                        </div>
                        <h1 className="display-5 mb-4">Enabling Your Immigration Successfully</h1>
                        <p className="mb-0">
                            At RS Tours & Travels, we provide comprehensive visa processing and ticketing services designed to make your journey seamless and stress-free. From tourist visas and student permits to Hajj and Umrah packages, our experienced team offers expert guidance, complete documentation support, and personalized assistance at every step.
                        </p>
                    </div>
                    <div className="row g-4">
                        {services.length > 0 ? (
                            services.map((svc, idx) => (
                                <div className="col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay={`${0.1 + (idx % 3) * 0.2}s`} key={svc._id || idx}>
                                    <div className="service-item">
                                        <div className="service-inner">
                                            <div className="service-img">
                                                <img src={svc.service_img} className="img-fluid w-100 rounded" alt={svc.service_name} />
                                            </div>
                                            <div className="service-title">
                                                <div className="service-title-name">
                                                    <div className="bg-primary text-center rounded p-3 mx-5 mb-4">
                                                        <button
                                                            onClick={() => navigate(`/service/${svc._id}`)}
                                                            className="h4 text-white mb-0"
                                                            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                                        >
                                                            {svc.service_name}
                                                        </button>
                                                    </div>
                                                    <button
                                                        className="btn bg-light text-secondary rounded-pill py-3 px-5 mb-4"
                                                        onClick={() => navigate(`/service/${svc._id}`)}
                                                    >
                                                        Explore More
                                                    </button>
                                                </div>
                                                <div className="service-content pb-4">
                                                    <button
                                                        onClick={() => navigate(`/service/${svc._id}`)}
                                                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                                    >
                                                        <h4 className="text-white mb-4 py-3">{svc.service_name}</h4>
                                                    </button>
                                                    <div className="px-4">
                                                        <p className="mb-4">
                                                            {svc.service_short_desc}
                                                        </p>
                                                        <button
                                                            className="btn btn-primary border-secondary rounded-pill text-white py-3 px-5"
                                                            onClick={() => navigate(`/service/${svc._id}`)}
                                                        >
                                                            Explore More
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            [
                                { img: "/img/service-1.jpg", title: "Ticketing", desc: "Professional ticketing services for all your travel needs" },
                                { img: "/img/service-2.jpg", title: "Hajj Package", desc: "Complete Hajj packages with accommodation and guidance" },
                                { img: "/img/service-3.jpg", title: "Medical Visa", desc: "Fast medical visa processing for urgent healthcare needs" },
                                { img: "/img/service-4.jpg", title: "Umrah Visa", desc: "Hassle-free Umrah visa services with expert support" },
                                { img: "/img/service-5.jpg", title: "Students Visa", desc: "Student visa assistance for international education" },
                                { img: "/img/service-6.jpg", title: "Tourist Visa", desc: "Tourist visa services for leisure and exploration" },
                            ].map((s, idx) => (
                                <div className="col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay={`${0.1 + (idx % 3) * 0.2}s`} key={`${s.title}-${idx}`}>
                                    <div className="service-item">
                                        <div className="service-inner">
                                            <div className="service-img">
                                                <img src={s.img} className="img-fluid w-100 rounded" alt="Service" />
                                            </div>
                                            <div className="service-title">
                                                <div className="service-title-name">
                                                    <div className="bg-primary text-center rounded p-3 mx-5 mb-4">
                                                        <a href="#" className="h4 text-white mb-0">
                                                            {s.title}
                                                        </a>
                                                    </div>
                                                    <a className="btn bg-light text-secondary rounded-pill py-3 px-5 mb-4" href="#">
                                                        Explore More
                                                    </a>
                                                </div>
                                                <div className="service-content pb-4">
                                                    <a href="#">
                                                        <h4 className="text-white mb-4 py-3">{s.title}</h4>
                                                    </a>
                                                    <div className="px-4">
                                                        <p className="mb-4">
                                                            {s.desc}
                                                        </p>
                                                        <a className="btn btn-primary border-secondary rounded-pill text-white py-3 px-5" href="#">
                                                            Explore More
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            {/* Services End */}

            {/* Features Start */}
            <div className="container-fluid features overflow-hidden py-5">
                <div className="container">
                    <div className="section-title text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="sub-style">
                            <h5 className="sub-title text-center text-primary px-3">Why Choose Us</h5>
                        </div>
                        <h1 className="display-5 mb-4 text-center">Offer Tailor Made Services That Our Client Requires</h1>
                        <p className="mb-0">
                            Our dedicated team takes the time to understand your goals, offering customized packages, flexible scheduling, and hands-on support throughout the entire process. With years of expertise and a client-first approach, we turn your travel dreams into reality with precision and care.
                        </p>
                    </div>
                    <div className="row g-4 justify-content-center text-center">
                        {[
                            { icon: "fa-ticket-alt", title: "Ticketing", description: "Seamless flight booking services for domestic and international destinations" },
                            { icon: "fa-window-restore", title: "Visa Assistance", description: "Complete support for visa applications with expert documentation guidance" },
                            { icon: "fa-dollar-sign", title: "Cost-Effective", description: "Competitive pricing with transparent fees and no hidden charges" },
                            { icon: "fa-atlas", title: "Faster Processing", description: "Quick turnaround times ensuring your travel plans stay on track" },
                        ].map((f, idx) => (
                            <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay={`${0.1 + idx * 0.2}s`} key={f.title}>
                                <div className="feature-item text-center p-4">
                                    <div className="feature-icon p-3 mb-4">
                                        <i className={`fas ${f.icon} fa-4x text-primary`}></i>
                                    </div>
                                    <div className="feature-content d-flex flex-column">
                                        <h5 className="mb-3">{f.title}</h5>
                                        <p className="mb-3">{f.description}</p>
                                        <a className="btn btn-secondary rounded-pill" href="#">
                                            Read More<i className="fas fa-arrow-right ms-2"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-12">
                            <a className="btn btn-primary border-secondary rounded-pill py-3 px-5 wow fadeInUp" data-wow-delay="0.1s" href="#">
                                More Features
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Features End */}

            {/* Countries We Offer Start */}
            <div className="container-fluid country overflow-hidden py-5">
                <div className="container">
                    <div className="section-title text-center wow fadeInUp" data-wow-delay="0.1s" style={{ marginBottom: 70 }}>
                        <div className="sub-style">
                            <h5 className="sub-title text-primary px-3">COUNTRIES WE OFFER</h5>
                        </div>
                        <h1 className="display-5 mb-4">Immigration & visa services following Countries</h1>
                        <p className="mb-0">
                            With established connections and deep knowledge of immigration policies for countries including Saudi Arabia, UAE, Oman, Qatar, Japan, China, the USA, and Italy, we ensure your application process is smooth, compliant, and successful, opening doors to your international journey with confidence.
                        </p>
                    </div>

                    <div className="row g-4 text-center">
                        {[
                            { img: "/img/saudi.jpg", flag: "/img/saudi flag.jpg", name: "Saudi Arabia", delay: 0.1 },
                            { img: "/img/dubai.jpg", flag: "/img/dubai flag.jpg", name: "Dubai", delay: 0.3 },
                            { img: "/img/oman.jpg", flag: "/img/oman flag.jpg", name: "Oman", delay: 0.1 },
                            { img: "/img/qatar.jpg", flag: "/img/qatar flag.jpg", name: "Qatar", delay: 0.3 },
                            { img: "/img/japan.jpg", flag: "/img/japan flag.jpg", name: "Japan", delay: 0.1 },
                            { img: "/img/china.jpg", flag: "/img/china flag.jpg", name: "China", delay: 0.3 },
                            { img: "/img/country-3.jpg", flag: "/img/usa.jpg", name: "New York", delay: 0.5 },
                            { img: "/img/country-4.jpg", flag: "/img/italy.jpg", name: "Italy", delay: 0.7 },
                        ].map((c, idx) => (
                            <div className="col-lg-6 col-xl-3 mb-5 mb-xl-0 wow fadeInUp" data-wow-delay={`${c.delay}s`} key={idx}>
                                <div className="country-item">
                                    <div className="rounded overflow-hidden">
                                        <img src={c.img} className="img-fluid w-100 rounded" alt="Country" />
                                    </div>
                                    <div className="country-flag">
                                        <img src={c.flag} className="img-fluid rounded-circle" alt="Flag" />
                                    </div>
                                    <div className="country-name">
                                        <a href="#" className="text-white fs-4">
                                            {c.name}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="col-12">
                            <a className="btn btn-primary border-secondary rounded-pill py-3 px-5 wow fadeInUp" data-wow-delay="0.1s" href="#">
                                More Countries
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Countries We Offer End */}

            {/* Testimonial Start */}
            <div className="container-fluid testimonial overflow-hidden pb-5">
                <div className="container py-5">
                    <div className="section-title text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="sub-style">
                            <h5 className="sub-title text-primary px-3">OUR CLIENTS RIVIEWS</h5>
                        </div>
                        <h1 className="display-5 mb-4">What Our Clients Say</h1>
                        <p className="mb-0">
                            Don't just take our word for it—hear directly from our satisfied clients who have experienced seamless visa processing, reliable ticketing services, and personalized support that turned their travel dreams into reality with RS Tours & Travels.
                        </p>
                    </div>

                    <div className="owl-carousel testimonial-carousel wow zoomInDown" data-wow-delay="0.2s">
                        {clientReviews.length > 0 ? (
                            clientReviews.map((review) => (
                                <div className="testimonial-item" key={review._id}>
                                    <div className="testimonial-content p-4 mb-5">
                                        <p className="fs-5 mb-0">
                                            {review.review_message}
                                        </p>
                                        <div className="d-flex justify-content-end">
                                            {[...Array(5)].map((_, index) => (
                                                <i
                                                    key={index}
                                                    className={`fas fa-star ${index < review.given_star ? 'text-secondary' : 'text-muted'}`}
                                                ></i>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="rounded-circle me-4" style={{ width: 100, height: 100 }}>
                                            <img className="img-fluid rounded-circle" src={review.reviewer_image} alt={review.reviewer_name} />
                                        </div>
                                        <div className="my-auto">
                                            <h5>{review.reviewer_name}</h5>
                                            <p className="mb-0">{review.reviewer_profession}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            [1, 2, 3].map((n) => (
                                <div className="testimonial-item" key={n}>
                                    <div className="testimonial-content p-4 mb-5">
                                        <p className="fs-5 mb-0">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitati eiusmod tempor incididunt.
                                        </p>
                                        <div className="d-flex justify-content-end">
                                            <i className="fas fa-star text-secondary"></i>
                                            <i className="fas fa-star text-secondary"></i>
                                            <i className="fas fa-star text-secondary"></i>
                                            <i className="fas fa-star text-secondary"></i>
                                            <i className="fas fa-star text-secondary"></i>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="rounded-circle me-4" style={{ width: 100, height: 100 }}>
                                            <img className="img-fluid rounded-circle" src={`/img/testimonial-${n}.jpg`} alt="img" />
                                        </div>
                                        <div className="my-auto">
                                            <h5>Person Name</h5>
                                            <p className="mb-0">Profession</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            {/* Testimonial End */}

            {/* Contact Start */}
            <div className="container-fluid contact overflow-hidden py-5" id="contact_section">
                <div className="container py-5">
                    <div className="row g-5 mb-5">
                        <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.1s">
                            <div className="sub-style">
                                <h5 className="sub-title text-primary pe-3">Quick Contact</h5>
                            </div>
                            <h1 className="display-5 mb-4">Have Questions? Don't Hesitate to Contact Us</h1>
                            <div className="d-flex border-bottom mb-4 pb-4">
                                <i className="fas fa-map-marked-alt fa-4x text-primary bg-light p-3 rounded"></i>
                                <div className="ps-3">
                                    <h5>Location</h5>
                                    <p>Chowdhury Market (2nd Floor), Barura West Bazar, College Road, Barura, Comilla</p>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-xl-6">
                                    <div className="d-flex">
                                        <i className="fas fa-tty fa-3x text-primary"></i>
                                        <div className="ps-3">
                                            <h5 className="mb-3">Quick Contact</h5>
                                            <div className="mb-3">
                                                <h6 className="mb-0">Phone:</h6>
                                                <a href="tel:09617616263" className="fs-5 text-primary">
                                                    {hotlineText}
                                                </a>
                                            </div>
                                            <div className="mb-3">
                                                <h6 className="mb-0">Email:</h6>
                                                <a href="#" className="fs-5 text-primary">
                                                    {emailText}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="d-flex">
                                        <i className="fas fa-clone fa-3x text-primary"></i>
                                        <div className="ps-3">
                                            <h5 className="mb-3">Opening Hrs</h5>
                                            <div className="mb-3">
                                                <h6 className="mb-0">Sat - Friday:</h6>
                                                <a href="#" className="fs-5 text-primary">
                                                    24 Hours Service
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 wow fadeInRight" data-wow-delay="0.3">
                            <div className="sub-style">
                                <h5 className="sub-title text-primary pe-3">Let’s Connect</h5>
                            </div>
                            <h1 className="display-5 mb-4">Send Your Message</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="row g-4">
                                    <div className="col-lg-12 col-xl-6">
                                        <div className="form-floating">
                                            <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                                            <label htmlFor="name">Your Name</label>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-12 col-xl-6">
                                        <div className="form-floating">
                                            <input type="tel" name="phone" className="form-control" id="phone" placeholder="Phone" />
                                            <label htmlFor="phone">Your Phone</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="email" name="email" className="form-control" id="email" placeholder="Your Email" required />
                                            <label htmlFor="email">Your Email</label>
                                        </div>
                                    </div>
                            
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" name="subject" className="form-control" id="subject" placeholder="Subject" />
                                            <label htmlFor="subject">Subject</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea className="form-control" name="message" placeholder="Leave a message here" id="message" style={{ height: 160 }} required></textarea>
                                            <label htmlFor="message">Message</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary w-100 py-3" type="submit"
                                            disabled={state.submitting}>
                                            {state.submitting ? "Sending..." : "Send Message"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
            {/* Contact End */}

            {/* Footer Start */}
            <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <h4 className="text-secondary mb-4">Contact Info</h4>
                                <a href=""><i className="fa fa-map-marker-alt me-2"></i> Chowdhury Market (2nd Floor), Barura West Bazar, College Road, Barura, Comilla</a>
                                <a href=""><i className="fas fa-envelope me-2"></i> {emailText}</a>
                                <a href="tel:09617616263"><i className="fas fa-phone me-2"></i> {hotlineText}</a>
                                <div className="d-flex align-items-center">
                                    <i className="fas fa-share fa-2x text-secondary me-2"></i>
                                    <a className="btn mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                                    <a className="btn mx-1" href=""><i className="fab fa-twitter"></i></a>
                                    <a className="btn mx-1" href=""><i className="fab fa-instagram"></i></a>
                                    <a className="btn mx-1" href=""><i className="fab fa-linkedin-in"></i></a>
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
                                {/* <div className="mb-3">
                                    <h6 className="text-muted mb-0">Satday:</h6>
                                    <p className="text-white mb-0">10.00 am to 05.00 pm</p>
                                </div>
                                <div className="mb-3">
                                    <h6 className="text-muted mb-0">Vacation:</h6>
                                    <p className="text-white mb-0">All Sunday is our vacation</p>
                                </div> */}
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <h4 className="text-secondary mb-4">Our Services</h4>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Ticketing</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Hajj Ticket Service</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Umrah Ticket Service</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Visa Service</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Hajj Package</a>
                                <a href="#" className=""><i className="fas fa-angle-right me-2"></i> Umrah Package</a>
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
