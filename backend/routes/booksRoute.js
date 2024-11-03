import express from "express";
import { Books } from "../models/bookModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const books = await Books.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;  
        const book = await Books.findById(id);
        if (!book) {
            return res.status(404).send({message: "Book not found"});
        }   
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

router.post("/", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.genre || !req.body.publicationYear) {
            return res.status(400).send({
                message: "Send all required fields: title, author, genre, publicationYear",
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publicationYear: req.body.publicationYear,
        };

        const book = await Books.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

router.put("/:id", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.genre || !req.body.publicationYear) {
            return res.status(400).send({
                message: "Send all required fields: title, author, genre, publicationYear",
            });
        }
        const { id } = req.params;
        const book = await Books.findByIdAndUpdate(id, req.body);

        if (!book) {
            return res.status(404).send("Book not found");
        }
        return res.status(200).json({
            book
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Books.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).send("Book not found");
        }
        return res.status(200).send({ message: "Book deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})





export default router;


