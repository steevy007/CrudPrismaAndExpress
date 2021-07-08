const express=require('express')
const app=express()
const userRouter=require('./routes/api/user')
const PORT=process.env.PORT || 8000
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/user',userRouter);
app.get('*',(req,res)=>{
  res.status(404).json({
    message:"Page Not Found"
  })
})

app.listen(PORT,(req,res)=>{
  console.log(`Server Demare sur le port ${PORT}`)
})