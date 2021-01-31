import React, { useEffect, useState } from 'react'
import axios from 'axios'

import StatsRow from './StatsRow'
import './Stats.css'
import { db } from './firebase'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

const KEY_URL = 'c00iusf48v6qajv8ok30'
const BASE_URL = 'https://finnhub.io/api/v1/quote'

function Stats() {

    const [stocksData, setStocksData] = useState([])
    const [myStocks, setMyStocks] = useState([])
    const [stocksDataMutable, setStocksDataMutable] = useState([])
    const [myStocksDataMutable, setMyStocksDataMutable] = useState([])

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
            setMyStocksDataMutable(tempData);
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
            setStocksDataMutable(tempStocksData);
        })
        
    }, [])

    const handleDragEvent = (result) => {
      if (!result.destination) return;
      let items = Array.from(stocksDataMutable)
      const [reorderedItem] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, reorderedItem)
      setStocksDataMutable(items)
    }

    const handleDragEvent2 = (result) => {
      if (!result.destination) return;
      let items = Array.from(myStocksDataMutable)
      const [reorderedItem2] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, reorderedItem2)
        setMyStocksDataMutable(items)
    }

    return (
      <div className="stats">
        <div className="stats__container">
          <div className="stats__header">
            <p>Stocks</p>
          </div>
          <div className="stats__content">
            <DragDropContext onDragEnd={handleDragEvent2}>
              <Droppable droppableId="myStockData">
                {(provided) => (
                  <ul
                    className="stats__rows"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {myStocksDataMutable.map((stock, idx) => (
                      <Draggable
                        key={stock.data.ticker}
                        draggableId={stock.data.ticker}
                        index={idx}
                      >
                        {(provided) => (
                          <li
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <StatsRow
                              provided={provided}
                              name={stock.data.ticker}
                              openPrice={stock.info.o}
                              shares={stock.data.shares}
                              price={stock.info.c}
                            />
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          <div className="stats__header stats__lists">
            <p>Lists</p>
          </div>
          <div className="stats__content">
            <DragDropContext onDragEnd={handleDragEvent}>
              <Droppable droppableId="stockData">
                {(provided) => (
                  <ul
                    className="stats__rows"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {stocksDataMutable.map((stock, idx) => (
                      <Draggable
                        key={stock.name}
                        draggableId={stock.name}
                        index={idx}
                      >
                        {(provided) => (
                          <li
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <StatsRow
                              // key={stock.name}
                              provided={provided}
                              name={stock.name}
                              openPrice={stock.o}
                              price={stock.c}
                            />
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    );
}

export default Stats
