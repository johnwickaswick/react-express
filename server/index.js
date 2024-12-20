import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import http from "http";
import https from "https";
import fs from "fs";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.static("./dist"));

app.get("/data", (req, res) => res.json({ msg: "Success" }));
// Routers
app.all("/*", (req, res) => res.sendFile(path.resolve("./dist/index.html")));

const options = {
    key: fs.readFileSync("./ssl/private.key"),
    cert: fs.readFileSync("./ssl/certificate.crt")
}

http.createServer(app).listen(VITE_PORT_HTTP, e => console.log(e ? e : "HTTP server running..."));
https.createServer(options, app).listen(VITE_PORT_HTTPS, e => console.log(e ? e : "HTTPS server running..."));

// app.listen(process.env.VITE_PORT, error => {
//     if(error) return console.log(error);
//     console.log(`Server started on port ${process.env.VITE_PORT}`);
// });