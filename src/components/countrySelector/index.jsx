import React, { useEffect, useState } from "react";
import "./selector.scss";
import { debounce } from "../../helper/common";
const CountrySelector = ({ setSelectedCountry }) => {
  const [countryList, setCountryList] = useState([]);
  const getCountry = async () => {
    const res = await fetch("https://worldtimeapi.org/api/timezone");
    const body = await res.json();
    localStorage.setItem("countryList", JSON.stringify(body));
    setCountryList(body);
  };

  const handleChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const debounceCountry = debounce(() => {
    const localStore = localStorage.getItem("countryList") ?? null;
    if (localStore) {
      setCountryList(JSON.parse(localStore));
    } else {
      getCountry();
    }
  }, 5);

  useEffect(() => {
    debounceCountry();
  }, []);

  return (
    <select onChange={handleChange}>
      {countryList.map((item, index) => (
        <option value={item} key={index}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default CountrySelector;
