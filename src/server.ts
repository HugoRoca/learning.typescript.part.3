import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import routes from "./services";
import middleware from "./middleware";

// el manejo tanto de uncaughtExeption y unhandledRejection es super importante, en caso
// que nos encontremos con cualquier de estos dos, se acabó el juego para esta instancia
// esto quiere decir que tu aplicación se quedara en un estado indefinido, asi que lo 
// mejor es matar el proceso.
process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1)
});

process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1)
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);

const { PORT = 3000 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () => console.log(`Server is running http://localhost:${PORT} ...`));