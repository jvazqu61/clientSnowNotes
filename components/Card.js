import styles from '../styles/Home.module.css';

function Card(props) {
    return (
        <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>{props.name} &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
        </a>
    )
}

export default Card
