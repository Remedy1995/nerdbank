const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const accounts = require("../controller/Accounts");
const Auth = require("../middleware/auth");


/**
 * @swagger
 * /accounts/accounts:
 *   post:
 *     summary: Create a new account
 *     description: Adds a new account to the system.
 *     operationId: Createaccounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              accountName:
 *                 type: string
 *              accountType:
 *                 type: string
 *              accountPin:
 *                 type: string
 *              accountBankName:
 *                 type: string
 *              accountBankSwiftCode:
 *                 type: string
 *              accountBankRoutingTransitNumber:
 *                  type: string
 *              accountNumber:
 *                  type: string
 *              accountBalance:
 *                  type: string
 *              accountStatus:
 *                 type: string
 *     responses:
 *       201:
 *         description: accounts created successfully
 *       500:
 *         description: Server error
 */
//create account by admins
router.post('/accounts', Auth.AuthenticateToken, Auth.AdminRoutes, accounts.createAccount);


/**
 * @swagger
 * /accounts/accounts:
 *   get:
 *     summary: Get all accounts
 *     description: Returns a list of accounts
 *     operationId: Getaccounts
 *     responses:
 *       200:
 *         description: A JSON array of accounts
 */

router.get('/accounts', Auth.AuthenticateToken, Auth.AdminRoutes, accounts.allAccounts)



/**
 * @swagger
 * /accounts/account-info:
 *   get:
 *     summary: Get a specific account
 *     description: Returns a specific account
 *     operationId: GetSingleAccount
 *     responses:
 *       200:
 *         description: A specific Account Information
 */
router.get('/account-info',Auth.AuthenticateToken,accounts.AccountInformation);


/**
 * @swagger
 * /accounts/account-info:
 *   patch:
 *     summary: Update account information
 *     description: Updates account data based on provided fields
 *     operationId: UpdateAccount
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user to update
 *               updateFields:
 *                 type: object
 *                 additionalProperties: true
 *                 description: Fields to update
 *     responses:
 *       200:
 *         description: Account updated successfully
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal server error
 */
router.patch('/account-info',Auth.AuthenticateToken,Auth.AdminRoutes,accounts.UpdateAccounts );
module.exports = router;