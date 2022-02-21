import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from "../db.js";

export async function signIn(req,res){
    const {email, password} = req.body;
  
    try{
        const user = await db.collection('users').findOne({email:email});
        
        if(!user){
            return res.status(401).send("Usuário não encontrado");
        }
        if(bcrypt.compareSync(password,user.password)){
            const token = uuid();
            await db.collection('sessions').insertOne({token, userId: user._id});
            return res.status(200).send({...user, token: token})
        }
    }catch(error){
        console.log(error);
        return res.sendStatus(500);
    }
    }