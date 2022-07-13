import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
  state: { //=>data
    data:null,
    cities:[],
    data_keys:[],
    selectedCityData:[],
    noneCityData:"",
    charttypes:[],
    displayCanvas:true,
    myChart:{},
    labels : [],
    values:[],
    chartCounter:0,
    key:"mapdata123!456",
    isAuthenticated:false,
    user:null
  },
  mutations: {//=>methods
    changeData(state, data) {
      state.selectedCityData = data;
  },
  async GetCities(state){
    await axios.get("http://localhost:9000/api/getallcities").then((data)=>{
        state.cities=data
    })
  },
  async GetChartTypes(state){
    await axios.get("http://localhost:9000/api/getcharttypes").then((data)=>{
        state.charttypes=data
    })
  },
  
   ChangeDetailCard(state){
    
    if (JSON.parse(localStorage.getItem("json_data"))==null || JSON.parse(localStorage.getItem("json_data"))==undefined) {
      state.selectedCityData=[]
      state.labels=[]
      state.values=[]
    }else{
      var city = JSON.parse(localStorage.getItem("city"))
    var json_data=[]
     json_data = JSON.parse(localStorage.getItem("json_data") || "[]")
    var selectedCity =[]
     
     if (city == null) {
      state.selectedCityData=[]
      state.noneCityData = ""
     }else{
      selectedCity = Object.entries(json_data).find(selection => selection[1].plaka_kodu == city.plaka_kodu)
      state.noneCityData = city.sehir_isim

      if (selectedCity == undefined) {
        state.selectedCityData = []
      }else{
       var electedCityData = Object.entries(selectedCity[1]).filter(pair => typeof(pair[1])!='string'&&pair[0]!='plaka_kodu')
       var filteredCityData = electedCityData
       //&&
       state.selectedCityData = filteredCityData
      }
      //input durumunda farklı şehir seçme durumunda farklı fonksiyon çalışması gerekiyor
     
     for (let i = 0; i < state.selectedCityData.length; i++) {
      state.labels[i] = state.selectedCityData[i][0];
      state.values[i]=state.selectedCityData[i][1];
    }
    console.log(state.selectedCityData);
     }
    }
  },
  
 
  },
  actions: {//=>calling methods
    changeDataRequest({commit},data){
      commit("changeData",data)//=changeData(state=state,dataToBeChanged=data)
    },
    GetCities({commit}){
      commit("GetCities")
    },
    GetChartTypes({commit}){
      commit("GetChartTypes")
    },
    ChangeDetailCard({commit}){
      commit("ChangeDetailCard")
    },
    
  },
  getters:{//=>computed
    getChangedData(state){ 
      return state.data
    },
    GetCities(state){
      return state.cities
    },
    GetChartTypes(state){
      return state.charttypes
    },
    GetSelectedCity(state){
      return state.selectedCityData
    },
    GetNoneCity(state){
      return state.noneCityData   
    },
    getCryptoKey(state){
      return state.key
    }
  },
  modules: {
  },
})
