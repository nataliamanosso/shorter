import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ShortenForm from "../components/ShortenForm";
import * as api from "../api";
import { vi } from "vitest";

vi.mock("../api", () => ({
    shorten: vi.fn(),
}));

describe("ShortenForm", () => {
    it("chama API e notifica onShortened", async () => {
        api.shorten.mockResolvedValue({ id: "abc123", shortUrl: "http://short/abc123", url: "https://ex.com" });
        const onShortened = vi.fn();
        render(<ShortenForm onShortened={onShortened} />);

        const input = screen.getByPlaceholderText(/cole sua url/i);
        const btn = screen.getByRole("button", { name: /encurtar/i });

        fireEvent.change(input, { target: { value: "https://ex.com" } });
        fireEvent.click(btn);

        await waitFor(() => expect(onShortened).toHaveBeenCalledTimes(1));
        expect(onShortened).toHaveBeenCalledWith({ id: "abc123", shortUrl: "http://short/abc123", url: "https://ex.com" });
    });
});
