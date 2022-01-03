import Header from '../components/layout/Header';
import styles from '../styles/Home.module.css';
import {MongoClient} from 'mongodb'
import Card from '../components/Card';
import AddNewDate from '../components/AddNewDate'

export default function Home(props) {
  return (
    <div className={styles.container}>
       
      <Header title='Snow notes' />
      <AddNewDate clients={props.clients}/>
      <main className={styles.main}>
        
        <div className={styles.grid}>
          {props.clients?props.clients.map((client,i) => (
             
              <Card key={client.i} name={client.name}/>
            
              
            
          )) : <></>}
          
          
        </div>
      </main>

      <footer className={styles.footer}>
        <h6>
          Juan Vazquez 2022
        </h6>
      </footer>
    </div>
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
          name:client.name
        })
      })
    },
    revalidate:1
  })
}
