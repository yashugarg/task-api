const express = require("express");
const router = express.Router();
const controllers = require("../controllers/Auth");

/**
 * @swagger
 * /auth/register:
 *  post:
 *   description: Use to request to register a user
 *   tags:
 *    - Auth
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/User'
 *   responses:
 *    '200':
 *     description: A successful response returning the userId of registered User
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         data:
 *          type: object
 *          properties:
 *           userId:
 *            type: string
 *            description: The id of the registered user
 *        example:
 *         data:
 *          userId: 60a1c1c3b8b5f8a0b8b0b0b0
 *    '400':
 *     description: A bad request
 *    '500':
 *     description: A server error
 */
router.route("/register").post(controllers.registerUser);

/**
 * @swagger
 * /auth/login:
 *  post:
 *   description: Use to request to login a user
 *   tags:
 *    - Auth
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        username:
 *         type: string
 *         description: The username of the user
 *         required: true
 *        password:
 *         type: string
 *         description: The password of the user
 *         required: true
 *       example:
 *        username: yashugarg
 *        password: 12345678
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
 *            token:
 *             type: string
 *             description: The JWT token
 *         example:
 *          data:
 *            token: eyJhbGciOiJIUzI1NiIsInR5kpXVCJ9.eyJ1c2VyI7InVzZXwZDyIsInVzZXJuYW1lIjoiYXNkIn0sImlhdCI6MTY2ODg1Mzg4MX0.WdXQ7K_I3ku9SPmZCCwJs_594zxe
 *    '400':
 *     description: A bad request
 *    '500':
 *     description: A server error
 */
router.route("/login").post(controllers.loginUser);

module.exports = router;
