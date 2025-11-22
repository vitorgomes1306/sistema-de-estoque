import { NavLink } from "react-router-dom";
import { createIcons, icons } from 'lucide';

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
          <i className="bi bi-speedometer2 me-2"></i>
          Dashboard
        </NavLink>
        <NavLink
          to="/produtos"
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-box me-2"></i>
          Produtos
        </NavLink>
        <NavLink
          to="/movimentacoes"
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-arrow-left-right me-2"></i>
          Movimentações
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
