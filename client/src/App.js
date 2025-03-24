import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import Navbar from "./Navbar";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";

function App() {
    return (
        <UserContextProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </UserContextProvider>
    );
}

export default App;
