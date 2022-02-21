import { ObjectId } from "mongodb";
import db from "../db.js";

export async function checkout(req,res){
    const { user } = res.locals;
    const { items } = req.body;
    const ids = items.map(id => new ObjectId(id));

    try{
        if(!user){
            return res.sendStatus(401);
        }

        const productsCollection = db.collection("products");
        const products = await productsCollection.find({_id: {$in: ids}});

        if (!products) {
            return res.sendStatus(404);
        }
        
        await db.collection("historic").insertOne({userId: user._id, items, date: Date.now()})

		res.sendStatus(200);
    }catch(error){
        res.status(500).send('A culpa foi do estagiário');
        console.log(error);
    }
}

export async function isLoged(req,res){
    const { user } = res.locals;
    try{
        if(!user){
            return res.sendStatus(401);
        }

		res.sendStatus(200);
    }catch(error){
        res.status(500).send('A culpa foi do estagiário');
        console.log(error);
    }
}