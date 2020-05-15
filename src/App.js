import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';
import AutoComplete from './AutoComplete'

function App() {
 
const [globalStats, setGlobalStats] = useState();
const [countryStats, setCountryStats] = useState();

useEffect(() => {
  retrieveStats();
  
})
const retrieveStats = () => {
  Axios.get('https://api.covid19api.com/summary')
      .then(res => {
        
        setGlobalStats(res.data.Global);
        setCountryStats(res.data.Countries);


        })
  
}

const formatVal = value => {
  let out = ''
  let str = value.toString()
  for(var i=0; i < str.length; i++){
    out =+ str.charAt(i);
  }
  return out;
}


  return (
    <div className="App">
      <header>Covid19 Stats</header>
{globalStats && Object.entries(globalStats).map(([key, value ]) => <div id='global'> <div id="key">{key}: </div>
 <div>{formatVal(value)}</div></div>)}
  
 <div className='App-Component'><AutoComplete countryNames={countryStats && countryStats.map(c => c.Country)}/> </div>
    </div>
  );
}

export default App;
