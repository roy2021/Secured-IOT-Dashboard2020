// import App from 'next/app'
import {initializeFirebase} from '../helpers/firebase';
import Head from 'next/head'
import Header from '../components/header'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/App.css';
import Footer from '../components/footer';
import 'sweetalert2/src/sweetalert2.scss';

function MyApp({ Component, pageProps }) {
    initializeFirebase()
    return <>
    <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/assets/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
        name="description"
        content="Manage Vurneblities"
        />
        <title>
            IOT 2020
        </title>
        {/* <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"></link> */}
    </Head>
    <Header/>
    <Component {...pageProps} />
    {/* <Footer/> */}
    </>
  }
  
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // MyApp.getInitialProps = async (appContext) => {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }
  
  export default MyApp