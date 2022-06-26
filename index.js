const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const errorMiddleware = require("./middleware/error");
const app = express();

app.use(express.json());

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(
    `Cerrar el servidor debido a un rechazo de Manejo de excepciones no detectadas`
  );
  process.exit(1);
});

//Config
dotenv.config({ path: "config/config.env" });

//Conectando a DB
connectDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(
    `Cerrar el servidor debido a un rechazo de Promise no controlado`
  );

  server.close(() => {
    process.exit(1);
  });
});

//Rutas
const product = require("./routes/productRoute");

app.use("/api", product);

//Middleware para Errores
app.use(errorMiddleware);

module.exports = app;
