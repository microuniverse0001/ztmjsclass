const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/quote", async (req, res) => {
    try {
        const r = await fetch(
            "https://jacintodesign.github.io/quotes-api/data/quotes.json"
        );
        const data = await r.json();
        const quote = data[Math.floor(Math.random() * data.length)];
        res.json(quote);
    } catch (e) {
        console.log("Помилка:", e.message);
        res.status(502).json({ error: "Upstream failed" });
    }
});

app.listen(3000, () => console.log("Proxy on http://localhost:3000"));