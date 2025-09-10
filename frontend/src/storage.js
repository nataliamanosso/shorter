const KEY = "shortener_urls_v1";

export function getSavedUrls() {
    try {
        return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
        return [];
    }
}

export function saveUrlLocal(list) {
    try {
        localStorage.setItem(KEY, JSON.stringify(list));
    } catch {}
}
