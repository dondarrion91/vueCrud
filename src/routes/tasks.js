const express = require("express");

const router = express.Router();

// models
const Task = require("../models/Task");

module.exports = () => {

    router.get('/', async(req,res) => {
        try{
            const Tasks = await Task.find();
            res.json(Tasks);
        }catch(error){            
            console.log(error);
            res.json(error);
        }        
    });

    router.get('/:id', async(req,res) => {
        try{
            const task = await Task.findById(req.params.id);
            res.json(task);
        }catch(error){            
            console.log(error);
            res.json(error);
        }        
    });

    router.post('/',async(req,res) => {
        try{
            const newTask = new Task(req.body);
            await newTask.save();
            res.json({
                status: "Tarea guardada"
            });
        }catch(error){
            console.log(error);
            res.json(error);
        }
    });

    router.put('/:id',async(req,res)=> {
        try{
            await Task.findByIdAndUpdate(req.params.id,req.body);
            res.json({
                status: "Updated"
            });
        }catch(error){
            console.log(error);
            res.json(error);
        }
    });

    router.delete('/:id',async(req,res)=> {
        try{
            await Task.findByIdAndRemove(req.params.id);
            res.json({
                status: "Deleted"
            });
        }catch(error){
            console.log(error);
            res.json(error);
        }
    });
    
    return router;
}