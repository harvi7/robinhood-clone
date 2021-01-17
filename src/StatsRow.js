import React from 'react'

import './StatsRow.css'
import StockChart from './stock.svg'
import StockChartDec from './stock2.svg'

function StatsRow({ name, shares, price, openPrice}) {

  const percentage = ((price - openPrice)/openPrice) * 100;

  return (
    <div className="row">
      <div className="row__intro">
        <h1>{name}</h1>
        <p>{shares && 
          (shares + " shares")
        }</p>
      </div>
      <div className="row__chart">
        {percentage >= 0 ? (
          <img src={StockChart} alt="stockchart" height={16} />
        ) : (
          <img src={StockChartDec} alt="stockchart" height={16} />
        )}
      </div>
      <div className="row__numbers">
        <p className="row__price">{price}</p>
        {percentage >= 0 ? (
          <p className="row__percentage"> +{Number(percentage).toFixed(2)}%</p>
        ) : (
          <p className="row__percentageDown"> {Number(percentage).toFixed(2)}%</p>
        )}
        {/* <p className="row__percentage"> +{percentage > 0 && Number(percentage).toFixed(2)}%</p> */}
      </div>
    </div>
  );
}

export default StatsRow
