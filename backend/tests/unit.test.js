import { saveUrl, getUrl, exists, incrementClicks, getInfo } from "../src/storage.js";

describe("Storage functions", () => {
    it("should save and retrieve a URL", () => {
        saveUrl("abc123", "https://google.com");
        const result = getUrl("abc123");
        expect(result.url).toBe("https://google.com");
    });

    it("should check if alias exists", () => {
        saveUrl("exists", "https://openai.com");
        expect(exists("exists")).toBe(true);
        expect(exists("notfound")).toBe(false);
    });

    it("should increment clicks", () => {
        saveUrl("clickme", "https://github.com");
        incrementClicks("clickme");
        const info = getInfo("clickme");
        expect(info.clicks).toBe(1);
    });
});
