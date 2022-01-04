import {Form,OverlayTrigger, Button, Popover} from 'react-bootstrap';
import styles from '../styles/AddNewDate.module.css';
import {useState,useRef} from 'react'


function AddNewDate(props) {
    const [clientOptions, setClientOptions] = useState(
        props.clients?props.clients:[]
    )

    const [selectedClients, setSelectedClients] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    const selectedDate = useRef();
    

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
                
            }
                
            
        });
    }



    const popover = (
        <Popover  id="popover-basic">
          <Popover.Header as="h3">Select date and clients</Popover.Header>
          <Popover.Body>
            <input type='date' ref={selectedDate} />
            {clientOptions.map(client => {
                return (
                    <div key={client.id}>
                        <input type="checkBox"  value={client.id} onChange={handleSelectedClient}/>
                        <label htmlFor="vehicle1"> {client.name}</label>
                    </div>
                )
            })}

            <Button onClick={handleAddDate}>+</Button>
          </Popover.Body>
        </Popover>
      );

    return (
        <OverlayTrigger  trigger="click" placement="right" overlay={popover}>
            <Button className={styles.dateButton} variant="secondary">Add New Date</Button>
        </OverlayTrigger>
    )
}



export default AddNewDate;

