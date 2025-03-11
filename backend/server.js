import express from "express"
import cors from "cors"
import { connectDB } from "./config/Db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import commentRouter from "./routes/commentRouter.js"
import offerRouter from "./routes/offerRoute.js"

//app config
const app= express()
const port =4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/api/offer",offerRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/comment",commentRouter)

app.get("/",(req,res)=>{
    res.send("api working")
})

app.listen(port,()=>{
    console.log(`server Started on http://localhost:${port}`)
})

//mongodb+srv://onlyjuice:buddhikaeshan@cluster0.ugfblpy.mongodb.net/?
//mongodb+srv://buddhikaeshan667:dnqXZZy8jeP4u3vo@cluster0.pa0tt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0