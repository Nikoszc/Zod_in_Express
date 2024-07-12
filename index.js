const express = require("express");
const zod = require("zod")
//Zod basialy used for better input validations.
const fs = require("fs")
const app = express();
const port = 3000;

// const schema = zod.array(zod.number()); //It implies that out input from the user is going to be an array of numbers. Kidneys = [1,2]
    //Also in Zod there is a weird way of writing or and nested things(arrays,objects etc.)
// EXAMPLE:
// how will you write an array = {
//      email : string => string
//      password : string => atleast 8 charecters.
//      country : "IN","US" (fixed input).
//      kidneys : [1,2]

// const schema = zod.object({
//     email: zod.string,
//     password : zod.string,
//     country : zod.literal("IN").or(zod.literal("US")),
//     kidneys : zod.array(zod.number());
// })
const schema = zod.object({
        email: zod.string().email(),
        password : zod.string(),
        kidneys : zod.array(zod.number())
    })




app.use(express.json())


app.post('/health',(req,res)=>{
    const input = req.body
    // const kidneysLength = kidneys.length;
    const resposne = schema.safeParse(input)
    if(!resposne.success){
        res.status(411).json({
            msg:"Input is invalid."
        })
    }else{
        res.send({
            resposne
        })
    
    }
    
    // res.send("You have " + kidneysLength + " kidneys")

});
//global catches : Error handling middleware bz of 4 arguments and err argument used in the funcction.
//Look up! HK said used less. Generally called at the end of the code when nothing is executed.
// app.use(function(err,req,res,next){
//     res.json({
//         msg:"there is an error with our server."
//     })
// })


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

