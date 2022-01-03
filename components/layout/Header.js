import Head from 'next/head';

function Header(props) {
    return (
        <Head>
           <title>{props.title}</title>
           <meta name='description' content={props.title?props.title:''} /> 
           <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

export default Header
