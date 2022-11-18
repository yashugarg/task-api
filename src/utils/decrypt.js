const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const authorize = async function (req, res, next) {
  var resModel = {
    Status: false,
    msg: "",
    data: {},
  };

  if (!req.header("Authorization")) {
    resModel.msg = "Please make sure your request has an Authorization header";
    return res.status(401).send(resModel);
  }
  var token = req.header("Authorization");
  var payload = null;
  try {
    payload = jwt.decode(token, TOKEN_SECRET);
  } catch (err) {
    resModel.msg = err.message;
    return res.status(401).send(resModel);
  }

  if (payload == null) {
    resModel.msg = "Invalid token";
    return res.status(401).send(resModel);
  }
  req.loggedInUser = payload.user;

  next();
};

module.exports = { authorize };
