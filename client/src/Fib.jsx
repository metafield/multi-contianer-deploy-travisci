import React, { useState, useEffect } from "react";
import axios from 'axios'

export const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([])
  const [values, setValues] = useState({})
  const [index, setIndex] = useState('')

  useEffect(() => {
    const fetchValues = async () => {
      const values = await axios.get('/api/values/current');
      setValues(values.data)
    }

    const fetchIndexes = async () => {
      const seenIndexes = await axios.get('/api/values/all');
      console.log(seenIndexes.data);
      setSeenIndexes(seenIndexes.data);
    }

    fetchValues();
    fetchIndexes();
  }, [setValues, setSeenIndexes]);

  const renderValues = () => {
    return Object.keys(values).map(key => <div key={key}>
      For index {key} I calculated {values[key]}
    </div>)
  }

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(', ')
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('index is currently: ', index);

    await axios.post('/api/values', {
      index
    });

    setIndex('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={event => setIndex(event.target.value)}
        />
        <button>submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      {renderValues()}

    </div>
  );
}