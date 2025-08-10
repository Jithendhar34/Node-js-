const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "API documentation for E-commerce project",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./Serverr.js"], // where Swagger will read API docs from
};

const swaggerSpec = swaggerJsDoc(options);
module.exports = swaggerSpec;
