import styles from '../styles/Card.module.css';
import {Button, Container, Modal} from 'react-bootstrap';
import {useState} from 'react';
import DisplaySnowDates from './DisplaySnowDates';

function Card(props) {

    const [showDates, setShowDates] = useState(false);
    function handleShowDates(){
        setShowDates(!showDates);
    }

    //send POST request to update paid snow days
    function updatePaidDates(){
        fetch('/api/updatePaidDates',{
            method:'POST',
            body:JSON.stringify({
               
                clientId:props.client.id
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <a className={styles.card}>
            <h2>{props.client.name}</h2>
            <Container>
               
                <h5 ><u> Unpaid</u></h5>
                {!props.client.unpaidDates?<div>All Paid</div>: props.client.unpaidDates.map((date,i) => {
                    return(
                      <li key={i}>{date}</li>  
                    )
                    
                })}
                    
                    
               
                
            </Container>
            <Container id={styles.buttonContainer}>
                <Button onClick={updatePaidDates} variant='secondary' id={styles.clientButton}>Paid For</Button>
                <Button onClick={handleShowDates}>Snow Dates</Button>
            </Container>

            <Modal show={showDates} onHide={handleShowDates}>
                <DisplaySnowDates client={props.client}/>  
            </Modal>

        </a>
    )
}

export default Card
