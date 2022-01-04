import { MongoClient,ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST'){ // only listens to POST request
        console.log("received: "+ req.body.selectedClients)
        
        const data = req.body;
        const client = await MongoClient.connect(process.env.MONGO_DB);
        const db = client.db();
        
        const clientsCollection = db.collection('clients');

        // loop through the selected clients and add the date to their account
        for (let i = 0; i < data.selectedClients.length; ++i ){
            await clientsCollection.findOneAndUpdate(
                { _id: ObjectId(data.selectedClients[i]) },
                { $push: { unpaidDates: data.date } }
             )
        }

    
        client.close(); // close the db connection

        res.status(201).json({message: 'client inserted to db.'}) //success
    }
  }