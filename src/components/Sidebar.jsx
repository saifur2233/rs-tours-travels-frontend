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

export default function Sidebar({ activeSection, onSectionChange, isOpen, onClose }) {
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
                    {menuItems.map((item) => (
                        <div
                            key={item.id}
                            className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
                            onClick={() => {
                                onSectionChange(item.id);
                                onClose();
                            }}
                        >
                            <span className="menu-icon">{item.icon}</span>
                            <span>{item.label}</span>
                        </div>
                    ))}
                </nav>
            </aside>
        </>
    );
}
