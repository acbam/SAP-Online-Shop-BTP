const bcrypt = require("bcrypt");
const express = require("express");
const cds = require("@sap/cds");
const { SELECT, INSERT } = cds.ql;
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_KEY;  
const HASH_ROUNDS = 10;

module.exports = async(app) => {

    app.use(express.json()); //Use express to easily parse body
    
    app.post("/register", async (req, res) => {
        if (!req || !req.body) {
            return res.status(400).json("Body is not specified")
        }
        const { email, password } = req.body;
        if (!email || !password) {
            return req.reject(400, "Email and Password are required");
        }
        const db = await cds.connect.to("db");
        const { User } = db.entities;
        const user = await SELECT.one.from(User).where({email: email });
        if (user){
            return res.status(400).json({message: "User is already exists"});
        }
        const hashedPwd = await bcrypt.hash(password, HASH_ROUNDS);
        await INSERT.into(User, {email, username: email, password: hashedPwd});
        return res.status(200).json({email, username: email});
    });

    app.post("/login", async (req, res) => {
        if (!req || !req.body) {
            return res.status(400).json("Body is not specified")
        }
        const { email, password } = req.body;
        if (!email || !password) {
            return req.reject(400, "Email and Password are required");
        }
        const db = await cds.connect.to("db");
        const { User } = db.entities;
        const user = await SELECT.one.from(User).where({email: email });
        if (!user){
            return res.status(400).json({message: "User doesn't exist"});
        }
        if (!bcrypt.compare(password, user.password)) {
            return res.status(401).json({message: "Password is not correct"});
        }
        const token = jwt.sign({ id: user.ID, email: user.email, role: 'user' }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token });
    });
    
};