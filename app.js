const express = require('express')
const router = require('./route')
const MongoConnect = require('./utils/db').MongoConnect
const app = express()
app.use(express.json())
app.use(router)

MongoConnect(()=>app.listen(8000,()=>console.log("server is running 8000")))