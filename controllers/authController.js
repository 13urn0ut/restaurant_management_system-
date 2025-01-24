const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const {
  createUser,
  getUserByEmail,
  getUsersPassword,
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
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) throw new AppError("User not found", 404);

    const { password: usersPassword } = await getUsersPassword(user.id);

    const isPasswordCorrect = await argon2.verify(usersPassword, password);

    if (!isPasswordCorrect)
      throw new AppError("Incorrect email or password", 401);

    sendCookie(res, user.id);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
