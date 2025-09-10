import {Copy, Trash} from "lucide-react";
import {clearUrlsLocal, removeUrlLocal} from "../storage";

export default function UrlHistory({ urls = [], onUpdate }) {
    if (urls.length <= 1) return null;

    const history = urls.slice(1);

    function handleDeleteItem(id) {
        const updated = removeUrlLocal(id);
        onUpdate(updated);
    }

    function handleDeleteAll() {
        clearUrlsLocal();
        onUpdate([]);
    }

    return (
        <div className="url-history-container">
            <div className="url-history-header">
                <h2 style={{ margin: 0 }}>Histórico</h2>
                <button
                    onClick={() => handleDeleteAll()}
                    title="Limpar histórico"
                >
                    Limpar
                </button>
            </div>

            <ul className="url-list">
                {history.map((u) => (
                    <li key={u.id} className="url-card">
                        <div className="orig">{u.url}</div>
                        <div className="short">
                            <a href={u.shortUrl} target="_blank" rel="noreferrer">{u.shortUrl}</a>
                        </div>
                        <div className="actions">
                            <button onClick={() => navigator.clipboard.writeText(u.shortUrl)} className="muted-button">
                                <Copy size={18} />
                            </button>
                            <button
                                onClick={() => handleDeleteItem(u.id)}
                                className="muted-button"
                                title="Excluir URL"
                            >
                                <Trash size={18} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
