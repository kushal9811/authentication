import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

function Navbar() {
    const { email, logout } = useContext(UserContext);

    return (
        <nav>
            <Link to="/">Home</Link> |
            {!email && <>
                <Link to="/login">Login</Link> |
                <Link to="/register">Register</Link>
            </>}
            {!!email && <>
                <span>Logged in as {email}</span> |
                <button onClick={logout}>Logout</button>
            </>}
        </nav>
    );
}

export default Navbar;
