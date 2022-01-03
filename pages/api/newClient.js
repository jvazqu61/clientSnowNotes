import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST'){ // only listens to POST request
  
        
        const data = req.body;
        const client = await MongoClient.connect(process.env.MONGO_DB);
        const db = client.db();
        
        const clientsCollection = db.collection('clients');
        const newClient = {
            name:data.name,
            snowDates:{},
            paidDate: ''
        }

        const result = await clientsCollection.insertOne(data);
        client.close(); // close the db connection

        res.status(201).json({message: 'client inserted to db.'}) //success
    }
  }