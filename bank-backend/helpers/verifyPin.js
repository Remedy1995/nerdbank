const User = require("../models/User");
const bcrypt = require("bcrypt");

const verifyUserAccount = async (userPin, userId) => {
  console.log('the user id',userId)
  try {
    // Find user
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return 404;
    }

    if (!userPin) {
      return 422;
    }
     console.log(user)
    // Check old PIN
    const isMatch = await bcrypt.compare(userPin, user.pinHash);
    
    if (!isMatch) {
      return 400;
    }

  } catch (error) {
    console.error("Error verifying user account:", error);
    return 500;
  }
};

module.exports = verifyUserAccount;
