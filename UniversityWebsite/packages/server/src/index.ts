import { API_URL, CLIENT_URL, IS_DEVELOPMENT, PORT } from "@/lib/consts";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import express from "express";
import morgan from "morgan";
import indexRouter from "./routes";

const app = express();
const server = app.listen(PORT, onListen);
const corsOptions: CorsOptions = {
    origin: CLIENT_URL,
    optionsSuccessStatus: 200,
};

app.use(morgan(IS_DEVELOPMENT ? "dev" : "combined"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(indexRouter);

process.on("SIGINT", onShutdown);
process.on("SIGTERM", onShutdown);

function onListen() {
    if (IS_DEVELOPMENT) {
        console.log(`[server] running on ${API_URL}:${PORT}`);
    } else {
        console.log(`[server] running on ${API_URL}`);
    }
}

function onShutdown(signal: string) {
    console.log(`[server] Received ${signal}, shutting down gracefully...`);

    server.close((err) => {
        if (err) {
            console.error("[server] Error during shutdown", err);
            return process.exit(1);
        }

        console.log("[server] Closed all connections, exiting");
        return process.exit(0);
    });
}
