import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.static("./dist"));

app.get("/data", (req, res) => res.json({ msg: "Success" }));
// Routers

app.all("/*", (req, res) => res.sendFile(path.resolve("./dist/index.html")));

app.listen(process.env.VITE_PORT, error => {
    if(error) return console.log(error);
    console.log(`Server started on port ${process.env.VITE_PORT}`);
});