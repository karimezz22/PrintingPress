const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./config/database");
const accessLogger = require("./middleware/accessLogging");
const errorLogger = require("./middleware/errorLogging");
dotenv.config({ path: "config/config.env" });

// connect with DB
dbConnection();

// Load environment variables
dotenv.config({ path: "config/config.env" });

// Express app
const app = express();

// Using morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Using logging
app.use(accessLogger);
app.use(errorLogger);

// Middleware
app.use(express.json());

// Test 
app.get("/", (req, res) => {
  res.send("our API v3");
});

// Routes
const auth = require("./routes/authRoutes");
const product = require("./routes/productRoutes");
const order = require("./routes/orderRoutes");

app.use("/auth", auth);
app.use("/products", product);
app.use("/orders", order);

// Server listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
