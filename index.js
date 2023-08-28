const express = require('express')
const mongoose = require('mongoose')
const PostModel=require("./models/Post")
const cors=require('cors')
const app = express()
mongoose
    .connect('mongodb+srv://admin:admin@cluster0.nsqbqhy.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

app.use(express.json())
app.use(cors())
app.post('/todo/add',async(req,res)=>{
try{
const post =new PostModel({
    title:req.body.title
})
await post.save()
res.status(201).send(post)
}catch(err){
    res.status(400).send(err)
}
})

app.patch('/todo/update/:id',async (req,res)=>{
    try{
        const postId =req.params.id
        await PostModel.updateOne(
            {_id:postId},
            {title:req.body.title}
        )
        res.json({
            message:"Успешно обновлено"

        })
        }catch(err){
            res.status(500).json({
                message:"Не удалось обновить"
            })
        }
})


app.delete('/todo/delete/:id',async (req,res)=>{
    try{
        await PostModel.findByIdAndDelete(
            {_id:req.params.id},
        )
        res.json({
            message:"Успешно удалено"

        })
        }catch(err){
           console.log(err);
        }
})
 
app.get('/todo',async (req,res)=>{
    try{
        const post=await PostModel.find()
        res.json(post)
        }catch(err){
           console.log(err); 
        }
})



// htt://localhost:8888/todo/add






const PORT = 8888 

app.listen(PORT, () => {
    console.log(`Server listenig on port ${PORT}`);
})