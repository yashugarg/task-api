const User = require("../models/User");
const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

exports.registerUser = async (req, res, next) => {
  try {
    const { name, username, password } = await req.body;
    await User.create(
      { name: name, username: username, password: password },
      async (err, user) => {
        if (err) {
          console.log("register error" + err);
          if (err.code == 11000) {
            return res.status(400).json({
              success: false,
              msg: "Username already exists",
            });
          }
          return res.status(500).json({
            success: false,
            msg: err,
          });
        } else {
          user.save();

          return res.status(200).json({
            success: true,
            data: {
              userId: user._id,
            },
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to register user",
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const userObj = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    console.log(userObj);

    if (userObj == null) {
      return res.status(401).json({
        success: false,
        msg: "Invalid username or password",
      });
    }
    const body = {
      userId: userObj._id,
      username: req.body.username,
    };
    const token = jwt.sign({ user: body }, TOKEN_SECRET);
    console.log(token);
    return res.status(200).json({
      success: true,
      data: {
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
