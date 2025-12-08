import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
export const Header = ()=> {
    return (
      <header className="w-full h-16 flex justify-between items-center py-12 text-xl bg-blue-900 text-white">
        <img src={logo} alt="logo" className="h-15 ml-6" />
        <nav className="flex gap-8 text-lg mr-10">
          <NavLink to="/" className="bg-blue-500 px-4 py-1 rounded-2xl">
            Home
          </NavLink>
          <NavLink to="/demo" className="bg-blue-500 px-4 py-1 rounded-2xl">
            Demo
          </NavLink>
          <NavLink to="/logs" className="bg-blue-500 px-4 py-1 rounded-2xl">
            Logs
          </NavLink>
          <NavLink to="/settings" className="bg-blue-500 px-4 py-1 rounded-2xl">
            Settings
          </NavLink>
        </nav>
      </header>
    );
}
