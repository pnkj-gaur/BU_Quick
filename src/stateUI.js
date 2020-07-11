import React from 'react';
import './App.css';

function StateUI(props){
let active=props.data["totalConfirmed"]-props.data["discharged"]-props.data["deaths"]
return(
    
<div className="datablock">
    <h1 className="location">{props.data["loc"]}</h1>
    <div className="childblock total" >
        <h2>Total Case</h2>
        <p style={{color:"rgba(22, 20, 20, 0.5)"}}>{props.data["totalConfirmed"]}</p>
    </div>

    <div className="childblock active" >
        <h2>Active Case</h2>
        <p style={{color:"black"}}>{active}</p>
    </div>

    <div className="childblock recover" >
        <h2>Recovered</h2>
        <p style={{color:"#47d147"}}>{props.data["discharged"]}</p>
    </div>

    <div className="childblock death" >
        <h2>Death</h2>
        <p style={{color:"#cc3300"}}>{props.data["deaths"]}</p>
    </div>
</div>)
        
}

export default StateUI
