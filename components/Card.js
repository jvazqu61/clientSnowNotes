import styles from '../styles/Card.module.css';
import {Button, Container} from 'react-bootstrap';

function Card(props) {
    return (
        <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>{props.name} &rarr;</h2>
            <Container>
                <Button variant='secondary' id={styles.clientButton}>Paid</Button>
                <Button>Snow Dates</Button>
            </Container>
        </a>
    )
}

export default Card
