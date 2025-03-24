import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const [successMessage, setSuccessMessage] = useState('');
    const { setEmail: setUserEmail } = useContext(UserContext);

    async function registerUser(e) {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        try {
            const response = await axios.post(
                'http://localhost:4000/register', 
                { email, password }, 
                { withCredentials: true }
            );
            setUserEmail(response.data.email);
            setSuccessMessage("Registration successful! You are now logged in.");
        } catch (error) {
            console.error(error);
            setErrorMessage(error.response?.data?.error || "Registration failed. Please try again.");
        }
    }

    return (
        <form onSubmit={registerUser}>
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
            <button type="submit">Register</button>
            <br />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Error message */}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>} {/* Success message */}
        </form>
    );
}

export default Register;
