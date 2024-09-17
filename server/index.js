const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const UserModel = require('./model/user');
const session = require("express-session");
const MongoStore = require("connect-mongo");

dotenv.config();
const app = express();
app.use(express.json());

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
};

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to mongodb");
    })
    .catch(err => console.log("Failed to connect to database"));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    }),
    cookie: {maxAge: 24*60*60*1000}
}))


app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/login",async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            const passwordMatch = await bcrypt.compare(password,user.password);
            if(passwordMatch){
                req.session.user={id:user._id,name:user.name,email:user.email};
                res.json("Success");
            }
            else{
                res.json("Passwords doesnt match");
            }
        }
        else{
            res.status(401).json("No records found");
        }
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
})

app.post('/logout',(req,res)=>{
    if(req.session){
        req.session.destroy(err=>{
            if(err){
                res.status(500).json({error: "Failed to logout"});
            }
            else{
                res.status(200).json("Logout successful");
            }
        })
    }
    else{
        res.status(400).json({error: "No session found"});
    }
})

app.get('/user',(req,res)=>{
    if(req.session.user){
        res.json({user:req.session.user});
    }else{
        res.status(401).json("Not authorized");
    }
})