import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "./App.css";
import { COINGECKO_MARKETS_API, VS_CURRENCY_USD } from "./common/constants";

const App = () => {
  const [currenciesData, setCurrenciesData] = useState([]);

  const getCoingeckoMarketData = () => {
    axios
      .get(COINGECKO_MARKETS_API, {
        params: { vs_currency: VS_CURRENCY_USD },
      })
      .then((response) => setCurrenciesData(response.data))
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getCoingeckoMarketData();
  }, []);

  return (
    <Table striped hover size="sm">
      <thead className="wrapper-header-box">
        <tr className="header-box">
          <th className="header-logo-box"></th>
          <th className="header-name-box">Name</th>
          <th className="header-symbol-box"> Symbol </th>
          <th className="header-price-box">Current Price</th>
        </tr>
      </thead>

      <tbody className="wrapper-body-box">
        {currenciesData.map((data) => (
          <tr className="row-information" key={data.id}>
            <td className="image-logo-box">
              <img className="image-logo" src={data.image} alt="crypto" />
            </td>
            <td className="data-name-box"> {data.name} </td>
            <td className="data-symbol-box">{data.symbol}</td>
            <td className="data-current-price"> ${data.current_price}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default App;
