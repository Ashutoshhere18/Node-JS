import {connectDB} from './config/db.js'
import express from 'express'
import router from './routes/AuthRoute.js'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import './config/passport.js'

const app=express();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret:"secret-key-1010134 ",   // Secret key for signing cookies
    resave:false,                   // Don't save session if unmodified
    saveUninitialised:false,         // Don't create session until something stored
    store:MongoStore.create({
        mongoUrl:"mongodb://localhost:27017/AuthPassport"
    }),
    cookie:{
        maxAge:1000*60*60
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/",router);

app.listen(4000,()=>{
    console.log("Server Started !.");
})

