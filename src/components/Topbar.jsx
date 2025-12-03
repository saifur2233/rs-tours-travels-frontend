import React, { useState, useEffect, useRef } from "react";

export default function Topbar({ userName, onLogout, onProfileClick, onMenuToggle }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Get user initials for avatar
    const getInitials = (name) => {
        if (!name) return "A";
        const parts = name.split(" ");
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="admin-topbar">
            <div className="topbar-left">
                <button className="menu-toggle" onClick={onMenuToggle}>
                    ☰
                </button>
                <h1 className="page-title">Dashboard</h1>
            </div>

            <div className="topbar-right">
                <div className={`profile-dropdown ${dropdownOpen ? 'open' : ''}`} ref={dropdownRef}>
                    <button
                        className="profile-trigger"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <div className="profile-avatar">
                            {getInitials(userName)}
                        </div>
                        <div className="profile-info">
                            <p className="profile-name">{userName || "Admin User"}</p>
                            <p className="profile-role">Administrator</p>
                        </div>
                        <span className="dropdown-arrow">▼</span>
                    </button>

                    <div className="dropdown-menu">
                        <button
                            className="dropdown-item"
                            onClick={() => {
                                setDropdownOpen(false);
                                onProfileClick();
                            }}
                        >
                            <span>👤</span>
                            <span>View Profile</span>
                        </button>
                        <div className="dropdown-divider"></div>
                        <button
                            className="dropdown-item"
                            onClick={() => {
                                setDropdownOpen(false);
                                onLogout();
                            }}
                        >
                            <span>🚪</span>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
