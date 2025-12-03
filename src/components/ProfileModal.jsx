import React, { useState } from "react";

export default function ProfileModal({ isOpen, onClose, userData, onSave }) {
    const [activeTab, setActiveTab] = useState("info");
    const [formData, setFormData] = useState({
        name: userData?.name || "",
        email: userData?.email || "",
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const getInitials = (name) => {
        if (!name) return "A";
        const parts = name.split(" ");
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            await onSave({ type: "profile", data: formData });
            setMessage("Profile updated successfully!");
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            setMessage(error?.response?.data?.message || "Failed to update profile");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage("New passwords do not match!");
            setIsLoading(false);
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setMessage("Password must be at least 6 characters!");
            setIsLoading(false);
            return;
        }

        try {
            await onSave({ type: "password", data: passwordData });
            setMessage("Password changed successfully!");
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            setMessage(error?.response?.data?.message || "Failed to change password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="profile-modal-overlay" onClick={onClose}>
            <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Profile Settings</h2>
                    <button className="modal-close" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="modal-body">
                    <div className="profile-avatar-large">
                        {getInitials(formData.name)}
                    </div>

                    {message && (
                        <div className={`alert-message ${message.includes("successfully") ? 'alert-success' : 'alert-error'}`}>
                            {message}
                        </div>
                    )}

                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === "info" ? "active" : ""}`}
                            onClick={() => setActiveTab("info")}
                        >
                            Profile Info
                        </button>
                        <button
                            className={`tab ${activeTab === "password" ? "active" : ""}`}
                            onClick={() => setActiveTab("password")}
                        >
                            Change Password
                        </button>
                    </div>

                    {activeTab === "info" && (
                        <form onSubmit={handleSaveProfile}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={onClose}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <span className="loading-spinner"></span> : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === "password" && (
                        <form onSubmit={handleChangePassword}>
                            <div className="form-group">
                                <label className="form-label">Current Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    required
                                    minLength={6}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Confirm New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    required
                                    minLength={6}
                                />
                            </div>

                            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={onClose}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <span className="loading-spinner"></span> : "Change Password"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
