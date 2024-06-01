/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://reactnd-books-api.udacity.com/books', {
      headers: { 'Authorization': 'whatever-you-want' }
    })
    .then(({ data: { books } }) => {
      setData(books);
      setLoading(false);
    })
    .catch((err) => {
      setError(err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data && data.map(({ id, title, imageLinks, description, authors }) => (
        <div key={id}>
          <h4>{title}</h4>
          <div className='flex'>
            <img src={imageLinks?.smallThumbnail} alt={title} />
            <p>{description}</p>
          </div>
          <div>
            {authors && authors.map((author, index) => (
              <span key={index}>{author}</span>
            ))}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;



