import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerAdmin } from "../api";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setMsg("Registering...");
        try {
            const res = await registerAdmin({ username, email, password });
            setMsg("Registered successfully!");
            setTimeout(() => navigate("/login"), 1000);
        } catch (err) {
            setMsg(err?.response?.data?.message || err.message);
        }
    };

    return (
        <div className="container py-5">
            {/* <div className="col-md-5 mx-auto card p-4 shadow">
                <h3 className="mb-4 text-center">Admin Registration</h3>
                {msg && <div className="alert alert-info">{msg}</div>}
                <form onSubmit={handleRegister}>
                    <input className="form-control mb-3" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    <input className="form-control mb-3" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="btn btn-primary w-100">Register</button>
                </form>
                <p className="text-center mt-3">
                    Already have account? <Link to="/login">Login</Link>
                </p>
            </div> */}
        </div>
    );
}
