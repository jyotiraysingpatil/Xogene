import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoadingSpinner from './Component/LoadingSpinner';  // Import LoadingSpinner
import SearchBar from './Component/SearchBar';  // Import SearchBar
import DrugDetails from './Component/DrugDetails';  // Import DrugDetails
import { searchDrugs } from './Component/Api';  // Import API from the correct location

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
    <Router>
      <div>
        <SearchBar onSearch={handleSearch} />
        {loading && <LoadingSpinner />}
        {error && <div>{error}</div>}
        <Routes>
          <Route
            path="/drugs/search"
            element={
              <div>
                {drugs.map((drug) => (
                  <div key={drug.id} onClick={() => navigate(`/drugs/${drug.name}`)}>
                    {drug.name}
                  </div>
                ))}
              </div>
            }
          />
          <Route path="/drugs/:drugName" element={<DrugDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
