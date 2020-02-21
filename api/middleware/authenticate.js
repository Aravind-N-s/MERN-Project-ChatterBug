const jwt = require("jsonwebtoken");
const HttpStatus = require("http-status-codes");
const { crashLogger } = require("../../config/logger");

const verifyUser = function(req, res, done) {
  const token = req.header("Authorization");
  jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
    if (err) {
      crashLogger.warn(`Json web token doesn't exist ${err.name}`);
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "Token Invalid" });
    } else {
      (req.payload = payload), done();
    }
  });
};
module.exports = {
  verifyUser
};
