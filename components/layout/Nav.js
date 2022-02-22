import {Navbar, Container, Nav,Modal,Button} from 'react-bootstrap';
import styles from '../../styles/Nav.module.css';
import {useState} from 'react';
import NewClientForm from '../NewClientForm';
import AddNewDate from '../AddNewDate';


function MyNav({clients}) {
    const [showNewClientForm, setShowClientForm] = useState(false);

    const showCloseForm = () =>{
       
        setShowClientForm(!showNewClientForm);
    }

    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Container >
           
                <Navbar.Brand className={styles.nav} href="/">Snow Notes</Navbar.Brand>
                <Nav className={styles.links}>
                    <AddNewDate clients={clients} />
                    <Button onClick={showCloseForm} className={styles.linkClient}><u>Add Client</u></Button>
                </Nav>
            </Container>
            <Modal show={showNewClientForm} onHide={showCloseForm}>
                <NewClientForm closeForm={showCloseForm}/>
            </Modal>
        </Navbar>
        </>
    )
}

export default MyNav;


