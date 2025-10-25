import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    createHeroBanner,
    createHotline,
    createLogo,
    createEmail,
    createAddress,
    createSocial,
} from "../api";
import FilePicker from "../components/FilePicker.jsx";
import { isLoggedIn, removeToken } from "../auth";

export default function Admin() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) navigate("/login");
    }, []);

    const handleLogout = () => {
        removeToken();
        navigate("/");
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
        setMsg("Saving hero...");
        try {
            const res = await createHeroBanner(hb);
            setMsg(`Hero saved ✅ (id: ${res?.data?._id || ""})`);
        } catch (err) {
            setMsg("Hero save failed ❌ " + (err?.response?.data?.message || err.message));
        }
    };

    const saveLogo = async (e) => {
        e.preventDefault();
        setMsg("Saving logo...");
        try {
            const res = await createLogo({ imageBase64: logoBase64 });
            setMsg(`Logo saved ✅ (id: ${res?.data?._id || ""})`);
        } catch (err) {
            setMsg("Logo save failed ❌ " + (err?.response?.data?.message || err.message));
        }
    };

    const saveHotline = async (e) => {
        e.preventDefault();
        setMsg("Saving hotline...");
        try {
            const res = await createHotline({ number: hotline });
            setMsg(`Hotline saved ✅ (id: ${res?.data?._id || ""})`);
        } catch (err) {
            setMsg("Hotline save failed ❌ " + (err?.response?.data?.message || err.message));
        }
    };

    const saveEmail = async (e) => {
        e.preventDefault();
        setMsg("Saving email...");
        try {
            const res = await createEmail({ email });
            setMsg(`Email saved ✅ (id: ${res?.data?._id || ""})`);
        } catch (err) {
            setMsg("Email save failed ❌ " + (err?.response?.data?.message || err.message));
        }
    };

    const saveAddress = async (e) => {
        e.preventDefault();
        setMsg("Saving address...");
        try {
            const res = await createAddress({ text: address });
            setMsg(`Address saved ✅ (id: ${res?.data?._id || ""})`);
        } catch (err) {
            setMsg("Address save failed ❌ " + (err?.response?.data?.message || err.message));
        }
    };

    const saveSocial = async (e) => {
        e.preventDefault();
        setMsg("Saving social links...");
        try {
            const res = await createSocial(social);
            setMsg(`Social links saved ✅ (id: ${res?.data?._id || ""})`);
        } catch (err) {
            setMsg("Social save failed ❌ " + (err?.response?.data?.message || err.message));
        }
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Admin Panel</h2>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
            {msg && <div className="alert alert-info">{msg}</div>}

            <div className="row g-4">

                {/* Hero Banner */}
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header"><strong>Hero Banner</strong></div>
                        <div className="card-body">
                            <form onSubmit={saveHero}>
                                <FilePicker label="Banner Image" onBase64={(b64) => setHb({ ...hb, imageBase64: b64 })} required />
                                <div className="mb-3">
                                    <label className="form-label">Top Subtitle</label>
                                    <input className="form-control" value={hb.topSubtitle} onChange={(e) => setHb({ ...hb, topSubtitle: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input className="form-control" value={hb.title} onChange={(e) => setHb({ ...hb, title: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Subtitle</label>
                                    <textarea className="form-control" rows="2" value={hb.subtitle} onChange={(e) => setHb({ ...hb, subtitle: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Button Label</label>
                                    <input className="form-control" value={hb.btnLabel} onChange={(e) => setHb({ ...hb, btnLabel: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Button Link</label>
                                    <input className="form-control" value={hb.btnHref} onChange={(e) => setHb({ ...hb, btnHref: e.target.value })} />
                                </div>
                                <button className="btn btn-primary">Save Hero</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Logo */}
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header"><strong>Website Logo</strong></div>
                        <div className="card-body">
                            <form onSubmit={saveLogo}>
                                <FilePicker label="Logo Image" onBase64={setLogoBase64} required />
                                <button className="btn btn-primary">Save Logo</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Hotline */}
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header"><strong>Hotline</strong></div>
                        <div className="card-body">
                            <form onSubmit={saveHotline}>
                                <input className="form-control mb-3" placeholder="09617-616263" value={hotline} onChange={(e) => setHotline(e.target.value)} />
                                <button className="btn btn-primary">Save Hotline</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Email */}
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header"><strong>Email Address</strong></div>
                        <div className="card-body">
                            <form onSubmit={saveEmail}>
                                <input className="form-control mb-3" placeholder="info@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <button className="btn btn-primary">Save Email</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header"><strong>Address</strong></div>
                        <div className="card-body">
                            <form onSubmit={saveAddress}>
                                <textarea className="form-control mb-3" rows="3" placeholder="Your address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                <button className="btn btn-primary">Save Address</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header"><strong>Social Links (optional)</strong></div>
                        <div className="card-body">
                            <form onSubmit={saveSocial}>
                                <input className="form-control mb-2" placeholder="Facebook URL" value={social.facebook} onChange={(e) => setSocial({ ...social, facebook: e.target.value })} />
                                <input className="form-control mb-2" placeholder="Twitter URL" value={social.twitter} onChange={(e) => setSocial({ ...social, twitter: e.target.value })} />
                                <input className="form-control mb-2" placeholder="Instagram URL" value={social.instagram} onChange={(e) => setSocial({ ...social, instagram: e.target.value })} />
                                <input className="form-control mb-2" placeholder="LinkedIn URL" value={social.linkedin} onChange={(e) => setSocial({ ...social, linkedin: e.target.value })} />
                                <button className="btn btn-primary mt-2">Save Social Links</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
