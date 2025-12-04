import React, { useEffect } from "react";

export default function Toast({ message, type = "info", onClose, duration = 3000 }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const icons = {
        success: "✓",
        error: "✕",
        warning: "⚠",
        info: "ℹ"
    };

    const titles = {
        success: "Success",
        error: "Error",
        warning: "Warning",
        info: "Info"
    };

    return (
        <div className={`toast ${type}`}>
            <div className="toast-icon">{icons[type]}</div>
            <div className="toast-content">
                <p className="toast-title">{titles[type]}</p>
                <p className="toast-message">{message}</p>
            </div>
            <button className="toast-close" onClick={onClose}>
                ×
            </button>
        </div>
    );
}
