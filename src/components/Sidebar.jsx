import { NavLink } from "react-router-dom";
import { createIcons, icons } from 'lucide';
import { Camera, Monitor, CircleGauge, Gauge, ScanBarcode, ArrowLeftRight   } from 'lucide-react';

function Sidebar() {
  return (
    <div
      className="sidebar bg-light border-end"
      style={{ width: "220px", minHeight: "100vh", paddingTop: "70px" }}
    >
      <div className="list-group list-group-flush">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${isActive ? "active" : ""}`
          }
        >
         <Gauge  className="me-2"size={24} />
          Dashboard
        </NavLink>
        <NavLink
          to="/produtos"
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${isActive ? "active" : ""}`
          }
        >
           <ScanBarcode  className="me-2"size={24} />
          Produtos
        </NavLink>
        <NavLink
          to="/movimentacoes"
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${isActive ? "active" : ""}`
          }
        >
          <ArrowLeftRight className="me-2" size={24} />
          Movimentações
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
