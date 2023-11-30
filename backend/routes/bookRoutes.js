import express from 'express';
import { Book } from '../models/bookModels.js';

const router = express.Router()


//route to save new book
router.post('/',async (req,res) =>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({message : ' send all required fields'});
        };
        const newBook = {
            title : req.body.title,
            author : req.body.author,
            publishYear : req.body.publishYear
        };
        const book = await Book.create(newBook);

        return res.status(201).send(book)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send({message : error.message})
    }
});

// route to get all books from database
router.get('/', async (req,res) =>{
    try{
        const books = await Book.find({});

        return res.status(200).json(
            {
                count : books.length,
                data : books
            }
        )
    }
    catch(error){
        console.log(error.message)
        res.status(500).send({message : error.message})
    };
});

// route to get one books from database
router.get('/:id', async (req,res) =>{
    try{
        const {id} = req.params
       
        const book = await Book.findById(id);

        return res.status(200).json(book)
    }
    catch(error){
        console.log(error.message)
        res.status(500).send({message : error.message})
    };
});

//route to update a book
router.put('/:id', async (req,res) =>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({message : ' send all required fields'});
        };
        
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id,req.body)
        
        if(!result) {
            return res.status(404).send({message :"book not found"})
        };

        return res.status(200).json({message : "book found and updated successfully"})
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
});

//route to delete a book
router.delete('/:id', async (req,res) =>{
    try{    const {id} = req.params

    const del = await Book.findByIdAndDelete(id);
    if(!del){
        return res.status(404).json({message: "does not exist"})
    };
    return res.status(200).json({message : "deleted"})
}
catch (error){
    console.log(error.message);
    res.status(500).send({message:error.message})
}

});

export default router;
