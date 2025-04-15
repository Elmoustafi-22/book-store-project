import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Book from './models/bookModel.js';

dotenv.config()

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    console.log(req)
    return res.status(201).send("Welcome to MERN stack")
})

app.post('/books', async (request, response) => {
    try {
        const { title, author, publishYear } = request.body;

        if(!title || !author || !publishYear) {
            return response.status(400).send({
                success: false,
                message: "Send all required fields: title, author, publishYear"
            })
        }

        const newBook = {
            title,
            author,
            publishYear
        }

        const book = await Book.create(newBook);

        return response.status(201).send(book)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`)
})


const MONGO_URI = process.env.MONGO_URI;
mongoose
.connect(MONGO_URI, {
    dbName: 'book-store',
    bufferCommands: true,
})
.then(() => {
    console.log('App connected to database!');
})
.catch((error) => {
    console.log(error);
})