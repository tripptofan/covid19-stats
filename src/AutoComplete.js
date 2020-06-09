import React, { useState } from 'react';
import './App.css';


const AutoComplete = ({ countryStats, text, setText, countryDisplay }) => {

    const [suggestions, setSuggestions] = useState([]);


    const onTextChanged = (e) => {
        let countryNames = countryStats.map(c => c.Country)
        const value = e.target.value;
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            setSuggestions(countryNames.sort().filter(v => regex.test(v)))
            setText(value);
        } else {
            setSuggestions([]);
            setText(value);
        }

    }




    return (
        <div>

            <div className='autoComplete'>
                <input value={text} onChange={onTextChanged} type='text' onClick={() => setText('')} />
                <ul>
                    {(suggestions.length === 0) ? null : suggestions.map(i => <li onClick={() => { setText('Search...'); setSuggestions([]); countryDisplay(i) }}>{i}</li>)}
                </ul>

            </div>

        </div>
    )

}

export default AutoComplete;