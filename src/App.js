import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import AutoComplete from './AutoComplete'
import Flag from 'react-world-flags'



function App() {

  const [globalStats, setGlobalStats] = useState();
  const [countryStats, setCountryStats] = useState();
  const [text, setText] = useState('Search...');
  const [country, setCountry] = useState();
  const [countryCode, setCountryCode] = useState('US')

  useEffect(() => {
    if (!country) {
      Axios.get('https://api.covid19api.com/summary')
        .then(res => {
          setCountry(res.data.Countries.find(c => c.Country === 'United States of America'))

        })
      retrieveStats();
    } else {
      retrieveStats();
      setCountryCode(country.CountryCode)
    }
  }, [country])


  const retrieveStats = () => {
    Axios.get('https://api.covid19api.com/summary')
      .then(res => {

        setGlobalStats(res.data.Global);
        setCountryStats(res.data.Countries);


      })

  }
  const countryDisplay = selected => {

    setCountry(countryStats.find(c => c.Country === selected))


  }



  return (
    <div className="App">
      <header>
        <div id='titleBar'> <h4>Covid19 Stats</h4>

        </div>
        <hr className='longLines' />
      </header>



      <h3 id='globalTitle'><img id='world' src='https://cdn4.iconfinder.com/data/icons/Browsers_tatice/512/Globe.png' />Global </h3>
      <div id='globalStatsContainer'>

        <div className='globalStatsPair'> <div className='globalStatsKey'>New Confirmed </div><hr id='statsLine' /><div className='globalStatsValue'>{globalStats && globalStats.NewConfirmed}</div></div>
        <div className='globalStatsPair'><div className='globalStatsKey'>Total Confirmed </div><hr id='statsLine' /><div className='globalStatsValue'>{globalStats && globalStats.TotalConfirmed}</div></div>
        <div className='globalStatsPair'><div className='globalStatsKey'>New Deaths </div><hr id='statsLine' /><div className='globalStatsValue'>{globalStats && globalStats.NewDeaths}</div></div>
        <div className='globalStatsPair'><div className='globalStatsKey'>Total Deaths </div><hr id='statsLine' /><div className='globalStatsValue'>{globalStats && globalStats.TotalDeaths}</div></div>
        <div className='globalStatsPair'><div className='globalStatsKey'>New Recovered </div><hr id='statsLine' /><div className='globalStatsValue'>{globalStats && globalStats.NewRecovered}</div></div>
        <div className='globalStatsPair'><div className='globalStatsKey'>Total Recovered </div><hr id='statsLine' /><div className='globalStatsValue'>{globalStats && globalStats.TotalRecovered}</div></div>
      </div>

      <hr className='longLines' />


      <div id='countryStatsTitle'><div id='flagAndTitle'><Flag code={countryCode} height='35' id='flagImg' />{country && country.Country}</div> < div className='App-Component'><AutoComplete countryStats={countryStats} setText={setText} text={text} countryDisplay={countryDisplay} /> </div>  </div>
      <div id='countryStatsContainer'>
        <div className='countryStatsPair'><div className='countryStatsKey'>New Confirmed </div><hr id='statsLine' /><div className='countryStatsValue'>{country && country.NewConfirmed}</div></div>
        <div className='countryStatsPair'><div className='countryStatsKey'>Total Confirmed </div><hr id='statsLine' /><div className='countryStatsValue'>{country && country.TotalConfirmed}</div></div>
        <div className='countryStatsPair'><div className='countryStatsKey'>New Deaths </div><hr id='statsLine' /><div className='countryStatsValue'>{country && country.NewDeaths}</div></div>
        <div className='countryStatsPair'><div className='countryStatsKey'>Total Deaths </div><hr id='statsLine' /><div className='countryStatsValue'>{country && country.TotalDeaths}</div></div>
        <div className='countryStatsPair'><div className='countryStatsKey'>New Recovered </div><hr id='statsLine' /><div className='countryStatsValue'>{country && country.NewRecovered}</div></div>
        <div className='countryStatsPair'><div className='countryStatsKey'>Total Recovered </div><hr id='statsLine' /><div className='countryStatsValue'>{country && country.TotalRecovered}</div></div>
      </div>



      <footer>
        <hr id='footerLine' />
        <div id='footerText'><a className='footerLink' href='https://github.com/tripptofan/covid19-stats'>Github</a></div>
      </footer>
    </div>


  );
}

export default App;
