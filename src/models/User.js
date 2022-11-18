const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *     type: object
 *     required:
 *      - username
 *      - password
 *     properties:
 *      name:
 *       type: string
 *       description: The name of the user
 *      username:
 *       type: string
 *       description: The username of the user
 *       required: true
 *      password:
 *       type: string
 *       description: The password of the user
 *       required: true
 *      balance:
 *       type: number
 *       description: The wallet balance of the user
 *       default: 100
 *     example:
 *      name: Yashu Garg
 *      username: yashugarg
 *      password: 12345678
 *
 */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  balance: {
    type: Number,
    default: 100,
  },
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "Username is required"],
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
