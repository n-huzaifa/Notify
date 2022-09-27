const User = require("../../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function responseData(data, token) {
  delete data.password;
  data.token = token;
  return data;
}

async function signupController(req, res) {
  try {
    const { first_name, last_name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(403).json({ error: "User Already exists. Please Login !" });
      return;
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
    res.status(500).json({ error: error.message });
  }
}

async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const loggedInUser = await User.findOne({ email });

    if (!loggedInUser) {
      res
        .status(401)
        .json({ error: "No user exists with this email. First signup!" });
      return;
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
    res.status(500).json({ error: error.message });
  }
}

module.exports = { loginController, signupController };
