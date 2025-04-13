const express = require('express');
const router = express.Router();
const Auth = require("../middleware/auth");
const Verify = require("../controller/VerifyPin");


/**
 * @swagger
 * /bank/add-bank-detail:
 *   post:
 *     summary: Add new bank detail
 *     description: Adds a new bank detail to the user's profile.
 *     operationId: AddBankDetail
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userPin:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pin Changed Successfully
 *       400:
 *         description
 *       500:
 *         description: Server error
 */
router.post('/verify-bank-pin',Auth.AuthenticateToken, Verify.VerifyBankPin);

module.exports = router;