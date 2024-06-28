import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrarProducto from "./components/RegistrarProducto";
import Tienda from "./components/Tienda";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tienda />} />
        <Route path="/registro-productos" element={<RegistrarProducto />} />
      </Routes>
    </Router>
  );
}

export default App;
