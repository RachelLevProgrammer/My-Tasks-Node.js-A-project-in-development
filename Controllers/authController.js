const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) return res.status(401).json({ message: 'No user found' });

        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

        const accessToken = jwt.sign(
            { userId: foundUser.userId, email: foundUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            accessToken,
            userId: foundUser.userId, // הוספת ה-userId
            username: foundUser.username,
            useremail:foundUser.email
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({
            message: "User created",
            userId: newUser._id, // שימוש ב-ID של המשתמש שנוצר
            username: newUser.username,
            email: newUser.email
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


module.exports = { login, register };
