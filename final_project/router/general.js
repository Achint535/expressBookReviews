const express = require('express');
const public_users = express.Router();

const books = require('./booksdb.js');

public_users.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    const users = require("./auth_users.js").users;

    if (users.some(user => user.username === username)) {
        return res.status(409).json({
            message: "User already exists"
        });
    }

    users.push({
        username: username,
        password: password
    });

    return res.status(200).json({
        message: "User successfully registered"
    });
});

public_users.get('/', (req, res) => {
    return res.status(200).json(books);
});

public_users.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    if (books[isbn]) {
        return res.status(200).json(books[isbn]);
    }

    return res.status(404).json({
        message: "Book not found"
    });
});

public_users.get('/author/:author', (req, res) => {
    const author = req.params.author;

    const result = Object.values(books).filter(
        book => book.author.toLowerCase() === author.toLowerCase()
    );

    if (result.length > 0) {
        return res.status(200).json(result);
    }

    return res.status(404).json({
        message: "Books by this author not found"
    });
});

public_users.get('/title/:title', (req, res) => {
    const title = req.params.title;

    const result = Object.values(books).filter(
        book => book.title.toLowerCase() === title.toLowerCase()
    );

    if (result.length > 0) {
        return res.status(200).json(result);
    }

    return res.status(404).json({
        message: "Book with this title not found"
    });
});

public_users.get('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    if (books[isbn]) {
        return res.status(200).json(books[isbn].reviews);
    }

    return res.status(404).json({
        message: "Book not found"
    });
});

module.exports.general = public_users;
