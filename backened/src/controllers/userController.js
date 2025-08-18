import User from "../models/User.js";
import Meeting from "../models/meetingModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import Meeting from "meetingModel.js"




export const register = async (req, res) => {
  try {
    console.log(req.body);

    const { name, username, email, password, age, gender, phone, role } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ message: "Email or username already exists" });

    const user = new User({ name, username, email, password, age, gender, phone, role });
    user.token = user.generateToken();

    await user.save();

    res.status(201).json({ token: user.token, user });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    user.token = user.generateToken();
    await user.save();

    res.status(200).json({ token: user.token, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findOne({ token: req.header("x-auth-token") }).select("-password");
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserHistory = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ token: token });
        const meetings = await Meeting.find({ user_id: user.username })
        res.json(meetings)
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}

 export const addToUserHistory = async (req, res) => {
    const { token, meeting_code } = req.body;

    try {
        const user = await User.findOne({ token: token });

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        })

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({ message: "Added code to history" })
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}
