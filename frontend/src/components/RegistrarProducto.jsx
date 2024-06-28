import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect } from "react";

function RegistrarProducto() {
  const [img, setImg] = useState(false);
  const [ruta, setRuta] = useState("");

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState();

  const [categoria, setCategoria] = useState("");

  const handleImg = () => {
    setImg(true);
  };

  useEffect(() => {
    console.log("Categoría seleccionada:", categoria);
  }, [categoria]);

  const agregar = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/agregarProducto",
        {
          nombre: nombre,
          descripcion: descripcion,
          precio: precio,
          ruta: ruta,
          categoria: categoria,
        }
      );
      alert("Producto registrado con exito");
    } catch (error) {
      if (error.res) {
        if (error === 500) {
          alert("Error en el servidor", error.res.data);
        }
        alert("Error al registrar el producto", error.res.data);
      } else if (error.req) {
        alert("Error en el servidor");
      }
    }
  };
  return (
    <div className="flex justify-center mt-12">
      <div className="w-11/12 md:w-6/12  flex justify-center flex-col">
        <h1 className=" text-green-700 text-4xl font-semibold text-center mb-4">
          Agregar producto
        </h1>
        <form onSubmit={agregar}>
          <p className="pl-3 ">Producto</p>
          <Input
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
            }}
            label="Nombre del producto"
            className="mb-3"
            required
          />
          <p className="pl-3">Precio</p>
          <Input
            value={precio}
            onChange={(e) => {
              setPrecio(e.target.value);
            }}
            className="mb-3"
            required
            type="number"
            label="Precio del producto"
          />
          <p>Categoría</p>
          <Autocomplete
            onSelect={(e) => setCategoria(e.target.value)}
            label="Selecciona la categoria del producto"
          >
            <AutocompleteItem value="computadoras">
              Laptop y componentes de computadoras
            </AutocompleteItem>
            <AutocompleteItem value="celulares">Celulares</AutocompleteItem>
            <AutocompleteItem value="vestimenta">
              Vestimenta, ropa
            </AutocompleteItem>
            <AutocompleteItem value="electrodomesticos">
              Electrodomesticos
            </AutocompleteItem>
            <AutocompleteItem value="otros">Otros</AutocompleteItem>
          </Autocomplete>
          <p className="pl-3">Descripción</p>
          <Textarea
            value={descripcion}
            onChange={(e) => {
              setDescripcion(e.target.value);
            }}
            className="mb-3"
            required
            label="Descripción del producto"
          />
          <p className="pl-3">Imagen del producto</p>
          <div className="flex justify-center">
            <Input
              value={ruta}
              onChange={(e) => {
                setRuta(e.target.value);
              }}
              className="mb-3"
              required
              placeholder="Ejemplo: /producto2.jpg ó https://imagen.com"
            />{" "}
            <Button onClick={handleImg}>Cargar imagen</Button>
          </div>
          <div className="flex justify-center">
            {img && ruta && (
              <img
                className="w-96"
                src={ruta}
                alt="Vista previa de la imagen"
              />
            )}
          </div>

          <div className="flex justify-center mt-6">
            <Button type="submit" className="w-96 bg-[#104501] text-white">
              AGREGAR
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrarProducto;
