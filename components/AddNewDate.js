import {Form,OverlayTrigger, Button, Popover} from 'react-bootstrap';
import styles from '../styles/AddNewDate.module.css';
import {useState} from 'react'

function AddNewDate(props) {
    const [clientOptions, setClientOptions] = useState(
        props.clients?props.clients.map(client => 
            {value: client.name}
        ):[]
    )

    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Select date and clients</Popover.Header>
          <Popover.Body>
            <input type='date'/>
            
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
