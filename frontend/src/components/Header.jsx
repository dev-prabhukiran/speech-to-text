import { NavLink } from "react-router-dom";

export const Header = ()=> {
    return (
        <header>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/demo">Demo</NavLink>
            <NavLink to="/logs">Logs</NavLink>
            <NavLink to="/settings">Settings</NavLink>
        </header>
    );
}