import cookieParser from "cookie-parser";
import express, { json, urlencoded } from "express";
import { CLIENT_DIR, PORT } from "./consts";
import { authMiddleware } from "./middlewares/auth";
import indexRouter from "./routes";

const app = express();

app.use(
    express.static(CLIENT_DIR, {
        maxAge: "7d",
        setHeaders: (res, filePath) => {
            if (filePath.endsWith(".html")) {
                res.setHeader("Cache-Control", "no-cache");
            }
        },
    })
);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authMiddleware);
app.use(indexRouter);

app.listen(PORT, () => {
    console.log(`Server is now running on PORT ${PORT}`);
    console.log(`If developing, please visit http://localhost:${PORT}`);
});
