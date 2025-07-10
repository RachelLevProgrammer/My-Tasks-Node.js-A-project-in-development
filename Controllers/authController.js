const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) return res.status(401).json({ message: "No user found" });

        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

        const accessToken = jwt.sign(
            { userId: foundUser._id, email: foundUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000,
        });

        return res.status(200).json({
            token: accessToken, // ✅ זה היה חסר
            userId: foundUser._id,
            username: foundUser.username,
            useremail: foundUser.email,
            calendar: foundUser.calendar,
        });
    } catch (err) {
        console.error("Login error: ", err);
        res.status(500).json({ message: "Server error" });
    }
};

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            calendar: [],
        });

        await newUser.save();

        const accessToken = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000,
        });

        res.status(201).json({
            message: "User created",
            token: accessToken, 
            userId: newUser._id,
            username: newUser.username,
            useremail: newUser.email, 
            calendar: newUser.calendar,
        });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { login, register };
