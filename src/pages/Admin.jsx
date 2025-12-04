import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    createHeroBanner,
    createHotline,
    createLogo,
    createEmail,
    createAddress,
    createSocial,
    fetchHeroBanner,
    fetchAllHeroBanners,
    updateHeroBanner,
    deleteHeroBanner,
    fetchHotline,
    fetchLogo,
    fetchEmail,
    fetchAddress,
    fetchSocial,
    fetchAllServices,
    createService,
    updateService,
    deleteService,
    fetchAllClientReviews,
    createClientReview,
    updateClientReview,
    deleteClientReview,
    getProfile,
    updateProfile,
    changePassword,
    getAllAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
} from "../api";
import FilePicker from "../components/FilePicker.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import ProfileModal from "../components/ProfileModal.jsx";
import Toast from "../components/Toast.jsx";
import { isLoggedIn, removeToken, getToken } from "../auth";
import "./Admin.css";

export default function Admin() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("hero");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [userData, setUserData] = useState({ name: "", email: "" });
    const [toasts, setToasts] = useState([]);

    // Profile edit states
    const [profileForm, setProfileForm] = useState({ name: "", email: "" });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);

    // Admin management states
    const [admins, setAdmins] = useState([]);
    const [adminForm, setAdminForm] = useState({ username: "", email: "", password: "" });
    const [editingAdminId, setEditingAdminId] = useState(null);

    // Toast helper function
    const showToast = (message, type = "info") => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/login");
        } else {
            fetchUserProfile();
            fetchAllData();
        }
    }, []);

    // Update profile form when userData changes
    useEffect(() => {
        setProfileForm({ name: userData.name, email: userData.email });
    }, [userData]);

    const fetchUserProfile = async () => {
        try {
            const token = getToken();
            console.log("Token:", token);
            
            const response = await getProfile(token);
            console.log("Profile response:", response);
            setUserData(response.data || { name: "Admin User", email: "admin@example.com" });
        } catch (error) {
            console.error("Failed to fetch profile:", error);
            // Set default values if profile fetch fails
            setUserData({ name: "Admin User", email: "admin@example.com" });
        }
    };

    const fetchAllData = async () => {
        try {
            // Fetch All Hero Banners for the list
            const allHeroData = await fetchAllHeroBanners();

            if (allHeroData?.data) {
                setHeroBanners(allHeroData.data);
            }
        } catch (error) {
            console.error("Failed to fetch hero banners:", error);
        }

        try {
            // Fetch All Services
            const servicesData = await fetchAllServices();
            if (servicesData?.data) {
                setServices(servicesData.data);
            }
        } catch (error) {
            console.error("Failed to fetch services:", error);
        }

        try {
            // Fetch All Client Reviews
            const reviewsData = await fetchAllClientReviews();
            if (reviewsData?.data) {
                setReviews(reviewsData.data);
            }
        } catch (error) {
            console.error("Failed to fetch client reviews:", error);
        }

        try {
            // Fetch Logo
            const logoData = await fetchLogo();
            if (logoData?.data?.imageBase64) {
                setLogoBase64(logoData.data.imageBase64);
            }
        } catch (error) {
            console.error("Failed to fetch logo:", error);
        }

        try {
            // Fetch Hotline
            const hotlineData = await fetchHotline();
            if (hotlineData?.data?.number) {
                setHotline(hotlineData.data.number);
            }
        } catch (error) {
            console.error("Failed to fetch hotline:", error);
        }

        try {
            // Fetch Email
            const emailData = await fetchEmail();
            if (emailData?.data?.email) {
                setEmail(emailData.data.email);
            }
        } catch (error) {
            console.error("Failed to fetch email:", error);
        }

        try {
            // Fetch Address
            const addressData = await fetchAddress();
            if (addressData?.data?.text) {
                setAddress(addressData.data.text);
            }
        } catch (error) {
            console.error("Failed to fetch address:", error);
        }

        try {
            // Fetch Social Links
            const socialData = await fetchSocial();
            if (socialData?.data) {
                setSocial({
                    facebook: socialData.data.facebook || "",
                    twitter: socialData.data.twitter || "",
                    instagram: socialData.data.instagram || "",
                    linkedin: socialData.data.linkedin || "",
                });
            }
        } catch (error) {
            console.error("Failed to fetch social links:", error);
        }
    };

    const handleLogout = () => {
        removeToken();
        navigate("/");
    };

    const handleProfileSave = async ({ type, data }) => {
        const token = getToken();
        if (type === "profile") {
            await updateProfile(token, data);
            setUserData(data);
        } else if (type === "password") {
            await changePassword(token, data);
        }
    };

    // Profile Section Handlers
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = getToken();
            await updateProfile(token, profileForm);
            setUserData(profileForm);
            showToast("Profile updated successfully!", "success");
        } catch (error) {
            console.error("Failed to update profile:", error);
            showToast(error.response?.data?.message || "Failed to update profile", "error");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        // Validation
        if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
            showToast("All fields are required", "error");
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            showToast("New passwords do not match", "error");
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            showToast("Password must be at least 6 characters", "error");
            return;
        }

        setLoading(true);
        try {
            const token = getToken();
            await changePassword(token, {
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword
            });
            showToast("Password changed successfully!", "success");
            setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        } catch (error) {
            console.error("Failed to change password:", error);
            showToast(error.response?.data?.message || "Failed to change password", "error");
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrength = (password) => {
        if (password.length === 0) return "";
        if (password.length < 6) return "weak";
        if (password.length < 10) return "medium";
        return "strong";
    };

    // Admin Management Handlers
    const fetchAdmins = async () => {
        try {
            const token = getToken();
            const response = await getAllAdmins(token);
            setAdmins(response.data || []);
        } catch (error) {
            console.error("Failed to fetch admins:", error);
            showToast("Failed to fetch admins", "error");
        }
    };

    const handleCreateAdmin = async (e) => {
        e.preventDefault();

        if (!adminForm.username || !adminForm.email || !adminForm.password) {
            showToast("All fields are required", "error");
            return;
        }

        if (adminForm.password.length < 6) {
            showToast("Password must be at least 6 characters", "error");
            return;
        }

        setLoading(true);
        try {
            const token = getToken();
            await createAdmin(token, adminForm);
            showToast("Admin created successfully!", "success");
            setAdminForm({ username: "", email: "", password: "" });
            fetchAdmins();
        } catch (error) {
            console.error("Failed to create admin:", error);
            showToast(error.response?.data?.message || "Failed to create admin", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleEditAdmin = (admin) => {
        setEditingAdminId(admin.id);
        setAdminForm({ username: admin.name, email: admin.email, password: "" });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUpdateAdmin = async (e) => {
        e.preventDefault();

        if (!adminForm.username || !adminForm.email) {
            showToast("Name and email are required", "error");
            return;
        }

        setLoading(true);
        try {
            const token = getToken();
            await updateAdmin(token, editingAdminId, {
                username: adminForm.username,
                email: adminForm.email
            });
            showToast("Admin updated successfully!", "success");
            setAdminForm({ username: "", email: "", password: "" });
            setEditingAdminId(null);
            fetchAdmins();
        } catch (error) {
            console.error("Failed to update admin:", error);
            showToast(error.response?.data?.message || "Failed to update admin", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAdmin = async (id) => {
        if (!window.confirm("Are you sure you want to delete this admin? This action cannot be undone.")) {
            return;
        }

        setLoading(true);
        try {
            const token = getToken();
            await deleteAdmin(token, id);
            showToast("Admin deleted successfully!", "success");
            fetchAdmins();
        } catch (error) {
            console.error("Failed to delete admin:", error);
            showToast(error.response?.data?.message || "Failed to delete admin", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setEditingAdminId(null);
        setAdminForm({ username: "", email: "", password: "" });
    };

    // Hero Banner
    const [hb, setHb] = useState({
        imageBase64: "",
        topSubtitle: "",
        title: "",
        subtitle: "",
        btnLabel: "",
        btnHref: "#",
    });
    const [heroBanners, setHeroBanners] = useState([]);
    const [editingHeroBannerId, setEditingHeroBannerId] = useState(null);

    // Services
    const [service, setService] = useState({
        service_img_base64: "",
        service_extra_img_base64: "",
        service_name: "",
        service_short_desc: "",
        service_desc: ""
    });
    const [services, setServices] = useState([]);
    const [editingServiceId, setEditingServiceId] = useState(null);

    // Client Reviews
    const [review, setReview] = useState({
        reviewer_image_base64: "",
        reviewer_name: "",
        reviewer_profession: "",
        review_message: "",
        given_star: 5
    });
    const [reviews, setReviews] = useState([]);
    const [editingReviewId, setEditingReviewId] = useState(null);

    // Logo
    const [logoBase64, setLogoBase64] = useState("");

    // Others
    const [hotline, setHotline] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [social, setSocial] = useState({ facebook: "", twitter: "", instagram: "", linkedin: "" });

    const [msg, setMsg] = useState("");

    const saveHero = async (e) => {
        e.preventDefault();

        if (editingHeroBannerId) {
            // Update existing hero banner
            setMsg("Updating hero banner...");
            try {
                await updateHeroBanner(editingHeroBannerId, hb);
                setMsg(`Hero Banner updated successfully ✅`);
                setTimeout(() => setMsg(""), 3000);

                // Reset form and refresh list
                resetHeroForm();
                fetchAllData();
            } catch (err) {
                setMsg("Failed to update Hero Banner ❌ " + (err?.response?.data?.message || err.message));
                setTimeout(() => setMsg(""), 5000);
            }
        } else {
            // Create new hero banner
            setMsg("Creating hero banner...");
            try {
                await createHeroBanner(hb);
                setMsg(`Hero Banner created successfully ✅`);
                setTimeout(() => setMsg(""), 3000);

                // Reset form and refresh list
                resetHeroForm();
                fetchAllData();
            } catch (err) {
                setMsg("Failed to create Hero Banner ❌ " + (err?.response?.data?.message || err.message));
                setTimeout(() => setMsg(""), 5000);
            }
        }
    };

    const resetHeroForm = () => {
        setHb({
            imageBase64: "",
            topSubtitle: "",
            title: "",
            subtitle: "",
            btnLabel: "",
            btnHref: "#",
        });
        setEditingHeroBannerId(null);
    };

    const handleEditHeroBanner = (banner) => {
        setHb({
            imageBase64: banner.imageBase64 || "",
            topSubtitle: banner.topSubtitle || "",
            title: banner.title || "",
            subtitle: banner.subtitle || "",
            btnLabel: banner.btnLabel || "",
            btnHref: banner.btnHref || "#",
        });
        setEditingHeroBannerId(banner._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteHeroBanner = async (id) => {
        if (!window.confirm("Are you sure you want to delete this hero banner?")) {
            return;
        }

        setMsg("Deleting hero banner...");
        try {
            await deleteHeroBanner(id);
            setMsg(`Hero Banner deleted successfully ✅`);
            setTimeout(() => setMsg(""), 3000);

            // Reset form if we were editing this banner
            if (editingHeroBannerId === id) {
                resetHeroForm();
            }

            // Refresh list
            fetchAllData();
        } catch (err) {
            setMsg("Failed to delete Hero Banner ❌ " + (err?.response?.data?.message || err.message));
            setTimeout(() => setMsg(""), 5000);
        }
    };

    const saveLogo = async (e) => {
        e.preventDefault();
        setMsg("Updating logo...");
        try {
            const res = await createLogo({ imageBase64: logoBase64 });
            setMsg(`Logo updated successfully ✅`);
            setTimeout(() => setMsg(""), 3000);
        } catch (err) {
            setMsg("Failed to update Logo ❌ " + (err?.response?.data?.message || err.message));
            setTimeout(() => setMsg(""), 5000);
        }
    };

    const saveHotline = async (e) => {
        e.preventDefault();
        setMsg("Updating hotline...");
        try {
            const res = await createHotline({ number: hotline });
            setMsg(`Hotline updated successfully ✅`);
            setTimeout(() => setMsg(""), 3000);
        } catch (err) {
            setMsg("Failed to update Hotline ❌ " + (err?.response?.data?.message || err.message));
            setTimeout(() => setMsg(""), 5000);
        }
    };

    const saveEmail = async (e) => {
        e.preventDefault();
        setMsg("Updating email...");
        try {
            const res = await createEmail({ email });
            setMsg(`Email updated successfully ✅`);
            setTimeout(() => setMsg(""), 3000);
        } catch (err) {
            setMsg("Failed to update Email ❌ " + (err?.response?.data?.message || err.message));
            setTimeout(() => setMsg(""), 5000);
        }
    };

    const saveAddress = async (e) => {
        e.preventDefault();
        setMsg("Updating address...");
        try {
            const res = await createAddress({ text: address });
            setMsg(`Address updated successfully ✅`);
            setTimeout(() => setMsg(""), 3000);
        } catch (err) {
            setMsg("Failed to update Address ❌ " + (err?.response?.data?.message || err.message));
            setTimeout(() => setMsg(""), 5000);
        }
    };

    const saveSocial = async (e) => {
        e.preventDefault();
        setMsg("Updating social links...");
        try {
            const res = await createSocial(social);
            setMsg(`Social Links updated successfully ✅`);
            setTimeout(() => setMsg(""), 3000);
        } catch (err) {
            setMsg("Failed to update Social Links ❌ " + (err?.response?.data?.message || err.message));
            setTimeout(() => setMsg(""), 5000);
        }
    };

    // Service Functions
    const saveService = async (e) => {
        e.preventDefault();

        if (editingServiceId) {
            setMsg("Updating service...");
            try {
                await updateService(editingServiceId, service);
                setMsg(`Service updated successfully ✅`);
                setTimeout(() => setMsg(""), 3000);
                resetServiceForm();
                fetchAllData();
            } catch (err) {
                setMsg("Failed to update Service ❌ " + (err?.response?.data?.message || err.message));
                setTimeout(() => setMsg(""), 5000);
            }
        } else {
            setMsg("Creating service...");
            try {
                await createService(service);
                setMsg(`Service created successfully ✅`);
                setTimeout(() => setMsg(""), 3000);
                resetServiceForm();
                fetchAllData();
            } catch (err) {
                setMsg("Failed to create Service ❌ " + (err?.response?.data?.message || err.message));
                setTimeout(() => setMsg(""), 5000);
            }
        }
    };

    const resetServiceForm = () => {
        setService({
            service_img_base64: "",
            service_extra_img_base64: "",
            service_name: "",
            service_short_desc: "",
            service_desc: ""
        });
        setEditingServiceId(null);
    };

    const handleEditService = (svc) => {
        setService({
            service_img_base64: svc.service_img || "",
            service_extra_img_base64: svc.service_extra_img || "",
            service_name: svc.service_name || "",
            service_short_desc: svc.service_short_desc || "",
            service_desc: svc.service_desc || ""
        });
        setEditingServiceId(svc._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteService = async (id) => {
        if (!window.confirm("Are you sure you want to delete this service?")) {
            return;
        }

        setMsg("Deleting service...");
        try {
            await deleteService(id);
            setMsg(`Service deleted successfully ✅`);
            setTimeout(() => setMsg(""), 3000);

            if (editingServiceId === id) {
                resetServiceForm();
            }

            fetchAllData();
        } catch (err) {
            setMsg("Failed to delete Service ❌ " + (err?.response?.data?.message || err.message));
            setTimeout(() => setMsg(""), 5000);
        }
    };

    // Client Review Functions
    const saveReview = async (e) => {
        e.preventDefault();

        if (editingReviewId) {
            setMsg("Updating review...");
            try {
                await updateClientReview(editingReviewId, {
                    review_message: review.review_message,
                    given_star: review.given_star,
                    reviewer_name: review.reviewer_name,
                    reviewer_profession: review.reviewer_profession,
                    reviewer_image: review.reviewer_image_base64
                });
                setMsg(`Client Review updated successfully ✅`);
                setTimeout(() => setMsg(""), 3000);
                resetReviewForm();
                fetchAllData();
            } catch (err) {
                setMsg("Failed to update Client Review ❌ " + (err?.response?.data?.message || err.message));
                setTimeout(() => setMsg(""), 5000);
            }
        } else {
            setMsg("Creating review...");
            try {
                await createClientReview({
                    review_message: review.review_message,
                    given_star: review.given_star,
                    reviewer_name: review.reviewer_name,
                    reviewer_profession: review.reviewer_profession,
                    reviewer_image: review.reviewer_image_base64
                });
                setMsg(`Client Review created successfully ✅`);
                setTimeout(() => setMsg(""), 3000);
                resetReviewForm();
                fetchAllData();
            } catch (err) {
                setMsg("Failed to create Client Review ❌ " + (err?.response?.data?.message || err.message));
                setTimeout(() => setMsg(""), 5000);
            }
        }
    };

    const resetReviewForm = () => {
        setReview({
            reviewer_image_base64: "",
            reviewer_name: "",
            reviewer_profession: "",
            review_message: "",
            given_star: 5
        });
        setEditingReviewId(null);
    };

    const handleEditReview = (rev) => {
        setReview({
            reviewer_image_base64: rev.reviewer_image || "",
            reviewer_name: rev.reviewer_name || "",
            reviewer_profession: rev.reviewer_profession || "",
            review_message: rev.review_message || "",
            given_star: rev.given_star || 5
        });
        setEditingReviewId(rev._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteReview = async (id) => {
        if (!window.confirm("Are you sure you want to delete this review?")) {
            return;
        }

        setMsg("Deleting review...");
        try {
            await deleteClientReview(id);
            setMsg(`Client Review deleted successfully ✅`);
            setTimeout(() => setMsg(""), 3000);

            if (editingReviewId === id) {
                resetReviewForm();
            }

            fetchAllData();
        } catch (err) {
            setMsg("Failed to delete Client Review ❌ " + (err?.response?.data?.message || err.message));
            setTimeout(() => setMsg(""), 5000);
        }
    };

    const renderSection = () => {
        switch (activeSection) {
            case "hero":
                return (
                    <>
                        <div className="dashboard-section">
                            <div className="section-header">
                                <h2 className="section-title">
                                    🎨 {editingHeroBannerId ? 'Edit Hero Banner' : 'Create New Hero Banner'}
                                </h2>
                            </div>
                            <form onSubmit={saveHero}>
                                <div className="form-group">
                                    <FilePicker
                                        label="Banner Image"
                                        onBase64={(b64) => setHb({ ...hb, imageBase64: b64 })}
                                        required={!editingHeroBannerId}
                                    />
                                    {editingHeroBannerId && hb.imageBase64 && (
                                        <img
                                            src={hb.imageBase64}
                                            alt="Current banner"
                                            style={{
                                                width: '200px',
                                                height: '120px',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                                marginTop: '10px'
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Top Subtitle</label>
                                    <input
                                        className="form-control"
                                        value={hb.topSubtitle}
                                        onChange={(e) => setHb({ ...hb, topSubtitle: e.target.value })}
                                        placeholder="e.g., WELCOME TO RS TOURS"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Title</label>
                                    <input
                                        className="form-control"
                                        value={hb.title}
                                        onChange={(e) => setHb({ ...hb, title: e.target.value })}
                                        placeholder="e.g., Explore The World"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Subtitle</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={hb.subtitle}
                                        onChange={(e) => setHb({ ...hb, subtitle: e.target.value })}
                                        placeholder="Enter a short description..."
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Button Label</label>
                                    <input
                                        className="form-control"
                                        value={hb.btnLabel}
                                        onChange={(e) => setHb({ ...hb, btnLabel: e.target.value })}
                                        placeholder="e.g., Book Now"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Button Link</label>
                                    <input
                                        className="form-control"
                                        value={hb.btnHref}
                                        onChange={(e) => setHb({ ...hb, btnHref: e.target.value })}
                                        placeholder="e.g., #booking"
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button type="submit" className="btn btn-primary">
                                        {editingHeroBannerId ? 'Update Hero Banner' : 'Create Hero Banner'}
                                    </button>
                                    {editingHeroBannerId && (
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={resetHeroForm}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        <div className="dashboard-section">
                            <div className="section-header">
                                <h2 className="section-title">📋 All Hero Banners</h2>
                            </div>
                            {heroBanners.length == 0 ? (
                                <p style={{ textAlign: 'center', color: '#7f8c8d', padding: '20px' }}>
                                    No hero banners found. Create one to get started!
                                </p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="hero-table">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Top Subtitle</th>
                                                <th>Title</th>
                                                <th>Subtitle</th>
                                                <th>Button</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {heroBanners.map((banner) => (
                                                <tr key={banner._id}>
                                                    <td>
                                                        {banner.imageBase64 && (
                                                            <img
                                                                src={banner.imageBase64}
                                                                alt="Hero"
                                                                style={{
                                                                    width: '80px',
                                                                    height: '50px',
                                                                    objectFit: 'cover',
                                                                    borderRadius: '5px'
                                                                }}
                                                            />
                                                        )}
                                                    </td>
                                                    <td>{banner.topSubtitle || '-'}</td>
                                                    <td>{banner.title || '-'}</td>
                                                    <td>
                                                        {banner.subtitle
                                                            ? banner.subtitle.substring(0, 50) + (banner.subtitle.length > 50 ? '...' : '')
                                                            : '-'}
                                                    </td>
                                                    <td>
                                                        {banner.btnLabel || '-'}
                                                        {banner.btnHref && banner.btnHref !== '#' && (
                                                            <small style={{ display: 'block', color: '#7f8c8d' }}>
                                                                ({banner.btnHref})
                                                            </small>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div style={{ display: 'flex', gap: '5px' }}>
                                                            <button
                                                                className="btn-action btn-edit"
                                                                onClick={() => handleEditHeroBanner(banner)}
                                                                title="Edit"
                                                            >
                                                                ✏️
                                                            </button>
                                                            <button
                                                                className="btn-action btn-delete"
                                                                onClick={() => handleDeleteHeroBanner(banner._id)}
                                                                title="Delete"
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </>
                );

            case "services":
                return (
                    <>
                        <div className="dashboard-section">
                            <div className="section-header">
                                <h2 className="section-title">
                                    🛠️ {editingServiceId ? 'Edit Service' : 'Create New Service'}
                                </h2>
                            </div>
                            <form onSubmit={saveService}>
                                <div className="form-group">
                                    <FilePicker
                                        label="Service Image (500x400 recommended)"
                                        onBase64={(b64) => setService({ ...service, service_img_base64: b64 })}
                                        required={!editingServiceId}
                                    />
                                    {editingServiceId && service.service_img_base64 && (
                                        <img
                                            src={service.service_img_base64}
                                            alt="Current service"
                                            style={{
                                                width: '200px',
                                                height: '160px',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                                marginTop: '10px'
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="form-group">
                                    <FilePicker
                                        label="Service Extra Image (Optional)"
                                        onBase64={(b64) => setService({ ...service, service_extra_img_base64: b64 })}
                                    />
                                    {service.service_extra_img_base64 && (
                                        <img
                                            src={service.service_extra_img_base64}
                                            alt="Extra service"
                                            style={{
                                                width: '200px',
                                                height: '160px',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                                marginTop: '10px'
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Service Name *</label>
                                    <input
                                        className="form-control"
                                        value={service.service_name}
                                        onChange={(e) => setService({ ...service, service_name: e.target.value })}
                                        placeholder="e.g., Flight Booking"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Short Description *</label>
                                    <input
                                        className="form-control"
                                        value={service.service_short_desc}
                                        onChange={(e) => setService({ ...service, service_short_desc: e.target.value })}
                                        placeholder="Brief description in one line"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Full Description *</label>
                                    <textarea
                                        className="form-control"
                                        rows="5"
                                        value={service.service_desc}
                                        onChange={(e) => setService({ ...service, service_desc: e.target.value })}
                                        placeholder="Enter detailed service description..."
                                        required
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button type="submit" className="btn btn-primary">
                                        {editingServiceId ? 'Update Service' : 'Create Service'}
                                    </button>
                                    {editingServiceId && (
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={resetServiceForm}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        <div className="dashboard-section">
                            <div className="section-header">
                                <h2 className="section-title">📋 All Services</h2>
                            </div>
                            {services.length === 0 ? (
                                <p style={{ textAlign: 'center', color: '#7f8c8d', padding: '20px' }}>
                                    No services found. Create one to get started!
                                </p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="hero-table">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Service Name</th>
                                                <th>Short Description</th>
                                                <th>Description</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {services.map((svc) => (
                                                <tr key={svc._id}>
                                                    <td>
                                                        {svc.service_img && (
                                                            <img
                                                                src={svc.service_img}
                                                                alt="Service"
                                                                style={{
                                                                    width: '80px',
                                                                    height: '64px',
                                                                    objectFit: 'cover',
                                                                    borderRadius: '5px'
                                                                }}
                                                            />
                                                        )}
                                                    </td>
                                                    <td>{svc.service_name || '-'}</td>
                                                    <td>
                                                        {svc.service_short_desc
                                                            ? svc.service_short_desc.substring(0, 50) + (svc.service_short_desc.length > 50 ? '...' : '')
                                                            : '-'}
                                                    </td>
                                                    <td>
                                                        {svc.service_desc
                                                            ? svc.service_desc.substring(0, 60) + (svc.service_desc.length > 60 ? '...' : '')
                                                            : '-'}
                                                    </td>
                                                    <td>
                                                        <div style={{ display: 'flex', gap: '5px' }}>
                                                            <button
                                                                className="btn-action btn-edit"
                                                                onClick={() => handleEditService(svc)}
                                                                title="Edit"
                                                            >
                                                                ✏️
                                                            </button>
                                                            <button
                                                                className="btn-action btn-delete"
                                                                onClick={() => handleDeleteService(svc._id)}
                                                                title="Delete"
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </>
                );

            case "reviews":
                return (
                    <>
                        <div className="dashboard-section">
                            <div className="section-header">
                                <h2 className="section-title">
                                    ⭐ {editingReviewId ? 'Edit Client Review' : 'Add New Client Review'}
                                </h2>
                            </div>
                            <form onSubmit={saveReview}>
                                <div className="form-group">
                                    <FilePicker
                                        label="Reviewer Image (100x100)"
                                        onBase64={(b64) => setReview({ ...review, reviewer_image_base64: b64 })}
                                        required={!editingReviewId}
                                    />
                                    {editingReviewId && review.reviewer_image_base64 && (
                                        <img
                                            src={review.reviewer_image_base64}
                                            alt="Current reviewer"
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                objectFit: 'cover',
                                                borderRadius: '50%',
                                                marginTop: '10px'
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Reviewer Name *</label>
                                    <input
                                        className="form-control"
                                        value={review.reviewer_name}
                                        onChange={(e) => setReview({ ...review, reviewer_name: e.target.value })}
                                        placeholder="e.g., John Doe"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Reviewer Profession *</label>
                                    <input
                                        className="form-control"
                                        value={review.reviewer_profession}
                                        onChange={(e) => setReview({ ...review, reviewer_profession: e.target.value })}
                                        placeholder="e.g., Business Owner"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Rating (Stars) *</label>
                                    <select
                                        className="form-control"
                                        value={review.given_star}
                                        onChange={(e) => setReview({ ...review, given_star: parseInt(e.target.value) })}
                                        required
                                    >
                                        <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                                        <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                                        <option value={3}>⭐⭐⭐ (3 Stars)</option>
                                        <option value={2}>⭐⭐ (2 Stars)</option>
                                        <option value={1}>⭐ (1 Star)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Review Message *</label>
                                    <textarea
                                        className="form-control"
                                        rows="5"
                                        value={review.review_message}
                                        onChange={(e) => setReview({ ...review, review_message: e.target.value })}
                                        placeholder="Enter the client's review message..."
                                        required
                                    ></textarea>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button type="submit" className="btn btn-primary">
                                        {editingReviewId ? 'Update Review' : 'Create Review'}
                                    </button>
                                    {editingReviewId && (
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={resetReviewForm}
                                        >
                                            Cancel Edit
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        <div className="dashboard-section">
                            <div className="section-header">
                                <h2 className="section-title">All Client Reviews</h2>
                            </div>
                            {reviews.length === 0 ? (
                                <div className="empty-state">
                                    <p>No client reviews found. Create your first review above!</p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Profession</th>
                                                <th>Rating</th>
                                                <th>Review Message</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reviews.map((rev) => (
                                                <tr key={rev._id}>
                                                    <td>
                                                        {rev.reviewer_image && (
                                                            <img
                                                                src={rev.reviewer_image}
                                                                alt="Reviewer"
                                                                style={{
                                                                    width: '60px',
                                                                    height: '60px',
                                                                    objectFit: 'cover',
                                                                    borderRadius: '50%'
                                                                }}
                                                            />
                                                        )}
                                                    </td>
                                                    <td>{rev.reviewer_name || '-'}</td>
                                                    <td>{rev.reviewer_profession || '-'}</td>
                                                    <td>
                                                        {'⭐'.repeat(rev.given_star || 5)}
                                                    </td>
                                                    <td>
                                                        {rev.review_message
                                                            ? rev.review_message.substring(0, 80) + (rev.review_message.length > 80 ? '...' : '')
                                                            : '-'}
                                                    </td>
                                                    <td>
                                                        <div style={{ display: 'flex', gap: '5px' }}>
                                                            <button
                                                                className="btn-action btn-edit"
                                                                onClick={() => handleEditReview(rev)}
                                                                title="Edit"
                                                            >
                                                                ✏️
                                                            </button>
                                                            <button
                                                                className="btn-action btn-delete"
                                                                onClick={() => handleDeleteReview(rev._id)}
                                                                title="Delete"
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </>
                );

            case "logo":
                return (
                    <div className="dashboard-section">
                        <div className="section-header">
                            <h2 className="section-title">🖼️ Website Logo</h2>
                        </div>
                        <form onSubmit={saveLogo}>
                            <div className="form-group">
                                <FilePicker label="Logo Image" onBase64={setLogoBase64} required />
                            </div>
                            <button className="btn btn-primary">Update Logo</button>
                        </form>
                    </div>
                );

            case "hotline":
                return (
                    <div className="dashboard-section">
                        <div className="section-header">
                            <h2 className="section-title">📞 Hotline Number</h2>
                        </div>
                        <form onSubmit={saveHotline}>
                            <div className="form-group">
                                <label className="form-label">Phone Number</label>
                                <input
                                    className="form-control"
                                    // placeholder="09617-616263"
                                    value={hotline}
                                    onChange={(e) => setHotline(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary">Update Hotline</button>
                        </form>
                    </div>
                );

            case "email":
                return (
                    <div className="dashboard-section">
                        <div className="section-header">
                            <h2 className="section-title">📧 Email Address</h2>
                        </div>
                        <form onSubmit={saveEmail}>
                            <div className="form-group">
                                <label className="form-label">Contact Email</label>
                                <input
                                    className="form-control"
                                    placeholder="info@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                />
                            </div>
                            <button className="btn btn-primary">Update Email</button>
                        </form>
                    </div>
                );

            case "address":
                return (
                    <div className="dashboard-section">
                        <div className="section-header">
                            <h2 className="section-title">📍 Business Address</h2>
                        </div>
                        <form onSubmit={saveAddress}>
                            <div className="form-group">
                                <label className="form-label">Address</label>
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    placeholder="Your business address..."
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary">Update Address</button>
                        </form>
                    </div>
                );

            case "social":
                return (
                    <div className="dashboard-section">
                        <div className="section-header">
                            <h2 className="section-title">🔗 Social Media Links</h2>
                        </div>
                        <form onSubmit={saveSocial}>
                            <div className="form-group">
                                <label className="form-label">Facebook URL</label>
                                <input
                                    className="form-control"
                                    placeholder="https://facebook.com/yourpage"
                                    value={social.facebook}
                                    onChange={(e) => setSocial({ ...social, facebook: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Twitter URL</label>
                                <input
                                    className="form-control"
                                    placeholder="https://twitter.com/yourhandle"
                                    value={social.twitter}
                                    onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Instagram URL</label>
                                <input
                                    className="form-control"
                                    placeholder="https://instagram.com/yourprofile"
                                    value={social.instagram}
                                    onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">LinkedIn URL</label>
                                <input
                                    className="form-control"
                                    placeholder="https://linkedin.com/company/yourcompany"
                                    value={social.linkedin}
                                    onChange={(e) => setSocial({ ...social, linkedin: e.target.value })}
                                />
                            </div>
                            <button className="btn btn-primary">Update Social Links</button>
                        </form>
                    </div>
                );

            case "profile":
                return (
                    <div className="profile-view-container">
                        {/* Profile Information Card */}
                        <div className="profile-card">
                            <div className="profile-card-header">
                                <div>
                                    <h2 className="profile-card-title">Profile Information</h2>
                                    <p className="profile-card-subtitle">Update your account details</p>
                                </div>
                            </div>
                            <form onSubmit={handleProfileUpdate}>
                                <div className="input-group">
                                    <label className="input-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={profileForm.name}
                                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Email Address</label>
                                    <input
                                        type="email"
                                        className="input-field"
                                        value={profileForm.email}
                                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="button-group">
                                    <button type="submit" className="btn-save" disabled={loading}>
                                        {loading ? "Saving..." : "Save Changes"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-cancel"
                                        onClick={() => setProfileForm({ name: userData.name, email: userData.email })}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Password Change Card */}
                        <div className="profile-card">
                            <div className="profile-card-header">
                                <div>
                                    <h2 className="profile-card-title">Change Password</h2>
                                    <p className="profile-card-subtitle">Update your password to keep your account secure</p>
                                </div>
                            </div>
                            <form onSubmit={handlePasswordChange}>
                                <div className="input-group">
                                    <label className="input-label">Current Password</label>
                                    <input
                                        type="password"
                                        className="input-field"
                                        value={passwordForm.currentPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                        placeholder="Enter current password"
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">New Password</label>
                                    <input
                                        type="password"
                                        className="input-field"
                                        value={passwordForm.newPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                        placeholder="Enter new password (min 6 characters)"
                                        required
                                    />
                                    {passwordForm.newPassword && (
                                        <>
                                            <div className="password-strength">
                                                <div className={`password-strength-bar ${getPasswordStrength(passwordForm.newPassword)}`}></div>
                                            </div>
                                            <p className="password-hint">
                                                Password strength: {getPasswordStrength(passwordForm.newPassword) || "weak"}
                                            </p>
                                        </>
                                    )}
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Confirm New Password</label>
                                    <input
                                        type="password"
                                        className="input-field"
                                        value={passwordForm.confirmPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                        placeholder="Confirm new password"
                                        required
                                    />
                                </div>
                                <div className="button-group">
                                    <button type="submit" className="btn-save" disabled={loading}>
                                        {loading ? "Changing..." : "Change Password"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-cancel"
                                        onClick={() => setPasswordForm({
                                            currentPassword: "",
                                            newPassword: "",
                                            confirmPassword: ""
                                        })}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                );

            case "admin-management":
                return (
                    <div className="profile-view-container">
                        {/* Add Admin Card */}
                        <div className="profile-card">
                            <div className="profile-card-header">
                                <div>
                                    <h2 className="profile-card-title">
                                        {editingAdminId ? 'Edit Admin' : 'Add New Admin'}
                                    </h2>
                                    <p className="profile-card-subtitle">
                                        {editingAdminId ? 'Update admin information' : 'Create a new admin account'}
                                    </p>
                                </div>
                            </div>
                            <form onSubmit={editingAdminId ? handleUpdateAdmin : handleCreateAdmin}>
                                <div className="input-group">
                                    <label className="input-label">Full Name *</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={adminForm.username}
                                        onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })}
                                        placeholder="Enter admin full name"
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Email Address *</label>
                                    <input
                                        type="email"
                                        className="input-field"
                                        value={adminForm.email}
                                        onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                                        placeholder="Enter admin email"
                                        required
                                    />
                                </div>
                                {!editingAdminId && (
                                    <div className="input-group">
                                        <label className="input-label">Password *</label>
                                        <input
                                            type="password"
                                            className="input-field"
                                            value={adminForm.password}
                                            onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                                            placeholder="Enter password (min 6 characters)"
                                            required
                                        />
                                        {adminForm.password && (
                                            <>
                                                <div className="password-strength">
                                                    <div className={`password-strength-bar ${getPasswordStrength(adminForm.password)}`}></div>
                                                </div>
                                                <p className="password-hint">
                                                    Password strength: {getPasswordStrength(adminForm.password) || "weak"}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                )}
                                <div className="button-group">
                                    <button type="submit" className="btn-save" disabled={loading}>
                                        {loading ? (editingAdminId ? "Updating..." : "Creating...") : (editingAdminId ? "Update Admin" : "Create Admin")}
                                    </button>
                                    {editingAdminId && (
                                        <button
                                            type="button"
                                            className="btn-cancel"
                                            onClick={handleCancelEdit}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Admin List Card */}
                        <div className="profile-card">
                            <div className="profile-card-header">
                                <div>
                                    <h2 className="profile-card-title">All Administrators</h2>
                                    <p className="profile-card-subtitle">Manage existing admin accounts</p>
                                </div>
                                <button
                                    className="btn-save"
                                    onClick={fetchAdmins}
                                    style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                                >
                                    Refresh
                                </button>
                            </div>
                            {admins.length === 0 ? (
                                <p style={{ textAlign: 'center', color: '#7f8c8d', padding: '20px' }}>
                                    No administrators found. Click refresh to load admins.
                                </p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="hero-table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Created At</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {admins.map((admin) => (
                                                <tr key={admin.id}>
                                                    <td>{admin.name}</td>
                                                    <td>{admin.email}</td>
                                                    <td>{admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : '-'}</td>
                                                    <td>
                                                        <div style={{ display: 'flex', gap: '5px' }}>
                                                            <button
                                                                className="btn-action btn-edit"
                                                                onClick={() => handleEditAdmin(admin)}
                                                                title="Edit"
                                                            >
                                                                ✏️
                                                            </button>
                                                            <button
                                                                className="btn-action btn-delete"
                                                                onClick={() => handleDeleteAdmin(admin.id)}
                                                                title="Delete"
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="admin-dashboard">
            <Sidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onLogout={handleLogout}
            />

            <main className="admin-main">
                <Topbar
                    userName={userData.name}
                    onLogout={handleLogout}
                    onProfileClick={() => setProfileModalOpen(true)}
                    onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
                />

                <div className="admin-content">
                    {msg && (
                        <div className={`alert-message ${msg.includes("✅") ? 'alert-success' : msg.includes("❌") ? 'alert-error' : 'alert-info'}`}>
                            {msg}
                        </div>
                    )}

                    {renderSection()}
                </div>
            </main>

            <ProfileModal
                isOpen={profileModalOpen}
                onClose={() => setProfileModalOpen(false)}
                userData={userData}
                onSave={handleProfileSave}
            />

            {/* Toast Container */}
            <div className="toast-container">
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </div>
    );
}
