const express= require('express');
const app= express();
const PORT=process.env.PORT || 8080;
const mongoDBConnection=require('./db')
mongoDBConnection();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept"
    )
    next()
}
)

app.get('/',(req,res)=>{
    return res.send({
        status:200,
        message:"get request is working"
    })
})

app.use(express.json());
app.use("/api",require('./Routes/CreateUser'))
app.use("/api",require('./Routes/DisplayData'))
app.use('/api',require('./Routes/OrderData'))
app.listen(PORT,()=>{
    console.log("server is working");
})