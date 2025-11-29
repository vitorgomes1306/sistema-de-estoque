import Sidebar from "./components/Sidebar";
import "./App.css";
import { Routes, Route, Router } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='produtos' element={<Produtos />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
