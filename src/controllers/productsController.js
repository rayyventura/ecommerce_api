import { ObjectId } from "mongodb";
import db from "../db.js";

export async function getProducts (req, res) {
    const { category } = req.headers;

    try{
        const productsCollection = db.collection("products");
        const products = await productsCollection.find({category: category}).toArray();
		res.status(201).send(products);
    } catch (error) {
        res.status(500).send('A culpa foi do estagiário');
        console.log(error);
    }
};

export async function getBasketProducts (req, res) {
    const { basket } = req.body;
    const ids = basket.map(id => new ObjectId(id));
    
    try{
        const productsCollection = db.collection("products");
        const products = await productsCollection.find({_id: {$in: ids}}).toArray();

		res.status(201).send(products);
    } catch (error) {
        res.status(500).send('A culpa foi do estagiário');
        console.log(error);
    }
};