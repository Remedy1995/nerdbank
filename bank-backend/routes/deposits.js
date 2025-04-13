const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const  deposit = require('../controller/Deposits');
const Auth = require('../middleware/auth');

/**
 * @swagger
 * /deposits/deposits:
 *   post:
 *     summary: Create a new Deposit
 *     description: Adds a new Deposit to the system.
 *     operationId: CreateDeposits
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiverAccount:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     accountName:
 *                       type: string
 *                     accountBankName:
 *                        type: string
 *                     accountNumber:
 *                       type : string
 *                     accountType:
 *                       type: string
 *                     accountBankRoutingTransitNumber:
 *                       type: string
 *                     accountBankSwiftCode:
 *                       type: string
 *                   required:
 *                     - accountName
 *                     - accountBankName
 *               senderAccount:
 *                 type: string
 *               amount:
 *                 type: number
 *               transferType:
 *                 type: string
 *               descriptionOfTransfer:
 *                 type: string
 *               transferStatus:
 *                 type: string
 *     responses:
 *       201:
 *         description: Deposit created successfully
 *       500:
 *         description: Server error
 */

router.post('/deposits',Auth.AuthenticateToken, deposit.makeDeposits);


/**
 * @swagger
 * /deposits/deposits:
 *   get:
 *     summary: Get all Deposits
 *     description: Returns a list of Deposits
 *     operationId: GetDeposits
 *     responses:
 *       200:
 *         description: A JSON array of Deposits
 */
router.get('/deposits',Auth.AuthenticateToken, deposit.allDeposits)

/**
 * @swagger
 * /deposits/user-deposits-info:
 *   get:
 *     summary: Get single Deposits data
 *     description: Returns a single user transfer info
 *     operationId: GetSingleDepositsInfo
 *     responses:
 *       200:
 *         description: A JSON array of Deposits
 */

router.get('/user-deposits-info',Auth.AuthenticateToken, deposit.allUserDeposits)

module.exports = router;