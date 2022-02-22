import styles from '../styles/Card.module.css';
import {Button, Container, Modal} from 'react-bootstrap';
import {useState} from 'react';
import DisplaySnowDates from './DisplaySnowDates';
import {useRouter} from 'next/router';
import moment from 'moment';

function Card(props) {

    const [showDates, setShowDates] = useState(false);
    const router = useRouter();
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
        }).then(function(response) {
            if (response.status === 201){
                router.push('/');
            }
                
            
        });
    }

    return (
        <a className={styles.card}>
            <h2>{props.client.name}</h2>
            <Container>
               
                <h5 > {props.client.unpaidDates && props.client.unpaidDates.length?"Unpaid":"-"}</h5>
                <div className={styles.dates}>
                    {!props.client.unpaidDates?<div>All Paid</div>: props.client.unpaidDates.map((date,i) => {
                        return(
                        <div key={i}>{moment(date).format('MMM Do YY')}</div>  
                        )
                        
                    })}
                </div>
                    
                    
               
                
            </Container>
            <div className={styles.buttonContainer}>
                <Button onClick={updatePaidDates} variant='secondary' id={styles.clientButton}>Paid For</Button>
                <Button onClick={handleShowDates}>Snow Dates</Button>
            </div>

            <Modal show={showDates} onHide={handleShowDates}>
                <DisplaySnowDates client={props.client}/>  
            </Modal>

        </a>
    )
}

export default Card
