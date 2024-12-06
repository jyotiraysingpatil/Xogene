import React, { useState } from 'react';
import { searchDrugs } from '../services/api';

const DrugSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      onSearch(query);
      setError('');
    } catch (err) {
      setError('An error occurred while fetching data.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a drug..."
      />
      <button onClick={handleSearch}>Search</button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default DrugSearch;
