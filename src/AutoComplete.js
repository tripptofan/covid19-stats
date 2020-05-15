import React, {useState} from 'react';
import './App.css';


const AutoComplete  = ({countryNames}) => {
    
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState();

    const onTextChanged = (e) => {
        const value = e.target.value;
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            setSuggestions(countryNames.sort().filter(v => regex.test(v)))
            setText(value);
        }else {
            setSuggestions([]);
            setText(value);
        }

    }
        return (
            <div className='autoComplete'>
                <input value={text} onChange={onTextChanged} type='text' />
                <ul>
                   {(suggestions.length === 0) ? null : suggestions.map(i => <li onClick={() => {setText(i); setSuggestions([])}}>{i}</li>)}
                </ul>
            </div>
        )
    
}

export default AutoComplete;