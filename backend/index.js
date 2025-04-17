import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import booksRoute from './routes/bookRoute.js'

dotenv.config()
const app = express();

app.use(express.json())
app.use(cors())
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))

app.get('/', (req, res) => {
    console.log(req)
    return res.status(201).send("Welcome to MERN stack")
})

app.use('/books', booksRoute)

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