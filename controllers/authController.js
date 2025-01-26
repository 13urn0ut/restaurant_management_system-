const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const {
  createUser,
  getUserByEmail,
  getUserById,
  getUsersRoles,
} = require("../models/userModel");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendCookie = (res, userId) => {
  const token = signToken(userId);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);
};

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, address, password } = req.body;

    const newUser = {
      name,
      email,
      phone_number: phoneNumber,
      address,
      password: await argon2.hash(password),
      created_at: new Date(),
      updated_at: new Date(),
    };

    const createdUser = await createUser(newUser);

    if (!createdUser) throw new AppError("User creation failed", 500);

    sendCookie(res, createdUser.id);

    res.status(201).json({
      status: "success",
      data: createdUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await getUserByEmail(email);

    sendCookie(res, user.id);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) throw new AppError("You are not logged in", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await getUserById(decoded.id);

    if (!currentUser) throw new AppError("User not found", 404);

    req.user = currentUser;

    next();
  } catch (err) {
    next(err);
  }
};

exports.allowAccessTo =
  (...roles) =>
  async (req, res, next) => {
    const { role_name: userRole } = await getUsersRoles(req.user.id);

    if (!roles.includes(userRole)) next(new AppError("Access denied", 403));

    next();
  };
