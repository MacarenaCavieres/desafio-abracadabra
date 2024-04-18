import express from "express";
import path from "path";
import { usuarios } from "./usuarios.js";

const app = express();

const __dirname = import.meta.dirname;

app.use(express.static(path.join(__dirname, "/public")));

const authMiddleware = (req, res, next) => {
    const { usuario } = req.params;
    const encontrado = usuarios.find((user) => user === usuario);
    encontrado ? next() : res.redirect("/assets/img/who.jpeg");
};

app.get("/abracadabra/juego/:usuario", authMiddleware, (req, res) => {
    return res.sendFile(path.join(__dirname, "/public/juego.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Puerto ${PORT} escuchando; http://localhost:${PORT}`);
});
