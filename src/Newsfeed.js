import React from 'react'

import './Newsfeed.css'
import LineGraph from './LineGraph'

function Newsfeed() {
    return (
        <div className="newsfeed">
            <div className="newsfeed__container">
                <div className="newsfeed__chartSection">
                    <div className="newsfeed__portfolio">
                        <h1>$7,123.45</h1>
                        <p>+$69.69 (+0.042) Today</p>
                    </div>
                    <div className="newsfeed__chart">
                        <LineGraph />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newsfeed
