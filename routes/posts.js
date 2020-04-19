const express=require('express');

const router=express.Router();
//fetch posts
const Post= require('../models/post');
router.get('/', async(req,res)=>{
    try{
        const posts=await Post.find();
        res.json(posts);
    }catch(err){

        res.json({message:err});
    }
    
    });

 /*   router.get('/gossip', (req,res)=>{
        res.send('here comes the grapevine');

    });
*/
/*
//show when the body postman is sent
router.post('/',(req,res)=>{
console.log(req.body);
});
*/

//capture the post sent and save
router.post('/', async (req,res)=>{
const post=new Post({
title:req.body.title,
description:req.body.description

});

try{
const savedPost=await post.save();
res.json(savedPost);
}catch(err){
    res.json({message:err});
}
//longer version
/*post.save()
//to return a promise
.then(data=>{
res.json(data);

})
.catch(err=>{
    res.json({message:err});
});*/
});
//delete post
router.delete('/:postId',async(req,res)=>{
try{
const deletedPost=await Post.remove({_id:req.params.postId});
res.json(deletedPost);
}catch(err){
res.json({message:err})

}
});

//get specific post
router.get('/:postId',async(req,res)=>{
    try{
const post=await Post.findById(req.params.postId);
res.json(post);}catch(err){
res.json({message: err});
}

});

//update post

router.patch('/:postId',async(req,res)=>{
    try{
const updatedPost=await Post.updateOne({_id:req.params.postId},
    {$set:{title:req.body.title}});
    res.json(updatedPost);

    }catch(err){

res.json({message:err});
    };
});
    module.exports=router;