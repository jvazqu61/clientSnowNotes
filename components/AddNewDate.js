import {Form,OverlayTrigger, Button, Popover, Container,Modal} from 'react-bootstrap';
import styles from '../styles/AddNewDate.module.css';
import {useState,useRef} from 'react';
import {useRouter} from 'next/router';


function AddNewDate(props) {
    const [clientOptions, setClientOptions] = useState(
        props.clients?props.clients:[]
    )

    const [selectedClients, setSelectedClients] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const selectedDate = useRef();
    const router = useRouter();

    function handleIsOpenChange(){
        setIsOpen(!isOpen);
    }
    

    function handleSelectedClient (e)  {
        // selectedClients.push(e.target.value)
        if (selectedClients.includes(e.target.value)){
            let myIndex = selectedClients.indexOf(e.target.value);
            selectedClients.splice(myIndex, 1);
            const filteredArray = selectedClients
            setSelectedClients(filteredArray)
        }
        else{
            selectedClients.push(e.target.value)
            const filteredArray = selectedClients
            setSelectedClients(filteredArray)
        }
       
    }

    function handleAddDate(){
        const setDate = selectedDate.current.value;
       

        fetch('/api/addNewDate',{
            method:'POST',
            body:JSON.stringify({
               
                selectedClients: selectedClients,
                date: setDate,
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            if (response.status === 201){
                handleIsOpenChange();
                router.push('/');
            }
                
            
        });
    }

    function handleAddDateAll(){
        const setDate = selectedDate.current.value;
        const allClientIds = clientOptions.map((client) => {return client.id})

        fetch('/api/addNewDate',{
            method:'POST',
            body:JSON.stringify({
               
                selectedClients: allClientIds,
                date: setDate,
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            if (response.status === 201){
                handleIsOpenChange();
                router.push('/');
            }
                
            
        });
    }




    return (
        
        <>
        <Button onClick={handleIsOpenChange} className={styles.dateButton} variant="secondary">Add New Date</Button>
        <Modal show={isOpen} onHide={handleIsOpenChange}>
            <div className={styles.popover}>
            <Modal.Header as="h3">Select date and clients</Modal.Header>
            <Modal.Body>
                <input id={styles.date} type='date' ref={selectedDate} />
                <Button onClick={handleAddDateAll} id={styles.allButton}>+ To All</Button>
                <Container className={styles.clientsContainer}>
                    {clientOptions.map(client => {
                        return (
                            <ul  key={client.name}>
                                <input type="checkBox"  value={client.id} onChange={handleSelectedClient}/>
                                <label > {client.name}</label>
                            </ul>
                        )
                    })}
                </Container>
                <Button id={styles.allButton} onClick={handleAddDate}>+ To Selected</Button>
            </Modal.Body>
            </div>

        </Modal>
        </>
    )
}



export default AddNewDate;

