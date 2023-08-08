const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  //sign the token to a specified userId
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    //cookies settings
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 10 * 24 * 60 * 60 * 1000, //expires after ten days
  });
};

module.exports = generateToken;
