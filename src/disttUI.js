import React from 'react';
import './stateUI.css';

function DisttUI(props){
return(
    
<div className="datablock">
    <h1 className="location">{props.city}</h1>
    <div className="childblock total" >
        <h2>Total Case</h2>
        <p style={{color:"rgba(22, 20, 20, 0.5)"}}>{props.data["confirmed"]}</p>
    </div>

    <div className="childblock active" >
        <h2>Active Case</h2>
        <p style={{color:"black"}}>{props.data["active"]}</p>
    </div>

    <div className="childblock recover" >
        <h2>Recovered</h2>
        <p style={{color:"#47d147"}}>{props.data["recovered"]}</p>
    </div>

    <div className="childblock death" >
        <h2>Death</h2>
        <p style={{color:"#cc3300"}}>{props.data["deceased"]}</p>
    </div>
</div>)
        
}

export default DisttUI
