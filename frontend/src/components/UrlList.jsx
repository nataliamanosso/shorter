export default function UrlList({ urls = [] }) {
    if (!urls.length) return <p className="empty">Nenhum link encurtado ainda.</p>;

    return (
        <ul className="url-list">
            {urls.map((u) => (
                <li key={u.id} className="url-card">
                    <div className="orig">{u.url}</div>
                    <div className="short">
                        <a href={u.shortUrl} target="_blank" rel="noreferrer">{u.shortUrl}</a>
                    </div>
                    <div className="actions">
                        <button onClick={() => navigator.clipboard.writeText(u.shortUrl)}>Copiar</button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
