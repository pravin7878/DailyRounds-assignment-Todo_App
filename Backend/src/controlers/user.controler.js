const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  const saltRound = 5;

  
  try {
    const hashPassword = await bcrypt.hash(password, saltRound);
const isUserExist = await User.findOne({email})

if(isUserExist) return res.status(400).json({massage : "User Already Exist"})


    const user = new User({ name, password: hashPassword, email });
    const newUser = await user.save();
    res.status(201).json({ message: "Registeration success", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  try {
    if(!email) return res.status(400).json({message : "email is required"})
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "user not found! , Please register first" });
    if(!password) return res.status(400).json({ message: "email is required" });    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Password is Wrong" });
    const accessToken = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      SECRET_KEY,
      {expiresIn : "1D"}
    );

    const represhToken = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      SECRET_KEY,
      {expiresIn : "1W"}
    );



    res.json({
      message: "Login success",
      accessToken,
      represhToken,
      userId: user._id,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { registerNewUser, authenticateUser };
