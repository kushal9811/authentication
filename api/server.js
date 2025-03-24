import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import User from './models/User.js';

const app = express();
const secret = 'supersecretkey';

await mongoose.connect('mongodb://localhost:27017/auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.log);
db.once('open', () => console.log('Connected to MongoDB'));

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));

// Register Route
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: "Email and password required" });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();

        jwt.sign({ id: user._id, email: user.email }, secret, (err, token) => {
            if (err) return res.sendStatus(500);
            res.cookie('token', token).json({ id: user._id, email: user.email });
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    jwt.sign({ id: user._id, email: user.email }, secret, (err, token) => {
        if (err) return res.sendStatus(500);
        res.cookie('token', token).json({ id: user._id, email: user.email });
    });
});

// Get User Info Route
app.get('/user', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json({});
    
    jwt.verify(token, secret, async (err, decoded) => {
        if (err) return res.json({});
        const user = await User.findById(decoded.id);
        if (!user) return res.json({});
        res.json({ id: user._id, email: user.email });
    });
});

// Logout Route
app.post('/logout', (req, res) => {
    res.cookie('token', '').json({ message: "Logged out" });
});

app.listen(4000, () => console.log("Server running on port 4000"));
