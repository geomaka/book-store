import express from "express";
import {port,mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes.js'
import cors from 'cors'

const app = express();

//middleware for parsing  request body
app.use(express.json())
app.use(cors());
app.use('/books',bookRoutes)


app.get('/',(req,res)=>{
    return res.status(234).send('welcome to mern stack')
});


mongoose.connect(mongoDBURL)
.then(() =>{
    console.log('App connected to the database');
    app.listen(port,() =>{
        console.log(`App is running on port ${port}`);
    });
})
.catch((error) =>{
    console.log(error)
});
