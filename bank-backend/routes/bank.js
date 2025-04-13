const express = require('express');
const router = express.Router();
const Auth = require("../middleware/auth");
const bankController = require("../controller/bank");

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
 *               typeOfBank:
 *                 type: string
 *               bankCountry:
 *                 type: string
 *               bankName:
 *                 type: string
 *               accountName:
 *                 type: string
 *               accountNumber:
 *                 type: string
 *               swiftCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Bank detail added successfully
 *       500:
 *         description: Server error
 */
router.post('/add-bank-detail', Auth.AuthenticateToken, bankController.addBankDetail);

/**
 * @swagger
 * /bank/all-bank-details:
 *   get:
 *     summary: Get all bank details for a user
 *     description: Retrieve all bank details associated with a user.
 *     operationId: GetBankDetails
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Bank details fetched successfully
 *       404:
 *         description: No bank details found
 */
router.get('/all-bank-details', Auth.AuthenticateToken, bankController.getUserBankDetails);

/**
 * @swagger
 * /bank/delete-bank-detail:
 *   delete:
 *     summary: Delete a specific bank detail
 *     description: Deletes a specific bank detail for a user.
 *     operationId: DeleteBankDetail
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               detailId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Bank detail deleted successfully
 *       404:
 *         description: Bank detail not found
 */
router.delete('/delete-bank-detail', Auth.AuthenticateToken, bankController.deleteBankDetail);

/**
 * @swagger
 * /bank/update-bank-detail:
 *   patch:
 *     summary: Update a specific bank detail
 *     description: Updates a specific bank detail for a user.
 *     operationId: UpdateBankDetail
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - updateData
 *             properties:
 *               detailId:
 *                 type: string
 *               updateData:
 *                 type: object
 *     responses:
 *       200:
 *         description: Bank detail updated successfully
 *       404:
 *         description: Bank detail not found
 */
router.patch('/update-bank-detail', Auth.AuthenticateToken, bankController.updateBankDetail);

module.exports = router;
