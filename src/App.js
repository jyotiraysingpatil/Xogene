import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoadingSpinner from './Component/LoadingSpinner';
import SearchBar from './Component/SearchBar';
import DrugDetails from './Component/DrugDetails';
import { searchDrugs } from './Component/Api';
import './App.css'; // Import your styles

const App = () => {
  const [drugs, setDrugs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');

    try {
      const drugResults = await searchDrugs(query);

      if (drugResults.length > 0) {
        setDrugs(drugResults);
        navigate('/drugs/search');
      } else {
        setError('No results found');
      }
    } catch (error) {
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />
      {loading && <LoadingSpinner />}
      {error && <div className="error-message">{error}</div>}
      <Routes>
        <Route
          path="/drugs/search"
          element={
            <div className="search-results">
              {drugs.map((drug) => (
                <div key={drug.id} className="drug-item" onClick={() => navigate(`/drugs/${drug.name}`)}>
                  {drug.name}
                </div>
              ))}
            </div>
          }
        />
        <Route path="/drugs/:drugName" element={<DrugDetails />} />
      </Routes>
    </div>
  );
};

export default App;
