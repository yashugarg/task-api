const express = require("express");
const helpers = require("../utils/decrypt");
const router = express.Router();
const controllers = require("../controllers/Wallet");

/**
 * @swagger
 * /wallet/balance:
 *  get:
 *   description: Use to request to get balance of a user
 *   tags:
 *    - Wallet
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    '200':
 *     description: A successful response
 *     content:
 *      application/json:
 *       schema:
 *         type: object
 *         properties:
 *          data:
 *           type: object
 *           properties:
 *            balance:
 *             type: number
 *             description: Balance of the user
 *         example:
 *          data:
 *           balance: 100
 *    '400':
 *     description: A bad request
 *    '500':
 *     description: A server error
 */
router.route("/balance").get(helpers.authorize, controllers.getBalance);

/**
 * @swagger
 * /wallet/transfer:
 *  post:
 *   description: Use to request to transfer money to another user
 *   tags:
 *    - Wallet
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Transfer'
 *   responses:
 *    '200':
 *     description: A successful response returning created transaction
 *     content:
 *      application/json:
 *       schema:
 *        example:
 *         data:
 *          _id: 60a1c1c3b8b5f8a0b8b0b0b0
 *          amount: 100
 *          sourceAccount: 60e1c1b0b0b5a0a0b0b0b0b0
 *          destinationAccount: 60e1c1b0b0b5a0a0b0b0b0b1
 *          createdAt: 2021-05-18T12:00:00.000Z
 *          updatedAt: 2021-05-18T12:00:00.000Z
 *    '400':
 *     description: A bad request
 *    '500':
 *     description: A server error
 */
router.route("/transfer").post(helpers.authorize, controllers.transfer);

module.exports = router;
