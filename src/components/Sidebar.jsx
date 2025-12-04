import React from "react";

const menuItems = [
    { id: "hero", label: "Hero Banner", icon: "🎨" },
    { id: "services", label: "Services", icon: "🛠️" },
    { id: "reviews", label: "Client Reviews", icon: "⭐" },
    { id: "logo", label: "Website Logo", icon: "🖼️" },
    { id: "hotline", label: "Hotline", icon: "📞" },
    { id: "email", label: "Email Address", icon: "📧" },
    { id: "address", label: "Address", icon: "📍" },
    { id: "social", label: "Social Links", icon: "🔗" },
];

const accountMenuItems = [
    { id: "profile", label: "View Profile", icon: "👤" },
    { id: "admin-management", label: "Manage Admins", icon: "👥" },
    { id: "logout", label: "Logout", icon: "🚪", isDanger: true },
];

export default function Sidebar({ activeSection, onSectionChange, isOpen, onClose, onLogout }) {
    const handleMenuClick = (item) => {
        if (item.id === "logout") {
            // Handle logout
            onLogout();
        } else {
            // Handle section change
            onSectionChange(item.id);
        }
        onClose();
    };

    return (
        <>
            {/* Sidebar Overlay for mobile */}
            <div
                className={`sidebar-overlay ${isOpen ? 'show' : ''}`}
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <span>🏝️</span>
                        <span>RS Tours Admin</span>
                    </div>
                </div>

                <nav className="sidebar-menu">
                    <div className="menu-section">
                        <div className="menu-section-title">Management</div>
                        {menuItems.map((item) => (
                            <div
                                key={item.id}
                                className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => handleMenuClick(item)}
                            >
                                <span className="menu-icon">{item.icon}</span>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="menu-section">
                        <div className="menu-section-title">Account</div>
                        {accountMenuItems.map((item) => (
                            <div
                                key={item.id}
                                className={`menu-item ${activeSection === item.id ? 'active' : ''} ${item.isDanger ? 'danger' : ''}`}
                                onClick={() => handleMenuClick(item)}
                            >
                                <span className="menu-icon">{item.icon}</span>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </nav>
            </aside>
        </>
    );
}
