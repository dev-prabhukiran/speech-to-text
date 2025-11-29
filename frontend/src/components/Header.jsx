import { NavLink } from "react-router-dom";

export const Header = ()=> {
    return (
        <header className="flex justify-center gap-10 py-10 text-xl">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/demo">Demo</NavLink>
            <NavLink to="/logs">Logs</NavLink>
            <NavLink to="/settings">Settings</NavLink>
        </header>
    );
}