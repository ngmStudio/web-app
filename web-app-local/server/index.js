// index.js dins de la carpeta 'server'

const express = require("express");
const app = express();
const port = 5000;

// Ruta simple
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
