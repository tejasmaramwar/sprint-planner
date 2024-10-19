const UserModel = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exists", success: false });
        }
        const usermodel = new UserModel({ name, email, password });
        usermodel.password = await bcrypt.hash(password, 10);
        await usermodel.save();

        return res.status(201).json({ message: "User Created!", success: true });

    } catch (err) {
        return res.status(500).json({ message: `Error creating user ${err}`, success: false });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Authentication failed! Email or password in incorrect';
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const jwtToken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({
            message: "Login Success!",
            success: true,
            jwtToken,
            email,
            name: user.name
        });

    } catch (err) {
        return res.status(500).json({ message: `Error creating user ${err}`, success: false });
    }
}

module.exports = {
    signup,
    login
}