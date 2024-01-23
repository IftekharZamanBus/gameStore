const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { STATUS } = require("../utils/constants");
const generateToken = require("../utils/generateToken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ error: "Sorry we did not find any user that match with this email address. If you haven't registered, please go through our registration page." });
  }

  if (user.isactive === STATUS.INACTIVE) {
    return res.status(400).json({ error: "Sorry your account is not active. Please contact our customer service." });
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.status(200).json({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      username: user.username,
      phone_number: user.phone_number,
      address: user.address,
      isactive: user.isactive,
      token: generateToken(user.id)
    });
  } else {
    return res.status(400).json({ error: "Invalid email or password." });
  }
};

const register = async (req, res) => {
  const { full_name, email, password, username, phone_number, address } = req.body;
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      id: uuidv4(),
      full_name,
      email,
      password: hashedPassword,
      username,
      phone_number,
      address,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { full_name, email, password, username, phone_number, address } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user properties as needed
    user.full_name = full_name;
    user.email = email;
    user.username = username;
    user.phone_number = phone_number;
    user.address = address;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
