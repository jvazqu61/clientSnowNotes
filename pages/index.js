import Header from '../components/layout/Header';
import styles from '../styles/Home.module.css';
import {MongoClient} from 'mongodb'
import Card from '../components/Card';
import Nav from '../components/layout/Nav';

export default function Home(props) {
  return (
    <>
     <Nav clients={props.clients}/>
    <div className={styles.container}>
       
      <Header title='Snow notes' />
      <main className={styles.main}>
        
        <div className={styles.grid}>
          {props.clients?props.clients.map((client,i) => (
             
              <Card key={client.i} client={client}/>         
          )) : <></>}
          
          
        </div>
      </main>

      <footer className={styles.footer}>
        <h6>
        &copy;  Juan Vazquez 2022
        </h6>
      </footer>
    </div>
    </>
  )
}

export  async function getStaticProps(){
  // make a connection to mongodb
  const client = await MongoClient.connect(process.env.MONGO_DB);
  //get the data from the collection
  const db = client.db();
  const clientsConnection = db.collection('clients');
  //set the clients to the returned data
  const allClients = await clientsConnection.find().toArray();
  //close the connection
  client.close();
  console.log("all clients: "+allClients)
  
  
  return({
    props:{
      clients: allClients.map(client => {
        return ({
          name:client.name,
          id:client._id.toString(),
          paidDates:client.paidDates?client.paidDates:[],
          unpaidDates:client.unpaidDates?client.unpaidDates:[]
        })
      })
    },
    revalidate:1
  })
}
