const express = require ('express');
const dotenv = require ('dotenv');
const app = express();
const bodyparser = require('body-parser');
const morgan = require ('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const conneectDB = require('./server/database/connection');
const connectDB = require('./server/database/connection');

//Config Path with dotenv
dotenv.config({path:'config.env'})

//log requests by morgan (Print type of request on your console)
app.use(morgan('tiny'));


// MongoDB connection

connectDB();


//parse request to body-Parser

app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine" , "ejs")
//app.set("views",path.resolve(__direname,"views/ejs"))

//load assets

app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//load routers

app.use('/' , require('./server/routes/router'))

const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});