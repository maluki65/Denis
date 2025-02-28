const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./Routes/authRoute");

const app = express();

//On creating middlewares
app.use(cors());
app.use(express.json());

//On creating routes
app.use("/api/auth", authRouter);

//On connecting db
mongoose.connect("mongodb://localhost:27017/Authentication")
.then(() => console.log("Connected to Database!"))
.catch((error) => console.error("Failed to connet to Database:", error));

//On creating global error-handlers
app.use ((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

// On initializing server-side
const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`App is running on ${PORT}`);
});