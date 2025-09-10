import "dotenv/config";
import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import { shortenSchema } from "./validators.js";
import { saveUrl, getUrl, exists, incrementClicks, getInfo } from "./storage.js";

const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
});

// Shorten URL
app.post("/api/shorten", (req, res) => {
    const parse = shortenSchema.safeParse(req.body);
    if (!parse.success) {
        return res.status(400).json({ error: "Dados inválidos", details: parse.error.issues });
    }

    const { url, alias } = parse.data;
    let id = alias || nanoid(7);

    if (exists(id)) {
        return res.status(409).json({ error: "Alias já em uso" });
    }

    const saved = saveUrl(id, url);
    if (!saved) {
        return res.status(500).json({ error: "Falha ao salvar, tente novamente" });
    }

    return res.status(201).json({
        id,
        shortUrl: `${BASE_URL}/${id}`,
        url,
    });
});

// Status
app.get("/api/urls/:id", (req, res) => {
    const info = getInfo(req.params.id);
    if (!info) return res.status(404).json({ error: "Não encontrado" });
    res.json({ ...info, shortUrl: `${BASE_URL}/${req.params.id}` });
});

// Redirect
app.get("/:id", (req, res) => {
    const entry = getUrl(req.params.id);
    if (!entry) return res.status(404).send("URL não encontrada");
    incrementClicks(req.params.id);
    res.redirect(entry.url);
});

app.listen(PORT, () => {
    console.log(`Backend rodando em ${BASE_URL}`);
});
