const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *   Transfer:
 *     type: object
 *     required:
 *      - amount
 *      - sourceAccount
 *      - destinationAccount
 *     properties:
 *      amount:
 *       type: number
 *       description: The amount to be transferred
 *       required: true
 *      sourceAccount:
 *       type: string
 *       description: The userId of the source user
 *       required: true
 *      destinationAccount:
 *       type: string
 *       description: The userId of the destination user
 *       required: true
 *      createdAt:
 *       type: string
 *       format: date-time
 *       description: The date-time at which the transfer was created
 *      updatedAt:
 *       type: string
 *       format: date-time
 *       description: The date-time at which the transfer was updated
 *     example:
 *      amount: 100
 *      sourceAccount: 60e1c1b0b0b5a0a0b0b0b0b0
 *      destinationAccount: 60e1c1b0b0b5a0a0b0b0b0b1
 */
const TransferSchema = new mongoose.Schema(
  {
    sourceAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destinationAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Transfer amount is required"],
    },
  },
  {
    timestamps: true,
  }
);
const Transfer = mongoose.model("Transfer", TransferSchema);

module.exports = Transfer;
