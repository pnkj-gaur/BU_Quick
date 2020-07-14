import React from 'react';
import './feedshow.css'


function FeedShow(props){
    return(
        <div style={{marginTop:"80px"}}>
            <h2 style={{textAlign: "center",fontSize: "40px",marginBottom: "30px"}}>News Section</h2>
            <div class="flex-container">
            <div class="flex-item-left">
                <h1 style={{color:"silver",fontFamily: "sans-serif",textAlign: "center"}}>Source Wise</h1><hr style={{marginBottom:"20px",color:"silver"}}></hr>
                <button class="btn">India</button>
                <button class="btn">Entertainment</button>
                <button class="btn">Science</button>
                <button class="btn">Sports</button>
                <button class="btn">News</button>
                <button class="btn">ETC</button>

            </div>
            
            <div class="flex-item-main">
            {
                props.data.map(res=>
                {
                    return(<div class="flex-data">
                        <img class="media-img" src={res["urlToImage"]} />
                        <div class="media-data">
                            <a target="_blank" href={res["url"]} style={{textDecoration: "none",color: "black"}}><h2>{res["title"]}</h2></a>
                            <p>{res["description"]}</p>
                            <span style={{color: "rgb(184, 187, 200)"}}>by:{res["author"]}</span>
                        </div>
                    </div>)
                }
                    
                )
            }
            
            </div>
            <div class="flex-item-right">
                <h1 style={{color:"silver",fontFamily: "sans-serif",textAlign: "center"}}>Category Wise</h1><hr style={{marginBottom:"20px"}}></hr>
                <button class="btn" onClick={props.click} value="technology">Technology</button>
                <button class="btn" onClick={props.click} value="science">Science</button>
                <button class="btn" onClick={props.click} value="sports">Sports</button>
                <button class="btn" onClick={props.click} value="entertainment">Entertainment</button>
                <button class="btn" onClick={props.click} value="health">Health</button>
                <button class="btn" onClick={props.click} value="business">Business</button>

            </div>
            </div>
        </div>
    )
}

export default FeedShow