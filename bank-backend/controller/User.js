const User = require("../../bank-backend/models/User");
const Response = require("../init/Response");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");

const userInformation = async (req, res) => {
  const userId = req.userId;
  console.log("my userId", userId);
  try {
    const userInfo = await User.findOne({ _id: userId })
      .select("-password -confirm_password -createdAt -__v -_id -pinHash")
      .exec();
    var newSuccess = new Response(200, userInfo, "Success");
    return res.status(200).json(newSuccess.successObject());
  } catch (error) {
    let newError = new Response(500, "Internal Server Error", error.message);
    return res.status(500).json(newError.errorObject());
  }
};
const createNewUser = async (req, res) => {
  const { phone, email, password, firstname, lastname } =
    req.body !== undefined && req.body;
  if (!phone) {
    return res.status(422).json({
      status: false,
      message: "Sorry Phone is required",
    });
  }

  if (!email) {
    return res.status(422).json({
      status: false,
      message: "Sorry email is required",
    });
  }
  if (!firstname) {
    return res.status(422).json({
      status: false,
      message: "Sorry First Name is required",
    });
  }

  if (!lastname) {
    return res.status(422).json({
      status: false,
      message: "Sorry Last Name is required",
    });
  }

  if (!password) {
    return res.status(422).json({
      status: false,
      message: "Sorry Password  is required",
    });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const createUser = new User({
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
      password: hashedPassword,
    });

    const response = await createUser.save();
    //if the user successfully signs up create a record for subscription
    console.log("my resp", response._id);
    if (response) {
      const userStringData = `${response._id} ${response.firstname} ${response.lastname}`;
      var newSuccess = new Response(
        201,
        "You have successfully signed up",
        userStringData
      );
      return res.status(201).json(newSuccess.successObject());
      // }
    }
  } catch (error) {
    //check if email already exist
    if (
      ((error.code === 11000) & error.keyPattern && error.keyPattern, email)
    ) {
      console.log(error.message);
      var response = new Response(
        422,
        "Sorry email address or phone already exists"
      );
      return res.status(422).json(response.errorObject());
    }
    response = new Response(500, "Internal Server Error", error.message);
    return res.status(500).json(response.errorObject());
  }
};

const createNewCustomer = async (req, res) => {
  const { firstname, lastname, phone, email, confirm_password, password } =
    req.body !== undefined && req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const hashedConfirmPassword = bcrypt.hashSync(confirm_password, 10);
    const createUser = new User({
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
      password: hashedPassword,
      confirm_password: hashedPassword,
    });

    const response = await createUser.save();
    var newSuccess = new Response(
      201,
      "You have successfully signed up",
      response
    );
    return res.status(201).json(newSuccess.successObject());
  } catch (error) {
    //check if email already exist
    if (
      ((error.code === 11000) & error.keyPattern && error.keyPattern, email)
    ) {
      var response = new Response(
        400,
        "Sorry Email Address Already Exists",
        error.message
      );
      return res.status(400).json(response.errorObject());
    }
    response = new Response(500, "Internal Server Error", error.message);
    return res.status(500).json(response.errorObject());
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email) {
    return res.status(422).json({
      status: false,
      message: "Sorry Email is required",
    });
  }

  if (!password) {
    return res.status(422).json({
      status: false,
      message: "Sorry Password  is required",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      let newError = new Response(
        400,
        "Sorry Invalid credentials provided",
        "Failed"
      );
      console.log("error", newError);
      return res.status(400).json(newError.errorObject());
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin, email: email },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );
    const userData = {
      user: user._id,
      isAdmin: user.isAdmin,
    };
    var newSuccess = new Response(200, "Success", {
      message: "User has successfully signed in",
      userData,
    });

    //instead of sending tokens to frontend client save it in http only cookie to avoid
    //attackers accesssing the tokens
    //    res.cookie('access_token', token, {
    //      httpOnly: true,
    //      secure: true,  // HTTPS only in production
    //      maxAge: 3600000,
    //      sameSite: 'None',  // Allows cross-origin cookies
    //      path: '/'
    //    });
    // localhost set cookie
    //    res.cookie('access_token', token, {
    //  httpOnly: true,
    //  secure: process.env.NODE_ENV === 'production' ? true : false, // Disable in development
    //  sameSite: "Lax", // 'Lax' for localhost
    //  maxAge: 24 * 60 * 60 * 1000, // 1 day
    //  path: '/'
    //});

    //for localhost
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false, // Disable secure in localhost (Safari needs this)
      sameSite: "Lax", // Required for localhost
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      path: "/",
    });

    //for production
    //res.cookie('access_token', token, {
    //  httpOnly: true, // Prevents JavaScript access (XSS protection)
    //  secure: process.env.NODE_ENV === 'production', // Secure only in production (requires HTTPS)
    //  sameSite: "Lax", // Allows cookies to be sent on same-site navigations
    //  maxAge: 24 * 60 * 60 * 1000, // 1 day
    //  path: '/'
    //});

    //  res.cookie("access_token", token, {
    //        httpOnly: true,
    //        secure: process.env.NODE_ENV === "production", // ✅ Secure in production
    //        sameSite: "Strict", // ✅ Prevents CSRF attacks
    //        domain: process.env.COOKIE_DOMAIN, // ✅ Set dynamically
    //        maxAge: 24 * 60 * 60 * 1000, // 1 day
    //        path: "/",
    //    });

    //  res.cookie("access_token", token, {
    //        httpOnly: true,
    //        secure: process.env.NODE_ENV === "production", // ✅ Secure in production
    //        sameSite: "Strict", // ✅ Prevents CSRF attacks
    //        domain: process.env.COOKIE_DOMAIN, // ✅ Set dynamically
    //        maxAge: 24 * 60 * 60 * 1000, // 1 day
    //        path: "/",
    //    });
    console.log("cookies recieved", req.cookies);
    console.log("headers", req.headers);
    return res.status(200).json(newSuccess.successObject());
  } catch (error) {
    newError = new Response(500, "Internal Server Error", error.message);
    return res.status(500).json(newError.errorObject());
  }
};

const allUsers = async (req, res) => {
  const perPage = parseInt(req.query.perPage) || 10;
  const page = parseInt(req.query.page) || 1;
  try {
    const users = await User.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .select("-password")
      .sort({ created_At: -1 });
    const allDocuments = await User.countDocuments();

    const totalpages = Math.ceil(allDocuments / perPage);
    const documentsPerPage = allDocuments > 0 ? perPage : 0;
    const currentPage = allDocuments > 0 ? page : 0;
    const allData = {
      users,
      totalpages,
      documentsPerPage,
      allDocuments,
      currentPage,
    };

    return res.status(200).json(allData);
  } catch (error) {
    console.log("err", error);
    return res
      .status(500)
      .json({ message: "Sorry an error occured Please try later" });
  }
};

const updateUser = async (req, res) => {
  let { updateFields } = req.body;
  let userId = req.userId;

  //updateFields = updateFields.updateFields;
  console.log("This is the user id", userId, updateFields);
  if (!userId) {
    return res.status(422).json({
      status: false,
      message: "User ID is required",
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};

const LogoutUser = (req, res) => {
  res.cookie("access_token", "", {
    expires: new Date(0), // Expire immediately
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Enable only in production
    sameSite: "Lax",
    path: "/",
  });
  console.log("Cookies after clearing:", req.cookies);
  return res
    .status(200)
    .json({ message: "Logged out successfully", statusCode: 200 });
};

const createPin = async (req, res) => {
  const SALT_ROUNDS = 10;

  const { pin } = req.body;
  console.log("The user email is", req, req.body);
  if (!pin) {
    return res.status(422).json({ message: "Sorry Pin is required" });
  }
  if (pin.length < 6 || pin.length > 6) {
    return res
      .status(400)
      .json({ message: "Sorry Pin length should be 6 maximum" });
  }
  const user = await User.findOne({ email: req.email });
  console.log("user", user);
  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.isPinSet) {
    return res
      .status(400)
      .json({ message: "PIN already set. Use /change-pin to update it." });
  }

  const pinHash = await bcrypt.hash(pin, SALT_ROUNDS);
  user.pinHash = pinHash;
  user.isPinSet = true;
  await user.save();
  return res.status(201).json({ message: "Pin has been set successfully" });
};

const changePin = async (req, res) => {
  try {
    const { oldPin, newPin, confirmNewPin } = req.body;
    const SALT_ROUNDS = 10;

    // Validate required fields
    if (!oldPin || !newPin || !confirmNewPin) {
      return res.status(422).json({ message: "All fields are required" });
    }

    // Validate PIN lengths
    if ([oldPin, newPin, confirmNewPin].some((pin) => pin.length !== 6)) {
      return res
        .status(400)
        .json({ message: "PIN must be exactly 6 digits long" });
    }

    // Check for same old and new PIN
    if (oldPin === newPin) {
      return res
        .status(400)
        .json({ message: "New PIN must be different from the old PIN" });
    }

    // Check if new PINs match
    if (newPin !== confirmNewPin) {
      return res
        .status(400)
        .json({ message: "New PIN and confirm Pin  do not match" });
    }

    // Find user
    const user = await User.findOne({ email: req.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check old PIN
    const isMatch = await bcrypt.compare(oldPin, user.pinHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old PIN" });
    }

    // Hash and save new PIN
    user.pinHash = await bcrypt.hash(newPin, SALT_ROUNDS);
    await user.save();

    res.status(200).json({ message: "PIN changed successfully" });
  } catch (error) {
    console.error("Change PIN Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const SALT_ROUNDS = 10;

    // Validate required fields
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(422).json({ message: "All fields are required" });
    }

    // Optional: Enforce minimum password length or strength here
    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "New password must be at least 8 characters long" });
    }

    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({
          message: "New password and confirmation password do not match",
        });
    }

    if (newPassword === oldPassword) {
      return res
        .status(400)
        .json({
          message: "New password must be different from the old password",
        });
    }

    // Find user
    const user = await User.findOne({ email: req.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    // Hash and save new password
    user.password = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = {
  LoginUser,
  createNewUser,
  createNewCustomer,
  userInformation,
  allUsers,
  updateUser,
  LogoutUser,
  createPin,
  changePin,
  changePassword,
};
