import {Navbar, Container, Nav,Modal} from 'react-bootstrap';
import styles from '../../styles/Nav.module.css';
import {useState} from 'react';
import NewClientForm from '../NewClientForm';



function MyNav() {
    const [showNewClientForm, setShowClientForm] = useState(false);

    const showCloseForm = () =>{
       
        setShowClientForm(!showNewClientForm);
    }

    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Container >
           
                <Navbar.Brand className={styles.nav} href="/">Snow Notes</Navbar.Brand>
                <Nav>
                    <Nav.Link onClick={showCloseForm} className={styles.linkClient}><u>Add Client</u></Nav.Link>
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
