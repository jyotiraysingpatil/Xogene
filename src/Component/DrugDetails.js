import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDrugDetails, getNDCs } from '../Component/Api';
import './DrugDetails.css'; // Import the styles

const DrugDetails = () => {
  const { drugName } = useParams();
  const [drugInfo, setDrugInfo] = useState(null);
  const [ndcs, setNdcList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await getDrugDetails(drugName);
        const ndcs = await getNDCs(details.rxcui);
        setDrugInfo(details);
        setNdcList(ndcs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [drugName]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="drug-details">
      <h1>{drugInfo.name}</h1>
      <p>RXCUI: {drugInfo.rxcui}</p>
      <p>Synonyms: {drugInfo.synonyms?.join(', ')}</p>
      <h2>Associated NDCs:</h2>
      <ul>
        {ndcs.map((ndc) => (
          <li key={ndc}>{ndc}</li>
        ))}
      </ul>
    </div>
  );
};

export default DrugDetails;
