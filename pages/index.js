import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { Select } from '../components/Select';
import { Slider } from '../components/Slider';
import { calculateSettings } from './api/calculateSettings';


export default function Home() {

  const machineOptions = [
    { value: 'option1', label: 'Kinetico' },
    { value: 'option2', label: 'Dupure' },
    {value: 'option3', label: 'Aquasure' },
  ];

  const settingsOptions = [
    { value: 'option1', label: 'Softener' },
    { value: 'option2', label: 'Reverse Osmosis' },
    {value: 'option3', label: 'Whole House' },
  ];

  const [saltAmount, setSaltAmount] = useState(0);
  const [selectedMachine, setSelectedMachine] = useState(machineOptions[0].value);
  const [selectedSetting, setSelectedSetting] = useState(settingsOptions[0].value);
  const [waterHardness, setWaterHardness] = useState(0);
  const [compensatorySalt, setCompensatorySalt] = useState(0);

  const getSaltAmount = () => {
    // console.log(selectedMachine, selectedSetting, waterHardness, compensatorySalt)
    setSaltAmount(calculateSettings(selectedMachine, selectedSetting, waterHardness, compensatorySalt));    
  };


  return (
    <div className={styles.container}>
      <Head>
        <title>Salt Settings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Salt Settings
        </h1>

        <h2 className={styles.description}>
          Find the right salt settings for any machine
        </h2>

        <div className="container">
          <h3 className={styles.description}>
            Pick your machine:
          </h3>
          <Select
            options={machineOptions}
            selectLabel="Select an option:"
            handleSelectChange={setSelectedMachine}
            selectValue={selectedMachine}
          />
          <h3 className={styles.description}>
            Pick your setting:
          </h3>
          <Select
            options={settingsOptions}
            selectLabel="Select an option:"
            handleSelectChange={setSelectedSetting}
            selectValue={selectedSetting}
          />
          <h3 className={styles.description}>
            Adjust your water hardness:
          </h3>
          <Slider
            min={0}
            max={100}
            sliderLabel="Adjust the slider:"
            handleSliderChange={setWaterHardness}
            sliderValue={waterHardness}
          />
          <h3 className={styles.description}>
            Add the amount of compensatory salt:
          </h3>
          <Slider
            min={0}
            max={20}
            sliderLabel="Adjust the slider:"
            handleSliderChange={setCompensatorySalt}
            sliderValue={compensatorySalt}
          />
        </div>

        <submitButton className={styles.button} onClick={()=>getSaltAmount()}>
          Calulate Salt Settings
        </submitButton>
        
        {saltAmount > 0 && (
          <div className="salt-amount">
            <h3 className={styles.description}>
              Your salt settings are:
            </h3>
            <p className={styles.description}>
              {saltAmount}
            </p>
          </div>
        )}
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/imcm-black.svg" alt="Is My Customer Moving" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        submitButton {
          width: 60%;
          height: 60px;
          border: 3px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          cursor: pointer;
        }

      
        footer img {
          margin-left: 0.5rem;
          height: 3rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
