const express = require('express');
const router = express.Router();
const Auth = require("../middleware/auth");
const cardController = require("../controller/Card");

/**
 * @swagger
 * /card/add-card-detail:
 *   post:
 *     summary: Add a new card detail
 *     description: Adds a new card detail to the user's profile.
 *     operationId: AddCardDetail
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               card:
 *                 type: string
 *               cardType:
 *                 type: string
 *               cardNumber:
 *                 type: string
 *               expiryDate:
 *                 type: string
 *               cvv:
 *                 type: string
 *               cardHolderName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Card detail added successfully
 *       500:
 *         description: Server error
 */
router.post('/add-card-detail', Auth.AuthenticateToken, cardController.addCardDetail);

/**
 * @swagger
 * /card/all-card-details:
 *   get:
 *     summary: Get all card details for a user
 *     description: Retrieve all card details associated with a user.
 *     operationId: GetCardDetails
 *     responses:
 *       200:
 *         description: Card details fetched successfully
 *       404:
 *         description: No card details found
 */
router.get('/all-card-details', Auth.AuthenticateToken, cardController.getUserCardDetails);

/**
 * @swagger
 * /card/delete-card-detail:
 *   delete:
 *     summary: Delete a specific card detail
 *     description: Deletes a specific card detail for a user.
 *     operationId: DeleteCardDetail
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
 *         description: Card detail deleted successfully
 *       404:
 *         description: Card detail not found
 */
router.delete('/delete-card-detail', Auth.AuthenticateToken, cardController.deleteCardDetail);

/**
 * @swagger
 * /card/update-card-detail:
 *   patch:
 *     summary: Update a specific card detail
 *     description: Updates a specific card detail for a user.
 *     operationId: UpdateCardDetail
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
 *         description: Card detail updated successfully
 *       404:
 *         description: Card detail not found
 */
router.patch('/update-card-detail', Auth.AuthenticateToken, cardController.updateCardDetail);

module.exports = router;
