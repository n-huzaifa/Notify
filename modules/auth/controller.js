const User = require("../../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function responseData(data, token) {
  delete data.password;
  data.token = token;
  return data;
}

async function signupController(req, res, next) {
  try {
    const { first_name, last_name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      next({ status: 403, message: "User Already exists. Please Login !" });
    }

    const encryptedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email.toLowerCase(),
      password: encryptedPass,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    const data = responseData(user.toObject(), token);

    res.status(200).json(data);
  } catch (error) {
    next({ status: 500, message: error.message });
  }
}

async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;
    const loggedInUser = await User.findOne({ email });

    if (!loggedInUser) {
      next({
        status: 401,
        message: "No user exists with this email. First signup!",
      });
    }
    const authenticated = await bcrypt.compare(password, loggedInUser.password);

    if (!authenticated) {
      res.status(400).json({ error: "Invalid Credentials" });
      return;
    }

    const token = jwt.sign(
      { userId: loggedInUser._id },
      process.env.JWT_SECRET
    );
    const data = responseData(loggedInUser.toObject(), token);

    res.status(200).json(data);
  } catch (error) {
    next({ status: 500, message: error.message });
  }
}

module.exports = { loginController, signupController };
