const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const upload = require("./multerconfig.js");
const app = express();
app.use(express.json());
app.use(cors());
const User = require("./models/User");
const BlogPost = require("./models/BlogPost.js");
const SECRET_KEY = "adpi";

mongoose
    .connect("mongodb://localhost:27017/blog", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use('/uploads',express.static(path.join(__dirname,'uploads')));
//Register a user
app.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully" });
});

//Login a user
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ email: user.email }, SECRET_KEY, {
        expiresIn: "1h",
    });
    res.json({ token });
});

// Middleware to authenticate users
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token is not provided" });
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token is invalid" });
        }
        
        req.user = user;
        next();
    });
};

// Protected route
app.get("/protected", authenticateToken, (req, res) => {
    res.send("This is a protected route");
});

// Create blog post
app.post(
    "/createpost",
    authenticateToken,
    upload.single("image"),
    async (req, res) => {
        const { title, content, tags } = req.body;
        const image = req.file ? req.file.path : "";
        try {
            const user = await User.findOne({ email: req.user.email });
            const newPost = await BlogPost.create({
                title,
                content,
                tags,
                image,
                user:user._id
            });
            res.status(201).json(newPost); // Send successful response here
        } catch (error) {
            res.status(400).json({ error: error.message }); // Send error response here
        }
    }
);

// Get all blog posts
app.get("/posts", async (req, res) => {
    try {
        const posts = await BlogPost.find().populate("user", "email");
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("server listening on port 3000");
});
