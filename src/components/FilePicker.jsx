import React from "react";

export default function FilePicker({ label = "Select image", onBase64, accept = "image/*", required = false }) {
    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(",")[1] || reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file); // we will strip header just in case
        });

    const handleChange = async (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        const data = await toBase64(f);
        onBase64?.(data); // pure base64 (no data:image/... prefix)
    };

    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input type="file" className="form-control" accept={accept} onChange={handleChange} required={required} />
        </div>
    );
}
