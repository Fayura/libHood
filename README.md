# libHood API endpoints

## book endpoints

### 1. GET 127.0.0.1:5000/books

This Returns All The books in the library

### 2. POST 127.0.0.1:5000/books/add

this add a book to the library

> Content-Type: application/json
>
> `{ title: "", author: "", owner:"", reader:"", }`

### 3. GET 127.0.0.1:5000/books/:id

this returns a book with given id

### 4. PUT 127.0.0.1:5000/books/:id

this updates a book with given id

> Content-Type: application/json
>
> ` { title: "", author: "", owner:"", reader:"", }`

### 5. DELETE 127.0.0.1:5000/books/:id

this deletes a book with a given id

---

## Check Out ./.rest for examples

---
