const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function getAllBooks() {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}

async function getBooksByISBN(isbn) {
    try {
        const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}

async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(
            `${BASE_URL}/author/${encodeURIComponent(author)}`
        );
        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}

async function getBooksByTitle(title) {
    try {
        const response = await axios.get(
            `${BASE_URL}/title/${encodeURIComponent(title)}`
        );
        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}

async function getBookReview(isbn) {
    try {
        const response = await axios.get(`${BASE_URL}/review/${isbn}`);
        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getAllBooks,
    getBooksByISBN,
    getBooksByAuthor,
    getBooksByTitle,
    getBookReview
};
