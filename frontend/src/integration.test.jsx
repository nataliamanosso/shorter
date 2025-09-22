import { describe, it, expect } from "vitest";
import axios from "axios";

const API = "http://localhost:5000/api";

describe("Integration Frontend + Backend", () => {
    it("should shorten and retrieve a URL", async () => {
        const response = await axios.post(`${API}/shorten`, { url: "https://openai.com" });
        expect(response.status).toBe(201);
        expect(response.data.shortUrl).toContain("http://localhost:5000/");

        const check = await axios.get(`${API}/urls/${response.data.id}`);
        expect(check.data.url).toBe("https://openai.com");
    });
});
