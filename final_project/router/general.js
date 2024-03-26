// general.js

const express = require('express');
const axios = require('axios'); // Import Axios for making HTTP requests

const public_users = express.Router();

// Function to fetch book data using Axios with Promise callbacks
const fetchBooks = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/books')
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

// Function to fetch book details based on ISBN using Axios with Promise callbacks
const fetchBookByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/books/isbn/${isbn}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

// Function to fetch book details based on Author using Axios with Promise callbacks
const fetchBooksByAuthor = (author) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/books/author/${author}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

// Function to fetch book details based on Title using Axios with Promise callbacks
const fetchBooksByTitle = (title) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/books/title/${title}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

// Get the book list available in the shop using async-await with Axios
public_users.get('/', async function (req, res) {
    try {
        const books = await fetchBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get book details based on ISBN using async-await with Axios
public_users.get('/isbn/:isbn', async function (req, res) {
    const { isbn } = req.params;
    try {
        const book = await fetchBookByISBN(isbn);
        res.json(book);
    } catch (error) {
        res.status(404).json({ message: "Book not found" });
    }
});

// Get book details based on author using async-await with Axios
public_users.get('/author/:author', async function (req, res) {
    const { author } = req.params;
    try {
        const books = await fetchBooksByAuthor(author);
        if (books.length > 0) {
            res.json(books);
        } else {
            res.status(404).json({ message: "No books found by this author" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get book details based on title using async-await with Axios
public_users.get('/title/:title', async function (req, res) {
    const { title } = req.params;
    try {
        const books = await fetchBooksByTitle(title);
        if (books.length > 0) {
            res.json(books);
        } else {
            res.status(404).json({ message: "No books found with this title" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports.general = public_users;
