import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const { setEmail: setUserEmail } = useContext(UserContext);

    async function loginUser(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login', 
                { email, password }, 
                { withCredentials: true }
            );
            setUserEmail(response.data.email);
            setErrorMessage(""); 
        } catch (error) {
            console.error(error);
            setErrorMessage(error.response?.data?.error || "Login failed. Please try again.");
        }
    }

    return (
        <form onSubmit={loginUser}>
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
            />
            <br />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
            />
            <br />
            <button type="submit">Login</button>
            <br />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Display error message */}
        </form>
    );
}

export default Login;
