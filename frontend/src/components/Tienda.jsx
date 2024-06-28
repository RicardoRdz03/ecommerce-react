import {
  Button,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import React, { useDebugValue, useEffect, useState } from "react";
import axios from "axios";

function Tienda() {
  const [productos, setProductos] = useState([]);

  const mostrarDatos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/productos");
      setProductos(response.data);
    } catch (error) {
      console.log("Error de fetching: ", error);
    }
  };

  useEffect(() => {
    mostrarDatos();
  }, []);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">TIENDA ONLINE</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              <i className="text-xl bi bi-cart-fill"></i>
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <div>
        <h1 className="text-4xl font-bold text-center my-12">
          Productos en venta
        </h1>
      </div>

      <div className="flex justify-center items-center">
        <div className="grid grid-cols-12 gap-3">
          {productos.map((producto) => (
            <div className="col-span-12 sm:col-span-6 md:col-span-4 ">
              <div
                key={producto.id}
                className="h-96 w-80 flex justify-center items-center flex-col rounded-lg shadow-lg py-9"
              >
                <Image
                  src={producto.img}
                  style={{ height: "200px", width: "auto" }}
                />
                <h1 className="text-xl font-semibold my-3">
                  {producto.nombre}
                </h1>
                <p className="mb-3">{producto.descripcion}</p>
                <p className="font-bold">${producto.precio}</p>
                <div>
                  <Button
                    variant="flat"
                    color="success"
                    className=" text-[#094D0D]"
                  >
                    <i className="text-xl bi bi-cart-fill"></i>{" "}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Tienda;
