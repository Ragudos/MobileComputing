import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

const distDir = path.join(__dirname, "..", "client", "dist");

app.use(
    express.static(distDir, {
        index: false,
        maxAge: "7d",
        setHeaders: (res, filePath) => {
            if (filePath.endsWith(".html")) {
                res.setHeader("Cache-Control", "no-cache");
            }
        },
    })
);

app.get("/", (req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Serer is live on http://localhost:${PORT}`);
});
