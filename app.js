const express=require('express');
const app=express();
const mongooose=require('mongoose');
const bodyParser=require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

//middleware
/*
app.use('/posts', ()=>{
console.log('we are in the middleware');

});*/
//import routes -using middleWARE
const postsRoute=require('./routes/posts');
const usersRoute=require('./routes/users');
app.use('/posts', postsRoute);
app.use('/users',usersRoute);


//routes
app.get('/' , (req,res)=>
{
res.send("welcome home");

}
);


//connect to db
mongooose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true } ,()=>
{
    console.log('mongoose is running');
}
);

//app.listen(3000)
const server=app.listen(3000, ()=>{
console.log('listening on port 3000');

});
 