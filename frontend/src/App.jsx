import { useState } from "react";
import ShortenForm from "./components/ShortenForm";
import UrlList from "./components/UrlList";
import { getSavedUrls, saveUrlLocal } from "./storage";

export default function App() {
    const [urls, setUrls] = useState(getSavedUrls());

    const handleAdd = (item) => {
        const next = [item, ...urls];
        setUrls(next);
        saveUrlLocal(next);
    };

    return (
        <div className="app">
            <header>
                <h1>Encurtador de URL</h1>
                <p>Cole uma URL e gere uma versão curta — backend no Node.</p>
            </header>

            <main>
                <ShortenForm onShortened={handleAdd} />
                <UrlList urls={urls} />
            </main>
        </div>
    );
}
