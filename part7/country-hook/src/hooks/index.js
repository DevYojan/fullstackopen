import { useEffect, useState } from 'react';
import axios from 'axios';

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v2/name/${name}?fullText=true`)
      .then((response) => setCountry(response.data[0]));
  }, [name]);

  return {
    country,
  };
};
