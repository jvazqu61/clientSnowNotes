import {Form,OverlayTrigger, Button, Popover, Container,Modal} from 'react-bootstrap';
import styles from '../styles/AddNewDate.module.css';
import {useState,useRef} from 'react'


function AddNewDate(props) {
    const [clientOptions, setClientOptions] = useState(
        props.clients?props.clients:[]
    )

    const [selectedClients, setSelectedClients] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const selectedDate = useRef();

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
                <Container id={styles.clientsContainer}>
                    {clientOptions.map(client => {
                        return (
                            <div key={client.id}>
                                <input type="checkBox"  value={client.id} onChange={handleSelectedClient}/>
                                <label > {client.name}</label>
                            </div>
                        )
                    })}
                </Container>
                <Button onClick={handleAddDate}>+</Button>
            </Modal.Body>
            </div>

        </Modal>
        </>
    )
}



export default AddNewDate;

