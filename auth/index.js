const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../utils/error");
const secret = config.jwt.secret;
function sign(data) {
  return jwt.sign(data, secret);
}
const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    console.log(decoded);

    //comprobar si es o no propio
    if (decoded.id !== owner) {
      throw error("No puedes hacer esto", 401);
    }
  },
};
function verify(token) {
  return jwt.verify(token, secret);
}
function getToken(auth) {
  if (!auth) {
    throw error("No puedes hacer esto", 401);
  }
  if (auth.indexOf("Bearer ") === -1) {
    throw error("No puedes hacer esto", 401);
  }
  let token = auth.replace("Bearer ", "");
  return token;
}
function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

module.exports = {
  sign,
  check,
};
