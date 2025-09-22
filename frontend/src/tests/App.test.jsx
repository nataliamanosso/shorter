import {cleanup, render, screen} from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import App from "../App.jsx";

afterEach(() => {
    cleanup();
});

describe("App component", () => {
    it("renders without crashing", () => {
        render(<App />);
        expect(screen.getByText(/shorter/i)).toBeTruthy();
    });

    it("renders input field for URL", () => {
        render(<App />);
        const input = screen.getByPlaceholderText(/cole sua url/i);
        expect(input).toBeTruthy();
    });
});
