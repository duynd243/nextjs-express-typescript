"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const next_1 = __importDefault(require("next"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = (0, next_1.default)({ dev, hostname, port });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    const server = (0, express_1.default)();
    server.get("/api/test", (req, res) => {
        res.status(200).json({ message: "Hello World" });
    });
    server.get("*", (req, res) => {
        return handle(req, res);
    });
    server.listen(port, hostname, (err) => {
        if (err)
            throw err;
        console.log(process.env.NODE_ENV);
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});
