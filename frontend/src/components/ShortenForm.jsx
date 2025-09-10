import { useState } from "react";
import { shorten } from "../api";

export default function ShortenForm({ onShortened }) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url) return;
        setLoading(true);
        setError(null);
        try {
            const data = await shorten(url);
            onShortened({ id: data.id, shortUrl: data.shortUrl, url: data.url });
            setUrl("");
        } catch (err) {
            setError(err?.response?.data?.error || err.message || "Erro");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Cole sua URL (ex: https://...)"
                aria-label="url-input"
            />
            <button type="submit" disabled={loading}>
                {loading ? "Encurtando..." : "Encurtar"}
            </button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}
