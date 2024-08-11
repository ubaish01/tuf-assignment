const jwt = require("jsonwebtoken");
const { serialize } = require("cookie");

module.exports = {
  cookieSetter: (res, token, set) => {
    res.setHeader(
      "Set-Cookie",
      serialize("token", set ? token : "", {
        path: "/",
        httpOnly: false,
        maxAge: set ? 30 * 24 * 60 * 60 * 1000 : 0,
      })
    );
  },
  extractJwt: (cookie) => {
    let token = cookie?.split("token=");
    if (token) token = token[1];
    if (token) token = token.split(";");
    if (token) token = token[0];

    return token;
  },

  generateToken: (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "365d" });
  },
};
