const { User, Transfer } = require("../models");

exports.getBalance = async (req, res) => {
  try {
    console.log("inside get balance");
    const userId = req.loggedInUser.userId;
    const user = await User.findById(userId);
    return res.status(200).json({
      success: true,
      data: {
        balance: user.balance,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to get balance",
    });
  }
};

exports.transfer = async (req, res) => {
  try {
    const { to, amount } = req.body;
    const destinationUser = await User.findById(to);
    if (destinationUser == null) {
      return res.status(400).json({
        success: false,
        message: "Invalid user",
      });
    }
    if (amount == null) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const currUser = await User.findById(req.loggedInUser.userId);
    if (currUser.balance < req.body.amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
      });
    }

    const transfer = new Transfer();
    transfer.amount = amount;
    transfer.sourceAccount = currUser._id;
    transfer.destinationAccount = destinationUser._id;

    currUser.balance -= amount;
    destinationUser.balance += amount;

    await transfer.save();
    await currUser.save();
    await destinationUser.save();

    return res.status(200).json({
      success: true,
      data: transfer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to transfer",
    });
  }
};
