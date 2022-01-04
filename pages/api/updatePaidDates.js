import {MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res){

    if (req.method === 'POST'){ // only listens to POST request
  
        console.log("updating paid for : "+ req.body.clientId)
        const id = req.body.clientId;
        const client = await MongoClient.connect(process.env.MONGO_DB);
        const db = client.db();
        
        const clientsCollection = db.collection('clients');
        
        // find client using the id
        const result = await clientsCollection.findOne({_id: ObjectId(id)});

        //append all the dates from the unpaid array to the paid array and save 
        const newpaidDates = result.paidDates?result.paidDates.concat(result.unpaidDates):[].concat(result.unpaidDates);
        console.log("new paid: " + newpaidDates)
        await clientsCollection.findOneAndUpdate(
            {_id: ObjectId(id)},
            {
                $set: {
                    unpaidDates: [],
                    paidDates: newpaidDates
                },
                // $set: {
                //     paidDates: newpaidDates
                // },
                
            },{multi: true}
        )
        //reset the unpaid array to empty


        client.close(); // close the db connection

        res.status(201).json({message: 'successfully updated the dates.'}) //success
    }
}