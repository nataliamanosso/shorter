const db = new Map();
// id -> { url, clicks, createdAt }

export function saveUrl(id, url) {
    if (!id || !url) throw new Error("id/url inválidos");
    if (db.has(id)) return false;
    db.set(id, { url, clicks: 0, createdAt: new Date().toISOString() });
    return true;
}

export function getUrl(id) {
    return db.get(id) || null;
}

export function exists(id) {
    return db.has(id);
}

export function incrementClicks(id) {
    const entry = db.get(id);
    if (entry) {
        entry.clicks += 1;
        db.set(id, entry);
    }
}

export function getInfo(id) {
    const entry = db.get(id);
    if (!entry) return null;
    return { id, ...entry };
}
