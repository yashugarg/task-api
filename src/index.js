const express = require("express");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const connectDB = require("./utils/db");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const routes = require("./routes");

dotenv.config({ path: "./src/config/.env" });
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task API",
      version: "1.0.0",
      description: "Task API Documentation",
      contact: {
        name: "Yashu Garg",
      },
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./src/routes/*.js", "./src/models/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

connectDB();

try {
  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
} catch (error) {
  console.log(error, 61);
}

app.use("/auth", routes.auth);
app.use("/wallet", routes.wallet);
