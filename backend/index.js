import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRouter from "./routes/booksRoute.js";
import cors from "cors";    

const app = express();

app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin: "http://localhost:5555",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"]
// }));

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use('/books', booksRouter);

mongoose.set("strictQuery", false);
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    })
    .catch((error) => {
        console.log(error);
    });   