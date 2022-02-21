import { ObjectId } from "mongodb";
import db from "../db.js";

export default async function historicProducts(req,res){
    const {user} = res.locals;
    try{
        if(!user){
            return res.sendStatus(404);;
        }
    
        const userData = await db.collection('historic').find({idUser:user._id}).toArray();
        return res.send(userData);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getPurchaseInfo(req,res){
    const {user} = res.locals;

    try{
        if(!user){
            return res.sendStatus(404);
        }

        const historicCollection = db.collection("historic");
        const historic = await historicCollection.find({userId: user._id}).toArray();

        if (!historic) {
            return res.sendStatus(404);
        }
        
		res.status(200).send(historic);
    }catch(error){
        res.status(500).send('A culpa foi do estagiário');
        console.log(error);
    }
}

export async function purchasedItems(req,res){
    const { items } = req.body;
    const ids = items.map(id => new ObjectId(id));
    
    try{
        const productsCollection = db.collection("products");
        const products = await productsCollection.find({_id: {$in: ids}}).toArray();

		res.status(201).send(products);
    } catch (error) {
        res.status(500).send('A culpa foi do estagiário');
        console.log(error);
    }
}
