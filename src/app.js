const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const viewsRouter = require("./routes/views.router");
const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");

require('./database.js');

// Crea una instancia de Express
const app = express();
// Define el puerto en el que el servidor escuchará
const PUERTO = 8080;

// Configuramos handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Configuracion necesaria para utilizar archivos JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

// Middleware para archivos estáticos
app.use(express.static("./src/public"));

// Routing
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use("/", viewsRouter);
app.get("/*", (req, res) => res.send("pagina no encontrada"));

// Inicia el servidor
const httpServer = app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});

// Socket.io
const io = new socket.Server(httpServer);

const MessageModel = require('./dao/models/message.model.js')

io.on("connection",(socket) => {
  console.log("Nuevo usuario conectado");

  socket.on("message",  async (data) => {
    await MessageModel.create(data);
    const messages = await MessageModel.find()
    io.emit("messagesLogs", messages);
  });
});
