import React from 'react';
import './feedshow.css'


function FeedShow(props){
    return(
        <div style={{marginTop:"80px"}}>
            <h2 style={{textAlign: "center",fontSize: "40px",marginBottom: "30px"}}>News Section</h2>
            <div class="flex-container">
            <div class="flex-item-left">
                <h1 style={{color:"silver",fontFamily: "sans-serif",textAlign: "center"}}>Sources</h1><hr style={{marginBottom:"20px",color:"silver"}}></hr>
                {
                props.clickL.map(res=>
                {
                    return(
                    < button target="_blank" class="btn"><a className="link" target="_blank" href={res["url"]}>{res["name"]}</a></button>
                    )
                }
                    
                )
            }

            </div>
            
            <div class="flex-item-main">
            {
                props.data.map(res=>
                {
                    let sorc="https://image.shutterstock.com/image-vector/house-not-available-icon-flat-260nw-1030785001.jpg";
                    let by="Unknown Source";
                    let desc="Oops! Description is not available";
                    if(res["urlToImage"]!==null)
                        {
                            sorc=res["urlToImage"];  
                        }
                    
                    if(res["author"]!==null)
                        {
                            by=res["author"];
                        }
                    if(res["description"]!==null)
                        {
                            desc=res["description"];
                        }
                    
                    return(<div class="flex-data">
                        <img class="media-img" src={sorc} />
                        <div class="media-data">
                            <a target="_blank" href={res["url"]} style={{textDecoration: "none",color: "black"}}><h2>{res["title"]}</h2></a>
                            <p>{desc}</p>
                            <span style={{color: "rgb(184, 187, 200)"}}>by:{by}</span>
                        </div>
                    </div>)
                }
                    
                )
            }
            
            </div>
            <div class="flex-item-right">
                <h1 style={{color:"silver",fontFamily: "sans-serif",textAlign: "center"}}>Category Wise</h1><hr style={{marginBottom:"20px"}}></hr>
                <button class="btn" onClick={props.home} value="home">Home</button>
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