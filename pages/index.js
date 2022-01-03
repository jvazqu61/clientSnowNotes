import Header from '../components/layout/Header';
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import {Button} from 'react-bootstrap'
import Card from '../components/Card';

export default function Home() {
  return (
    <div className={styles.container}>
       
      <Header title='Snow notes' />
      <main className={styles.main}>
      
        <div className={styles.grid}>
          <Card />
          
        </div>
      </main>

      <footer className={styles.footer}>
        <h6
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Juan Vazquez 2022
        </h6>
      </footer>
    </div>
  )
}

export  function getStaticProps(){
  return({
    props:{}
  })
}
