import React, { useState } from 'react'

import './TimeLine.css'

function TimeLine() {
    const [activeBtn, setActiveBtn] = useState("LIVE")
    var activeButton = "timeline__button"
    var inactiveButton = "timeline__button active"
    return (
        <div className="timeline__container">
            <div className="timeline__buttons__container" onClick={(e)=>{setActiveBtn(e.target.id)}}>
                <div className={activeBtn !== "LIVE" ? activeButton : inactiveButton } id="LIVE">LIVE</div>
                <div className={activeBtn !== "1D" ? activeButton : inactiveButton } id="1D">1D</div>
                <div className={activeBtn !== "1W" ? activeButton : inactiveButton } id="1W">1W</div>
                <div className={activeBtn !== "3M" ? activeButton : inactiveButton } id="3M">3M</div>
                <div className={activeBtn !== "1Y" ? activeButton : inactiveButton } id="1Y">1Y</div>
                <div className={activeBtn !== "ALL" ? activeButton : inactiveButton } id="ALL">ALL</div>                                                                                
            </div>
        </div>
    )
}

export default TimeLine
