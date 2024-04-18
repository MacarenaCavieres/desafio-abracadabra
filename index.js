import express from "express";
import path from "path";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { usuarios } from "./usuarios.js";

const app = express();

const __dirname = import.meta.dirname;

app.use(express.static(path.join(__dirname, "/public")));

app.get("/abracadabra/usuarios", (req, res) => {
    res.json({ usuarios });
});

app.get("/abracadabra/juego/:usuario", authMiddleware, (req, res) => {
    return res.sendFile(path.join(__dirname, "/public/juego.html"));
});

app.get("/abracadabra/conejo/:n", (req, res) => {
    const { n } = req.params;
    const numero = Math.ceil(Math.random() * 4);

    if (numero === +n) {
        return res.redirect("/assets/img/conejito.jpg");
    } else {
        return res.redirect("/assets/img/voldemort.jpg");
    }
});

app.use("*", (req, res) => {
    res.send("Esta página no existe...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Puerto ${PORT} escuchando; http://localhost:${PORT}`);
});
