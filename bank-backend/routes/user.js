const express = require("express");
const router = express.Router();
const User = require("../controller/User");
const Auth = require("../middleware/auth");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user with the provided details.
 *     operationId: RegisterUser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - email
 *               - password
 *               - firstname
 *               - lastname
 *             properties:
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User successfully registered."
 *       422:
 *         description: Missing required fields or duplicate email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation failed. Missing fields or duplicate email."
 *       500:
 *         description: Server error occurred
 */
router.post("/signup", User.createNewUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     description: Login a user into the system.
 *     operationId: LoginUser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully logged in"
 *       400:
 *         description: Incorrect credentials entered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Incorrect credentials."
 *       500:
 *         description: Server error occurred
 */
router.post("/login", User.LoginUser);

/**
 * @swagger
 * /user/user-info:
 *   get:
 *     summary: Get a single user's information
 *     description: Returns a single user's information
 *     operationId: GetUserInformation
 *     responses:
 *       200:
 *         description: User info retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error occurred
 */
router.get("/user-info", Auth.AuthenticateToken, User.userInformation);

/**
 * @swagger
 * /user/users:
 *   get:
 *     summary: Get a list of users
 *     description: Returns a list of all users
 *     operationId: GetAllUsers
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admins only
 *       500:
 *         description: Server error occurred
 */
router.get("/users", Auth.AuthenticateToken, Auth.AdminRoutes, User.allUsers);

/**
 * @swagger
 * /user/user-info:
 *   patch:
 *     summary: Update user information
 *     description: Updates user data based on provided fields
 *     operationId: UpdateUser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - updateFields
 *             properties:
 *               userId:
 *                 type: string
 *               updateFields:
 *                 type: object
 *                 additionalProperties: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error occurred
 */
router.patch("/user-info", Auth.AuthenticateToken, User.updateUser);

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Logout a user
 *     description: Logs out the user by clearing the session or token.
 *     operationId: LogOut
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: Server error occurred
 */
router.post("/logout", User.LogoutUser);

/**
 * @swagger
 * /user/create-pin:
 *   post:
 *     summary: Set a new user PIN
 *     description: Sets a new PIN for the user if not already set.
 *     operationId: CreatePin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pin
 *             properties:
 *               pin:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: PIN set successfully.
 *       400:
 *         description: Invalid PIN input or PIN already set.
 *       404:
 *         description: User not found.
 *       422:
 *         description: PIN is required or PIN length should be 6 digits.
 *       500:
 *         description: Server error occurred.
 */
router.post("/create-pin", Auth.AuthenticateToken, User.createPin);

/**
 * @swagger
 * /user/change-pin:
 *   patch:
 *     summary: Change user PIN
 *     description: Changes an existing user's PIN.
 *     operationId: ChangePin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPin
 *               - newPin
 *               - confirmNewPin
 *             properties:
 *               oldPin:
 *                 type: string
 *                 example: "123456"
 *               newPin:
 *                 type: string
 *                 example: "654321"
 *               confirmNewPin:
 *                 type: string
 *                 example: "654321"
 *     responses:
 *       200:
 *         description: PIN updated successfully.
 *       400:
 *         description: Invalid input or PIN mismatch.
 *       401:
 *         description: Incorrect old PIN.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error occurred.
 */
router.patch("/change-pin", Auth.AuthenticateToken, User.changePin);

/**
 * @swagger
 * /user/change-password:
 *   patch:
 *     summary: Change user password
 *     description: Changes the user's password.
 *     operationId: ChangePassword
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *               - confirmNewPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: "oldPassword123"
 *               newPassword:
 *                 type: string
 *                 example: "newPassword456"
 *               confirmNewPassword:
 *                 type: string
 *                 example: "newPassword456"
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       400:
 *         description: Invalid input or passwords do not match.
 *       401:
 *         description: Incorrect old password.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error occurred.
 */
router.patch("/change-password", Auth.AuthenticateToken, User.changePassword);


module.exports = router;
