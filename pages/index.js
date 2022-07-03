import Head from 'next/head';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import Session from '../components/Session';
import NewPrescription from '../components/NewPrescription';
import LoadPrescription from '../components/LoadPrescription';

export default function Home() {
  const selectedSession = useSelector(state => state.session.selectedSession);
  return (
    <>
      <Head>
        <title>ABC Hospital</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;1,100&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" />
      </Head>
      <div style={{display: 'grid', gridTemplateRows: '1fr 6fr', gridTemplateAreas: "'header' 'content'", height: '100vh'}}>
        <div style={{fontSize: 40, color: '#FFFFFE', gridArea: 'header'}} className="flex items-center justify-center">
          <a href='/'>ABC Hospital</a>
        </div>
        <div style={{gridArea: 'content', color: '#FFFFFE'}}>
        {selectedSession === '' && 
          <div className="flex flex-wrap justify-evenly pl-10 pr-10 pt-[100px]">
            <Session sessionType="New Prescription"/>
            <Session sessionType="Load Prescription"/>
          </div>}
        {selectedSession === 'New Prescription' &&
          <div className="pl-40 pr-40">
            <NewPrescription />
          </div>
        }
        {selectedSession === 'Load Prescription' && 
          <div className="pl-40 pr-40">
            <LoadPrescription />
          </div>
        }
        </div>
      </div>
    </>
  )
}
