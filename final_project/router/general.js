const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  // Check if both username and password are provided
  if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
        // Add the new user to the users array
        users.push({"username": username, "password": password});
        return res.status(200).json({message: "Customer successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "Customer already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //Write your code here
    let getAllBooks = new Promise((resolve,reject)=>{
      setTimeout(()=>{
          resolve(books);    
      },1000)
    })
  
    getAllBooks.then((success) => {
      res.send(success);
    })

    //   res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let getDetailsISBN = new Promise((resolve,reject)=>{
    let isbn = req.params.isbn;
    setTimeout(()=>{
        resolve(books[isbn]);    
    },1000)
  })

  getDetailsISBN.then((success) => {
    res.send(success);
  })
  //   const isbn = req.params.isbn;
  //   res.send(books[isbn]);
});

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let getBooksByAuthor = new Promise((resolve,reject)=>{
    const author = req.params.author;
    const booksByAuthor = Object.entries(books)
    .filter(([key, book]) => book.author === author)
    .map(([key, book]) => ({ isbn: key, ...book }));
  
    setTimeout(()=>{
        resolve(booksByAuthor);    
    },1000)
  })

  getBooksByAuthor.then((success) => {
    res.send(success);
  })
  //   const author = req.params.author;
  //   const booksByAuthor = Object.entries(books)
  //   .filter(([key, book]) => book.author === author)
  //   .map(([key, book]) => ({ isbn: key, ...book }));
  //   return res.status(200).json(booksByAuthor);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let getBooksByTitle = new Promise((resolve,reject)=>{
    const title = req.params.title;
    const booksByTitle = Object.entries(books)
    .filter(([key, book]) => book.title === title)
    .map(([key, book]) => ({ isbn: key, ...book }));
  
    setTimeout(()=>{
        resolve(booksByTitle);    
    },1000)
  })

  getBooksByTitle.then((success) => {
    res.send(success);
  })
  //   const title = req.params.title;
  //   const booksByTitle = Object.values(books).filter(book => book.title === title);
  //   return res.status(200).json(booksByTitle);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  const book = books[isbn];
  return res.status(200).json(book.reviews);
});

module.exports.general = public_users;
