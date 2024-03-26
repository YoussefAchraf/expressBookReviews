// index.js

const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

// Set up session middleware
app.use("/customer", session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
}));

// Authentication middleware using session
app.use("/customer/auth/*", function auth(req, res, next) {
    if (!req.session || !req.session.authenticated) {
        return res.status(401).json({ message: "Unauthorized: Session not authenticated" });
    }
    next();
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
