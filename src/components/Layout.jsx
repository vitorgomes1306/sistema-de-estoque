import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

const Layout = () => {
  return (
    <div>
        <Navbar/>
        <div className="d-flex">
            <Sidebar />
            <main className="flex-grow-1 p-4" style={{ marginTop: "56px"}}>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default Layout