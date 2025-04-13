const express = require('express');
const router = express.Router();
const transfers = require('../controller/Transfers');
const Auth = require("../middleware/auth");

/**
 * @swagger
 * /transfers/transfers:
 *   post:
 *     summary: Create a new transfer
 *     description: Adds a new transfer to the system.
 *     operationId: CreateTransfers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              receiverAccount:
 *                 type : string
 *              senderAccount:
 *                 type : string 
 *              amount:
 *                 type: number
 *              transferType:
 *                 type: string
 *              descriptionOfTransfer:
 *                 type: string
 *              transferStatus:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transfer created successfully
 *       500:
 *         description: Server error
 */

router.post('/transfers',Auth.AuthenticateToken, transfers.createTransfer);


/**
 * @swagger
 * /transfers/transfers:
 *   get:
 *     summary: Get all transfers
 *     description: Returns a list of transfers
 *     operationId: GetTransfers
 *     responses:
 *       200:
 *         description: A JSON array of transfers
 */
router.get('/transfers',Auth.AuthenticateToken, transfers.allTransfers)

/**
 * @swagger
 * /transfers/user-transfers-info:
 *   get:
 *     summary: Get single transfers data
 *     description: Returns a single user transfer info
 *     operationId: GetSingleTransfersInfo
 *     responses:
 *       200:
 *         description: A JSON array of transfers
 */

router.get('/user-transfers-info',Auth.AuthenticateToken, transfers.allUserTransfers)

module.exports = router;