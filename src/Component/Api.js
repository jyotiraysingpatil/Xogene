const BASE_URL = 'https://rxnav.nlm.nih.gov/REST';

export const searchDrugs = async (query) => {
  const response = await fetch(`${BASE_URL}/drugsearch?name=${query}`);
  const data = await response.json();
  return data.drugGroup?.conceptGroup || [];
};

export const getDrugDetails = async (drugName) => {
  const response = await fetch(`${BASE_URL}/drug/${drugName}.json`);
  const data = await response.json();
  return data;
};

export const getNDCs = async (rxcui) => {
  const response = await fetch(`${BASE_URL}/rxcui/${rxcui}/ndcs.json`);
  const data = await response.json();
  return data.ndcGroup?.ndcList?.ndc || [];
};
