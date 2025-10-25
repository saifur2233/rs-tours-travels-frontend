import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginAdmin } from "../api";
import { saveToken } from "../auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMsg("Logging in...");
        try {
            const res = await loginAdmin({ email, password });
            if (res?.token) {
                saveToken(res.token);
                setMsg("Login success!");
                navigate("/admin");
            }
        } catch (err) {
            setMsg(err?.response?.data?.message || err.message);
        }
    };

    return (
        <div className="container py-5">
            <div className="col-md-5 mx-auto card p-4 shadow">
                <h3 className="mb-4 text-center">Admin Login</h3>
                {msg && <div className="alert alert-info">{msg}</div>}
                <form onSubmit={handleLogin}>
                    <input className="form-control mb-3" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="btn btn-primary w-100">Login</button>
                </form>
                <p className="text-center mt-3">
                    No account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}
