const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const userService = require("./users");

const generateToken = (res, user) => {
  const token = jwt.sign(user.toObject(), JWT_SECRET);
  return res.cookie("token", token, {
    expiresIn: "2h",
    secure: false, // set to true if your using https
    httpOnly: true,
  });
};

const encode = (token) => {
  const user = jwt.verify(token, JWT_SECRET);
  userService.findById(user._id).then((user) => {
    return Promise.resolve(user);
  });
};

function parseCookies(request) {
  var list = {},
    rc = request.headers.cookie;

  rc &&
    rc.split(";").forEach(function (cookie) {
      var parts = cookie.split("=");
      list[parts.shift().trim()] = decodeURI(parts.join("="));
    });

  return list;
}
module.exports = { generateToken, encode, parseCookies };
