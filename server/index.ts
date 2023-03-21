import next from "next";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/api/test", (req, res) => {
    res.status(200).json({ message: "Hello World" });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, hostname, (err?: any) => {
    if (err) throw err;
    console.log(process.env.NODE_ENV);
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
