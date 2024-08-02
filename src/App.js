import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

const options = [
  { value: 'numbers', label: 'Numbers' },
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'highest_alphabet', label: 'Highest Alphabet' }
];

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await axios.post('http://127.0.0.1:5000', parsedData);
      setResponse(res.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data', error);
      setError('Invalid JSON or server error. Please check the input or server.');
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    const filtered = {};
    if (selectedOptions.some(option => option.value === 'numbers')) {
      filtered.numbers = response.numbers.join(',');
    }
    if (selectedOptions.some(option => option.value === 'alphabets')) {
      filtered.alphabets = response.alphabets.join(',');
    }
    if (selectedOptions.some(option => option.value === 'highest_alphabet')) {
      filtered.highest_alphabet = response.highest_alphabet.join(',');
    }

    return (
      <div>
        {filtered.numbers && <div>Numbers: {filtered.numbers}</div>}
        {filtered.alphabets && <div>Alphabets: {filtered.alphabets}</div>}
        {filtered.highest_alphabet && <div>Highest Alphabet: {filtered.highest_alphabet}</div>}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>API Input</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows="4"
        cols="50"
        placeholder='{"data":["M","1","334","4","B"]}'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <div className="error">{error}</div>}

      <h2>Multi Filter</h2>
      <Select
        isMulti
        options={options}
        onChange={handleSelectChange}
      />

      <h2>Filtered Response</h2>
      {renderFilteredResponse()}
    </div>
  );
}

export default App;
