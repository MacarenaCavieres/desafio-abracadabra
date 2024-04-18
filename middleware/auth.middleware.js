import { usuarios } from "../usuarios.js";

export const authMiddleware = (req, res, next) => {
    const { usuario } = req.params;
    const encontrado = usuarios.find((user) => user === usuario);
    encontrado ? next() : res.redirect("/assets/img/who.jpeg");
};
