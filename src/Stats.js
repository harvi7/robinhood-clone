import React, { useEffect, useState } from 'react'
import axios from 'axios'

import StatsRow from './StatsRow'
import './Stats.css'
import { db } from './firebase'


const KEY_URL = 'c00iusf48v6qajv8ok30'
const BASE_URL = 'https://finnhub.io/api/v1/quote'

function Stats() {

    const [stocksData, setStocksData] = useState([])
    const [myStocks, setMyStocks] = useState([])

    const getMyStocks = () => {
      db
      .collection('myStocks')
      .onSnapshot(snapshot => {
          let promises = []
          let tempData = []
          snapshot.docs.map((doc) => { 
            promises.push(getStocksData(doc.data().ticker)
            .then(res => {
              tempData.push({
                id: doc.id,
                data: doc.data(),
                info: res.data
              })
            })
          )})

          Promise.all(promises).then(()=>{
            setMyStocks(tempData)
          })
      })
    }

    const getStocksData = (stock) => {
        return axios
            .get(`${BASE_URL}?symbol=${stock}&token=${KEY_URL}`)
            .catch((error) => {
            console.error("Error", error.message);
        });
    };

    useEffect(() => {
        let tempStocksData = []
        const stocksList = ["AAPL", "MSFT", "TSLA", "FB", "BABA", "UBER", "DIS", "SBUX"];

        getMyStocks();
        let promises = [];
        stocksList.map((stock) => {
          promises.push(
            getStocksData(stock)
            .then((res) => {
                tempStocksData.push({
                name: stock,
                ...res.data
              });
            })
          )
        });
    
        Promise.all(promises).then(()=>{
            setStocksData(tempStocksData);
        })
    }, [])

    return (
      <div className="stats">
        <div className="stats__container">
          <div className="stats__header">
            <p>Stocks</p>
          </div>
          <div className="stats__content">
            <div className="stats__rows">
              {myStocks.map((stock) => (
                <StatsRow
                    key={stock.data.ticker}
                    name={stock.data.ticker}
                    openPrice={stock.info.o}
                    shares={stock.data.shares}
                    price={stock.info.c}
                />
              ))}
            </div>
          </div>
          <div className="stats__header stats__lists">
            <p>Lists</p>
          </div>
          <div className="stats__content">
            <div className="stats__rows">
              {stocksData.map((stock) => (
                <StatsRow
                    key={stock.name}
                    name={stock.name}
                    openPrice={stock.o}
                    price={stock.c}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Stats
