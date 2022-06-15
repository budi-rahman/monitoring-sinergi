import React from 'react';
import '../styles/globals.css'
import Layout from '../components/Layout'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {useRouter} from 'next/router';
import { useState, useEffect } from 'react';

function Loading(){
  const router = useRouter();
  const[loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url) => (url === router.asPath) && setTimeout(()=>{setLoading(false)},10000);

    router.events.on('routerChangeStart', handleStart)
    router.events.on('routerChangeComplete', handleComplete)
    router.events.on('routerChangeError', handleComplete)

    return() => {
      router.events.off('routerChangeStart', handleStart)
      router.events.off('routerChangeComplete', handleComplete)
      router.events.off('routerChangeError', handleComplete)
    }
  })
  return loading && (
    <div className='spinner-wrapper'>
      <div className='spinner'/>
    </div>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Loading/>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>

  )
}

export default MyApp
