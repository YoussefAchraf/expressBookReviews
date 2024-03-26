const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const books = require("./booksdb.js");

const regd_users = express.Router();

// Set up session middleware
regd_users.use(session({
    secret: 'Secretly123',
    resave: true,
    saveUninitialized: true
}));

// Login route
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ username }, "Secretly123", { expiresIn: "1h" });
    req.session.authenticated = true;
    req.session.username = username;
    return res.json({ token });
});

// Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { review } = req.query;
    const username = req.session.username;
    if (!review) {
        return res.status(400).json({ message: "Review is required" });
    }
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }
    if (books[isbn].reviews && books[isbn].reviews[username]) {
        books[isbn].reviews[username] = review;
    } else {
        if (!books[isbn].reviews) {
            books[isbn].reviews = {};
        }
        books[isbn].reviews[username] = review;
    }
    return res.json({ message: "Review added/modified successfully" });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const username = req.session.username;
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }
    if (!books[isbn].reviews || !books[isbn].reviews[username]) {
        return res.status(404).json({ message: "Review not found" });
    }
    delete books[isbn].reviews[username];
    return res.json({ message: "Review deleted successfully" });
});

// Define the users array
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    // Add more users as needed
];

module.exports = {
    authenticated: regd_users,
    users: users
};
