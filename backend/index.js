const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "ecommerce1",
});

db.connect((err) => {
  if (err) {
    console.log("Hubo un error al conectar con la base de datos");
  } else {
    console.log("Conectado a la base de datos");
  }
});

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.post("/agregarProducto", (req, res) => {
  const { nombre, descripcion, precio, ruta, categoria } = req.body;
  db.query(
    "INSERT INTO productos(nombre,descripcion,precio,img,categoria) VALUES(?,?,?,?,?)",
    [nombre, descripcion, precio, ruta, categoria],
    (err, result) => {
      if (err) {
        console.log("Error en el servidor");
        return res.status(500).send("Error en el servidor");
      } else {
        console.log("Producto registrado con exito");
        return res.status(200).send("Producto registrado con exito");
      }
    }
  );
});

app.get("/productos", (req, res) => {
  const sql = "SELECT * FROM productos";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result); // Envía los resultados como respuesta en formato JSON
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
