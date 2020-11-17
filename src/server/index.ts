import compression from "compression";
import express from "express";
import path from "path";
import http from "http";

import ioSetup from "./io";

const app = express();
const server = new http.Server(app);

app.use(compression());
app.use(express.static(path.resolve("./client/dist")));

app.get("/*", (req, res) => res.redirect("/"));

ioSetup(server);

export default server;