import bcrypt from 'bcrypt';
import db from "../db.js";

export default async function signUp(req,res){
    const newUser=req.body;

    const hashedPassword = bcrypt.hashSync(newUser.password,10);

try{
    const existingUser = await db.collection('users').findOne({email:newUser.email});
    if(existingUser){
        return res.sendStatus(422);
    }
    await db.collection('users').insertOne({
        ...newUser,
        password:hashedPassword,
    });

    res.sendStatus(201);
}catch(err){
    console.log(err);
    res.sendStatus(500);
}
}
