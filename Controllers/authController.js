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

        // יצירת טוקן JWT
        const accessToken = jwt.sign(
            { userId: foundUser._id, email: foundUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        // שליחת התשובה
        return res.status(200).json({
            accessToken,    // שלח את הטוקן
            userId: foundUser._id, // ה- ID של המשתמש
            username: foundUser.username, // שם המשתמש
            useremail: foundUser.email,  // מייל המשתמש
            calendar: foundUser.calendar  // המערך של המשימות
        });
    } catch (err) {
        console.error("Login error: ", err);
        res.status(500).json({ message: 'Server error' });
    }
};

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // בדיקה אם המשתמש כבר קיים
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // הצפנת סיסמה
        const hashedPassword = await bcrypt.hash(password, 10);

        // יצירת משתמש חדש
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            calendar: [] // ודא שיש ערך ברירת מחדל
        });

        // שמירה למסד הנתונים
        await newUser.save();

        // יצירת טוקן
        const accessToken = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        // תגובת הצלחה
        res.status(201).json({
            accessToken,
            message: "User created",
            userId: newUser._id,
            username: newUser.username,
            email: newUser.email,
            calendar: newUser.calendar
        });

    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
module.exports = { login, register };
