import { useState } from "react";
import {Copy} from "lucide-react";
import ShortenForm from "./components/ShortenForm";
import UrlHistory from "./components/UrlHistory.jsx";
import {getSavedUrls,  saveUrlLocal} from "./storage";

export default function App() {
    const [urls, setUrls] = useState(getSavedUrls());

    const handleAdd = (item) => {
        const next = [item, ...urls];
        setUrls(next);
        saveUrlLocal(next);
    };

    return (
        <div className="app">
            <div className="app-hero"></div>
            <div className="app-container">
                <header className="app-header">
                    <h1>/ Shorter /</h1>
                    <h2>Encurtador de URL</h2>
                </header>

                <main>
                    <p>Cole uma URL e gere uma versão curta.</p>
                    <ShortenForm onShortened={handleAdd} />
                    {urls.length > 0 && (
                        <div className="url-card">
                            <div className="orig">{urls[0].url}</div>
                            <div className="short">
                                <a href={urls[0].shortUrl} target="_blank" rel="noreferrer">{urls[0].shortUrl}</a>
                            </div>
                            <div>
                                <button onClick={() => navigator.clipboard.writeText(urls[0].shortUrl)} className="muted-button">
                                    <Copy size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                    <UrlHistory urls={urls} onUpdate={(updated) => setUrls(updated)} />
                </main>
            </div>
        </div>
    );
}
