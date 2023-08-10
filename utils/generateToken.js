const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  // Sign the token to a specified userId
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  return token;
};

module.exports = generateToken;

