import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import http from "http";
import https from "https";
import fs from "fs";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

dotenv.config();
const app = express();
app.use(cors());
app.use(express.static("./dist"));

app.get("/data", (req, res) => res.json({ msg: "Success" }));
// Routers

app.all("/*", (req, res) => res.sendFile(path.resolve("./dist/index.html")));

const options = {
    key: fs.readFileSync("./ssl/private.key", "utf8"),
    cert: fs.readFileSync("./ssl/certificate.crt", "utf8")
};

http.createServer(app).listen(process.env.VITE_PORT_HTTP, e => console.log(e ? e : "HTTP server"));
https.createServer(options,app).listen(process.env.VITE_PORT_HTTPS, e => console.log(e ? e : "HTTPS server"));