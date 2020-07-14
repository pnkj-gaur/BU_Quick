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
    this.state = {categ:"none",feed:[],country:[],state:[],city:[],iscontry:"Global",isstate:"Select State",iscity:"none",
    statedata:[],contrydata:[],citydata:"none",globaldata:[],currentvalue:"none",offset: 0,newsdata: [],perPage: 4,
    currentPage: 0,category:"none",source:[]};
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
  axios.get("https://api.covid19india.org/state_district_wise.json")
  .then(response=>{this.setState({citydata:response.data})})
  axios.get("http://newsapi.org/v2/top-headlines?country=in&apiKey=267f7837790a46679ef8bc1106fd1b8c")
  .then(res=>this.setState({newsdata:res.data.articles}))
  axios.get("http://newsapi.org/v2/top-headlines?country=in&apiKey=267f7837790a46679ef8bc1106fd1b8c")
  .then(res=>this.setState({feed:res.data.articles.slice(0,4)}))

  axios.get("https://newsapi.org/v2/sources?language=en&country=us&apiKey=267f7837790a46679ef8bc1106fd1b8c")
  .then(res=>this.setState({source:res.data.sources})) 
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
  var lnk="http://newsapi.org/v2/top-headlines?country=in&category="+e.target.value+"&apiKey=267f7837790a46679ef8bc1106fd1b8c";
  axios.get(lnk)
  .then(res=>this.setState({feed:res.data.articles.slice(0,4)}))
  axios.get(lnk)
  .then(res=>this.setState({newsdata:res.data.articles}))
}

handleHomeClick=(e)=>{
  axios.get("http://newsapi.org/v2/top-headlines?country=in&apiKey=267f7837790a46679ef8bc1106fd1b8c")
  .then(res=>this.setState({feed:res.data.articles.slice(0,4)}))
  axios.get("http://newsapi.org/v2/top-headlines?country=in&apiKey=267f7837790a46679ef8bc1106fd1b8c")
  .then(res=>this.setState({newsdata:res.data.articles}))
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
  this.cntry=[];
  if (this.state.currentvalue==="country" && prevState.iscontry!==this.state.iscontry && this.state.contrydata.length===0){
   axios.get("https://api.covid19api.com/summary").
    then(response=>{
      this.setState({contrydata:response})})
  }

  if (this.state.currentvalue==="state" && prevState.isstate!==this.state.isstate && this.state.statedata.length===0){
    axios.get("https://api.rootnet.in/covid19-in/stats/latest").
    then(response=>{this.setState({statedata:response.data["data"]["regional"]})})
  }
  if (this.state.currentvalue==="city" && prevState.iscity!==this.state.iscity && this.state.citydata.length===0){
    
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
    this.covidData="";
    let country="";
    let state="";
    let city="";
      country=this.state.country.map((c,index)=><option className="optionchoice" key={index} value={c} >{c}</option>)
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

/*handle side button action */
    let feedshow="<div><h2>Data Not Available</h2></div>";   
        if (this.state.feed.length!==0){
            feedshow=<FeedShow data={this.state.feed} click={this.handleSideClick} clickL={this.state.source} home={this.handleHomeClick}/>
        }


    return (<div>
    <div className="covidCon">
    <div style={{marginBottom:"50px",marginTop:"30px"}}> 
      <select onChange={this.ConChange} className="selector">
        {country}
      </select>

      {state}
      {city}
      
    </div>
      {this.covidData}
      
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
                    pageRangeDisplayed={5}
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

