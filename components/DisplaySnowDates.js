import {Modal} from 'react-bootstrap';



function DisplaySnowDates(props) {
    return (
        <div>
            <Modal.Header closeButton>
                    <Modal.Title>All Snow Dates For 2022 for {props.client.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h5>Paid Dates</h5>
                        <ul>
                        {!props.client.paidDates?<div>None</div>: props.client.paidDates.map((date,i) => {
                            return(
                            <li key={i}>{date}</li>  
                            )
                            
                        })}
                        </ul> 
                    <h5>Unpaid Dates</h5>
                        <ul>
                        {!props.client.unpaidDates?<div>All Paid</div>: props.client.unpaidDates.map((date,i) => {
                            return(
                            <li key={i}>{date}</li>  
                            )
                            
                        })}
                        </ul> 
                    
                </Modal.Body>
            
        </div>
    )
}

export default DisplaySnowDates
