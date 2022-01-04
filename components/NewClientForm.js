import {Modal, Button} from 'react-bootstrap';
import styles from '../styles/NewClientForm.module.css';
import {useRef} from 'react';


function NewClientForm(props) {
    const nameInputRef = useRef();

    async function submitHandler(event) {
        event.preventDefault();
    
        const enteredNameInputRef= nameInputRef.current.value;
        
    
        const client = {
          name: enteredNameInputRef,
        };

        // send info to server to store in db
        const response = await fetch('/api/newClient',{
            method:'POST',
            body:JSON.stringify(client),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        
        props.closeForm();
    
        
      }

     

    return (
        <div className={styles.form}>
            <Modal.Header closeButton>
                <Modal.Title>Add new client</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <l>Name</l>
                
                <input type='text' required id='title' ref={nameInputRef} />
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={submitHandler} variant="primary">+</Button>
            </Modal.Footer>
        </div>
    )
}

export default NewClientForm
