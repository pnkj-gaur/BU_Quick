import React from 'react';
import './App.css';
import axios from 'axios'
import DisttUI from './disttUI.js'
import StateUI from './stateUI.js'
import CountryUI from './countryUI.js'
import {cities} from './state_city.js'
import {countries} from './countryName.js'
import FeedShow from './feedshow.js'
import ReactPaginate from 'react-paginate';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {categ:"none",feed:[],country:[],state:[],city:[],iscontry:"India",isstate:"Select State",iscity:"none",
    statedata:[],contrydata:[],citydata:"none",globaldata:[],currentvalue:"country",offset: 0,newsdata: [],perPage: 4,
    currentPage: 0,category:"none",source:[],covidshow:"",leftshow:"none",rightshow:"none"};
    this.ConChange=this.ConChange.bind(this);
    this.StChange=this.StChange.bind(this);
    this.CityChange=this.CityChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.pagination=this.pagination.bind(this);
    this.handleHomeClick=this.handleHomeClick.bind(this);
  }
count=countries;
states=["Select State","Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh","Chhattisgarh",
      "Delhi", "Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir",
      "Jharkhand","Karnataka","Kerala","Ladakh","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
      "Nagaland","Odisha","Puducherry","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
      "Uttarakhand","West Bengal"]

  pagination()
  {
      let slice=this.state.newsdata.slice(this.state.offset,this.state.offset + this.state.perPage);
      this.setState({feed:slice,pageCount:Math.ceil(this.state.newsdata.length / this.state.perPage)})
      
  }
componentDidMount(){
  this.setState({country:this.count});
  axios.get("https://api.covid19api.com/summary").then(response=>{this.setState({globaldata:response})});

  axios.get("https://api.covid19api.com/summary").
    then(response=>{this.setState({contrydata:response})})

  axios.get("https://api.covid19india.org/state_district_wise.json")
  .then(response=>{this.setState({citydata:response.data})})

  axios.get("https://api.rootnet.in/covid19-in/stats/latest").
    then(response=>{this.setState({statedata:response.data["data"]["regional"]})})

  axios.get("https://saurav.tech/NewsAPI/top-headlines/category/general/in.json")
  .then(res=>this.setState({newsdata:res.data.articles}))
  axios.get("https://saurav.tech/NewsAPI/top-headlines/category/general/in.json")
  .then(res=>this.setState({feed:res.data.articles.slice(0,4)}))

  axios.get("https://saurav.tech/NewsAPI/sources.json")
  .then(res=>this.setState({source:res.data.sources})) 

  if((this.state.iscontry==="India")){
      this.setState({state:this.states});
  }
}


handlePageClick = (e) => {
  const selectedPage = e.selected;
  const offset = selectedPage * this.state.perPage;

  this.setState({
      currentPage: selectedPage,
      offset: offset
  }, () => {
      this.pagination()
  });
};

handleSideClick=(e)=>{
  var lnk="https://saurav.tech/NewsAPI/top-headlines/category/"+e.target.value+"/in.json";
  axios.get(lnk)
  .then(res=>this.setState({feed:res.data.articles.slice(0,4)}))
  axios.get(lnk)
  .then(res=>this.setState({newsdata:res.data.articles}))
  if(this.state.rightshow==="block"){
  this.setState({rightshow:"none"})
  }
}

handleHomeClick=(e)=>{
  axios.get("https://saurav.tech/NewsAPI/top-headlines/category/general/in.json")
  .then(res=>this.setState({feed:res.data.articles.slice(0,4)}))
  axios.get("https://saurav.tech/NewsAPI/top-headlines/category/general/in.json")
  .then(res=>this.setState({newsdata:res.data.articles}))
  if(this.state.rightshow==="block"){
    this.setState({rightshow:"none"})
    }
}

getSnapshotBeforeUpdate(prevProps, prevState) {
  
  
  if((this.state.iscontry==="India")){
    if((prevState.iscontry!==this.state.iscontry)){
      this.setState({state:this.states});
    }  
  }
  if((this.state.isstate!=="Select State")){
    if((prevState.isstate!==this.state.isstate)){
      
      cities["states"].map(res=>{
        if(res["state"]===this.state.isstate)
        this.setState({city:res["districts"]});})

    }
    
   }

 
  
}
componentDidUpdate(prevProps,prevState){
  
    
  }

hideShow=()=>
{
  if(this.state.covidshow==="none")
  {
    this.setState({covidshow:""})
  }
  else
  {
    this.setState({covidshow:"none"})
  }
}
leftshowbtn=()=>
{
   if(this.state.leftshow==="none")
   {
      this.setState({leftshow:"block"})
   }
   else
   {
      this.setState({leftshow:"none"})
   }
}
rightshowbtn=()=>
{
   if(this.state.rightshow==="none")
   {
      this.setState({rightshow:"block"})
   }
   else
   {
      this.setState({rightshow:"none"})
   }
}
 
ConChange(e){
    this.setState({iscontry:e.target.value,isstate:"Select State",iscity:"none",currentvalue:"country",city:[],state:[]});    
}
StChange(e){
  this.setState({isstate:e.target.value,iscity:"none",currentvalue:"state",city:[]}); 
}
CityChange(e){
  this.setState({iscity:e.target.value,currentvalue:"city"});
}

  render() {  
    this.covidData=<div style={{textAlign:"center"}}><h2>No Data Available!</h2></div>;
    let country="";
    let state="";
    let city="";
      country=this.state.country.map((c,index)=>
      {
        let rs="";
        if(c==="India")
        {
          return <option className="optionchoice" selected key={index} value={c} >{c}</option>
        }
        else
        {
          return <option className="optionchoice"  key={index} value={c} >{c}</option>
        }
      })
      if (this.state.iscontry!=="none" && this.state.iscontry==="India"){
        state=<select onChange={this.StChange} className="selector">{this.state.state.map((c,index)=><option className="option" key={index} value={c} >{c}</option>)}</select>;
      }
      if(this.state.isstate!=="Select State" && this.state.isstate!=="updated"){
        city=<select onChange={this.CityChange} className="selector">{this.state.city.map((c,index)=><option className="option" key={index} value={c} >{c}</option>)}</select>;
      }
/*Country UI Access */
      if (this.state.currentvalue==="country" && this.state.contrydata.length!==0){
        this.state.contrydata.data["Countries"].map(res=>{
          if (res["Country"]===this.state.iscontry){
            this.covidData=<CountryUI data={res} contry={this.state.iscontry}/>
          }
        })
     
      }
/*State UI Access */
      else if(this.state.currentvalue==="state" && this.state.isstate!=="Select State"){
        this.state.statedata.map(res=>{
          if(res["loc"]===this.state.isstate){
            this.covidData=<StateUI data={res} />
          }
        })
      }
      

/*City UI Access */
      else if(this.state.currentvalue==="city" && this.state.iscity!=="none" && this.state.citydata.length!==0){
        this.covidData=<DisttUI data={this.state.citydata[this.state.isstate]["districtData"][this.state.iscity]} city={this.state.iscity} />
      }
/*Global UI Access */ 
      if (this.state.iscontry==="Global" && this.state.globaldata.length!==0){
        this.covidData=<CountryUI data={this.state.globaldata.data["Global"]} contry="Global Data"/>
      }
/*Country UI Access if State Unselected */    
    if(this.state.currentvalue==="state" && this.state.isstate==="Select State"){
      this.state.contrydata.data["Countries"].map(res=>{
        if (res["Country"]===this.state.iscontry){
          this.covidData=<CountryUI data={res} contry={this.state.iscontry}/>
        }
      })
    }
/*State UI Access if Distt Unselected */    
    if(this.state.currentvalue==="city" && this.state.iscity==="Select Distt"){
      this.state.statedata.map(res=>{
        if(res["loc"]===this.state.isstate){
          this.covidData=<StateUI data={res} />
        }
      })
    }

/*handle feed site*/
    let feedshow=<div style={{textAlign:"center"}}><h1>Oops! You are Offline.</h1></div>;   
        if (this.state.feed.length!==0){
            feedshow=<FeedShow data={this.state.feed} click={this.handleSideClick} clickL={this.state.source} 
            lsideshow={this.state.leftshow} rsideshow={this.state.rightshow} home={this.handleHomeClick}
            lsidebtn={this.leftshowbtn} rsidebtn={this.rightshowbtn}/>
        }
/*covid data hide/show */ 
var showbtn="";
var covidstyle=
  {
      display:this.state.covidshow,
  }
  if(this.state.covidshow==="none")
  {
    showbtn=<button onClick={this.hideShow} style={{backgroundColor:"green"}} >Show Covid Tracker</button>
  }
  else
  {
    showbtn=<button onClick={this.hideShow} style={{backgroundColor:"rgba(241, 10, 10, 0.884)"}} >Hide Covid Tracker</button>
  }

/* end render*/
    return (<div>
    <div className="covidShow">
    {showbtn}
    </div>
    <div className="covidCon" style={covidstyle}>
    <div style={{textAlign: "center",fontSize: "40px",fontWeight: "550",marginBottom: "6px"}}>COVID-19 Tracker</div>
    <div style={{marginBottom:"50px",marginTop:"30px"}}> 
      <select onChange={this.ConChange} className="selector">
        {country}
      </select>

      {state}
      {city}
      
    </div>
    
      {this.covidData}
      
  </div>
  <h2 style={{textAlign: "center",fontSize: "40px",marginBottom: "5px"}}>News Section</h2><hr style={{width:"250px",color:"#333",
      marginBottom:"30px"}}></hr>
  <div className="sidebtndiv">
      <button className="sidebtnleft" onClick={this.leftshowbtn} >By Sources</button>
      <button className="sidebtnright" onClick={this.rightshowbtn}>By Category</button>
  </div> 

  {feedshow}
  <div className="pagindiv">
  <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
  </div>
  </div>
  );
  }
}


export default  App;

