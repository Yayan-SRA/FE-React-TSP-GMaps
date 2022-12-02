import React, {useState, useEffect} from 'react';
import {
  useJsApiLoader,
  GoogleMap, Marker, LoadScript, Autocomplete, InfoWindow, DirectionsRenderer
} from "@react-google-maps/api";
import styles from "./styles/Home.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal, Row, Col, Form, FormGroup, Table} from 'react-bootstrap/';
import axios from "axios";
import load from "../images/load.gif"

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByPlaceId
} from "react-places-autocomplete";

function Home() {
  const [add, setAdd] = useState(0);
  const [help, setHelp] = useState(0);
  const [requireAdd, setRequireAdd] = useState(0);
  const [btn, setBtn] = useState(0);
  const [update, setUpdate] = useState(0);
  const [lat, setLat] = useState(-6.990088294950433)
  const [lng, setLng] = useState(110.42284174075986)
  // const [address, setAddress] = useState("")
  const [selected, setSelected] = useState(null)
  const [ libraries ] = useState(['places']);
  const [address, setAddress] = React.useState("");
  const [name, setName] = React.useState("");
  const [placeData, setPlaceData] = React.useState([]);
  const [startingPoint, setStartingPoint] = React.useState(false);
  const [coordinates, setCoordinates] = React.useState({
    lat: -6.990088294950433,
    lng: 110.42284174075986
  });
  const [directionsResponse, setDirectionsResponse] = useState([])
  const [savingDirection, setSavingDirection] = useState([])


  // algen state
  const [jumlah, setJumlah] = useState([])
  const [number, setNumber] = useState([])
  const [button, setButton] = useState(0)
  const [pm, SetPm] = useState(0)
  const [pc, SetPc] = useState(0)
  const [maxGenerasi, SetMaxGenerasi] = useState(0)
  const [kromosom, SetKromosom] = useState(0)
  const [algen, setAlgen] = useState(0)
  const [population, SetPopulation] = useState([])
  const [gen, SetGen] = useState(null)
  const [distance, setDistance] = useState([])
  const [savingDistance, setSavingDistance] = useState([])
  const [generateDistanceButton, setGenerateDistanceButton] = useState(0);
  const [loadingDistance, setLoadingDistance] = useState(0);
  const [btnShowDistance, setBtnShowDistance] = useState(0);
  const [btnStartCalculate, setBtnStartCalculate] = useState(0);
  const [requireBtn, setRequireBtn] = useState(0);
  const [getFinalDestinationBtn, setGetFinalDestinationBtn] = useState(0);
  const [populationE, SetPopulationE] = useState([])
  const [populationS, SetPopulationS] = useState([])
  const [resultSelection, SetResultSelection] = useState([])
  const [populationC, SetPopulationC] = useState([])
  const [populationM, SetPopulationM] = useState([])
  const [populationAll, SetPopulationAll] = useState([])
  const [populationFinal, SetPopulationFinal] = useState([])
  const [populationFinalFilter, SetPopulationFinalFilter] = useState([])
  const [rute, SetRute] = useState([])
  const [repairBtn, setRepairBtn] = useState(0)
  const [originR, setOriginR] = useState(null)
  const [destinationR, setDestinationR] = useState(null)
  const [originRouteFinal, setOriginRouteFinal] = useState(null)
  const [destinationRouteFinal, setDestinationRouteFinal] = useState(null)
  const [directionFinal, setDirectionFinal] = useState([])
  // end algen state

  // var geocoder = new google.maps.Geocoder();

  useEffect(() => {
    fetchdata();
}, [])

const fetchdata = async () => {
    try {
        let response = await axios.get("https://be-react-gmaps.herokuapp.com/api/v1/algen/list")
        console.log("isi response", response.data.data)
        let valueRes = response.data.data[0]
        if(valueRes.startingPoint === true){
          setRequireAdd(1)
        } else {
          setRequireAdd(0)
        }
        console.log("isi value response", valueRes)
        setPlaceData(response.data.data)
    } catch (error) {
        console.log(error)
    }
}
  
  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  function tes(event){
    const lat = event.latLng.lat()
    const lng = event.latLng.lng()
    setCoordinates({
      lat: lat,
      lng: lng
    })

  }

  const center = {
    lat: -6.990088294950433,
    lng: 110.42284174075986
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GMAPS_API,
    libraries,
  })

  const mapRef = React.useRef();
  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map
  }, [])

  // Function for button require
  function Ttes(){
    console.log("masuk sini")
    setAdd(1)
    setRequireBtn(1)
    
  }

  function Cancel(){
    setAdd(0)
    setRequireBtn(0)
  }

  function Data(){
    setBtn(1)
    setRequireBtn(1)
  }

  function CloseData(){
    setBtn(0)
    setRequireBtn(0)
  }

  async function ruteCalculate(){
    try {
      setAlgen(1)
      setRequireBtn(1)
      // console.log("isi jumlah", jumlah)
    } catch (error) {
      console.log(error)
    }
  }

  function CloseRuteCalculate(){
    setAlgen(0)
    setRequireBtn(0)
  }
  // End of Function for button require

  function coba(){
    const fill = {'lat':lat,'lng':lng}
    console.log("masuk sini")
    console.log("masuk sini2", fill)
    setSelected(fill)
    console.log("isi selected", selected)
  }

  async function save(e){
    e.preventDefault();
    try {
      let response = await axios.post(`https://be-react-gmaps.herokuapp.com/api/v1/algen/create`, {
        name: name,
        address: address,
        lat: coordinates.lat,
        lng: coordinates.lng,
        startingPoint: startingPoint
    })
    console.log(response.data)
    if(response){
      window.location.reload();
    }
    } catch (error) {
      console.log(error)
    }
  }
  
  async function del(id){
    try {
      let response = await axios.delete(`https://be-react-gmaps.herokuapp.com/api/v1/algen/delete/${id}`)
      if(response){
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  }

  function upd(){
    setUpdate(1)
    setBtn(0)
  }

  // algen

    // function
    // create matrix
    function createMatrix(m,n){
      let matrix = ".".repeat(m).split(".").map( s=> {return ".".repeat(n).split(".").map(s => {return 0})});
      return matrix
    }

    function createMatrixOne(n){
      let matrix = ".".repeat(n).split(".").map(s => {return 0});
      return matrix
    }
    function createMatrixOneObject(n){
      let matrix = ".".repeat(n).split(".").map(s => {return { }});
      return matrix
    }
    function createMatrixOne1(n){
      let matrix = ".".repeat(n).split(".").map(s => {return undefined});
      return matrix
    }
    // end create matrix
    
    // random
    function getRndFloat(min, max) {
      return Math.random() * (max - min + 1) + min;
    }
    // end random

    // suffle
    function shuffle(array) {
      let currentIndex = array.length,  randomIndex;
    
      // While there remain elements to shuffle.
      while (currentIndex !== 0) {
    
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
    
      return array;
    }
    // end suffle

    // drop duplicate
    function dropDuplicate(pop) {
      let sementara = []
      for(let i=0;i<pop.length;i++){
        if(sementara.length === 0){
          sementara.push([...pop[i]])
        } else if(pop.length>0){
          for (let j=0;j<sementara.length;j++) {
            let test = pop[i][gen+1] !== sementara[j][gen+1]
            if(test === true && j===sementara.length-1){
              sementara.push([...pop[i]])
            }else if(test === false){
              break;
            }
          }
        }
      }
      pop.splice(0, pop.length); 
      for(let p=0;p<sementara.length;p++){
        pop.push([...sementara[p]])
      }
    }
    // end dropduplicate
    // end function

    
    function createPopulation(){
    // make matrix kromosom-1 x gen-1 with 0 fill
    let mat = createMatrix(kromosom-1,gen-1)
    for(let i=0;i<kromosom;i++){
      population.push([...mat[i]])
    }

    // fulfill the matrix with random permutasion of jumlah
    for(let i=0; i<kromosom;i++){
      const hasil = shuffle(jumlah);
      for(let j=1; j<gen;j++){
        population[i][j] = hasil[j-1]
      }
    }
    console.log(population)
  }

  var delay = 0;
  function getRoute(request,x){
    // eslint-disable-next-line no-undef
    const directions = new google.maps.DirectionsService()
    directions.route(request, function(result, status) {
      // console.log("isi status", status)
        // eslint-disable-next-line no-undef
        if (status === google.maps.DirectionsStatus.OK) {
          directionsResponse[x] = result
          // console.log(result)
          // directionsResponse.push(result)
        // eslint-disable-next-line no-undef
        } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
            // console.log("masuk sini 2")
            delay++;
            setTimeout(function () {
                getRoute(request, x);
            }, delay * 1000);
        } else {
            console.log("Route: " + status);
        }
    });
  }

  function solution(pop){
    // try {
      if(directionsResponse.length>0){
        // console.log("Sasuk sini")
        directionsResponse.splice(0, directionsResponse.length); 
      }
      const solu = createMatrixOneObject(placeData.length)
      console.log("isi dist", solu)
      for(let q=0;q<solu.length;q++){
        directionsResponse.push(solu[q])
      }
      // console.log("isi distres", savingDirection)
      console.log("isi disini",pop)
      const sol = pop[0]
      const a = createMatrixOne(gen);
      for(let p=0;p<gen;p++){
        a[p] = placeData[sol[p]].address
      }
      a[gen] = placeData[sol[0]].address
  
      for(let i=0;i<placeData.length;i++){
        if(i === placeData.length-1){
          let request = {
            origin: a[i],
            destination: a[0],
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING
          };
          const x = i
          getRoute(request,x);
        }else{
          let request = {
            origin: a[i],
            destination: a[i+1],
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING
          };
          const x = i
          getRoute(request,x);
        }
      }
      console.log("isi distres2", directionsResponse)
    // } catch (error) {
    //   console.log(error)
    // }
  }
  // console.log("isi distres2", directionsResponse)

  async function solution1(){
    // console.log("isi address", placeData[0].address)
    console.log(population)
    const sol = population[0]
    const a = createMatrixOne(gen);
    for(let p=0;p<gen;p++){
      a[p] = placeData[sol[p]].address
    }
    a[gen] = placeData[sol[0]].address
    console.log("isi a", a)
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    for(let i=0;i<placeData.length;i++){
      if(i === placeData.length-1){
        const results = await directionsService.route({
          origin: a[i],
          destination: a[0],
          
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING
        })
        // console.log("isi result", results)
        // setDirectionsResponse(results)
        directionsResponse.push(results)
      }else{
        const results = await directionsService.route({
          origin: a[i],
          destination: a[i+1],
          
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING
        })
        // console.log("isi result", results)
        // setDirectionsResponse(results)
        directionsResponse.push(results)
      }
    }
    // setSavingDirection(directionsResponse)
    // console.log("isi direct", directionsResponse)
  } 
  // console.log("tes save",savingDirection)

var delayFactor = 0;
function m_get_directions_route (request, x,y) {
  // console.log("isi request", request)
  const req = request
  const a = x
  const b = y
  // eslint-disable-next-line no-undef
  const directions = new google.maps.DirectionsService()
    directions.route(req, function(result, status) {
      // console.log("isi status", status)
        // eslint-disable-next-line no-undef
        if (status === google.maps.DirectionsStatus.OK) {
          // console.log("masuk sini")
            //Process you route here
            const dist =result.routes[0].legs[0].distance.text
            // console.log("isi dist", dist)
            const space = dist.indexOf(" ")
            const distFix = parseFloat(dist.slice(0,space))
            console.log("hasil", a,b, " = ", distFix)
            // savingDistance.push(distFix)
            distance[a][b] = distFix
            if(a === placeData.length-1 && b === placeData.length-2){
              setLoadingDistance(1)
            }
        // eslint-disable-next-line no-undef
        } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
            // console.log("masuk sini 2")
            delayFactor++;
            setTimeout(function () {
                m_get_directions_route(req, a,b);
            }, delayFactor * 1000);
        } else {
            console.log("Route: " + status);
        }
    });
}

function getDirection(){
  const dist = createMatrix(placeData.length-1,placeData.length-1)
  console.log("isi dist", dist)
  for(let q=0;q<dist.length;q++){
    distance.push([...dist[q]])
  }
  // console.log("isi dist2", distance)
  for (let i = 0; i < placeData.length; i++) {
    for(let p=0;p<placeData.length;p++){
      if(i !== p){
        let request = {
          origin: placeData[i].address,
          destination: placeData[p].address,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING
        };
        console.log(i, " x ", p)
        // const isi = (`${i} x ${p}`)
        const x = i
        const y = p
        m_get_directions_route(request, x,y);
      }else{
        console.log("tidak ada karena sama")
        // savingDistance.push(0)
      }
    }
  }
  console.log("isi dist2", distance)
  
}

  function check(){
    // double checking if there zeroes matrix
  for(let s=0;s<placeData.length;s++){
    for(let r=0;r<placeData.length;r++){
      if(s !== r){
        if(distance[s][r] === 0){
          let request = {
            origin: placeData[s].address,
            destination: placeData[r].address,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING
          };
          console.log(s, " x ", r)
          // const isi = (`${i} x ${p}`)
          const x = s
          const y = r
          m_get_directions_route(request, x,y);
        }else{
          console.log("proses",s,"x",r)
        }
      }else if(s === placeData.length-1 && r === placeData.length-1){
        // setLoadingDistance(1)
        console.log("teslah ya")
      }
      else{
        console.log("proses",s,"x",r)
      }
    }
  }
      console.log("isi dist2", distance)
  }

  var delayF = 0;
function directionsRouteRepair (request, x,y) {
  // console.log("isi request", request)
  const req = request
  const a = x
  const b = y
  // eslint-disable-next-line no-undef
  const directions = new google.maps.DirectionsService()
    directions.route(req, function(result, status) {
      // console.log("isi status", status)
        // eslint-disable-next-line no-undef
        if (status === google.maps.DirectionsStatus.OK) {
          // console.log("masuk sini")
            //Process you route here
            const dist =result.routes[0].legs[0].distance.text
            // console.log("isi dist", dist)
            const space = dist.indexOf(" ")
            const distFix = parseFloat(dist.slice(0,space))
            console.log("hasil", a,b, " = ", distFix)
            // savingDistance.push(distFix)
            distance[a][b] = distFix
        // eslint-disable-next-line no-undef
        } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
            // console.log("masuk sini 2")
            delayF++;
            setTimeout(function () {
              directionsRouteRepair(req, a,b);
            }, delayF * 1000);
        } else {
            console.log("Route: " + status);
        }
    });
}

  function Repair(e){
    try {
      e.preventDefault();
      const ori = originR
      const dest = destinationR
      let request = {
        origin: placeData[ori].address,
        destination: placeData[dest].address,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING
      };
      console.log(originR, " x ", destinationR)
      // const isi = (`${i} x ${p}`)
      const x = originR
      const y = destinationR
      directionsRouteRepair(request, x,y);
      setRepairBtn(0)
      setBtnShowDistance(0)
    } catch (error) {
      console.log(error)
    }
  }

  async function fitness(pop) {
    for(let i=0;i<pop.length;i++){
      let a = pop[i]
      let b = 0

      for(let p=0;p<gen-1;p++){
        b += distance[a[p]][a[p+1]]
      }
      b += distance[a[gen-1]][a[0]]

      // fitness[i]=b
      pop[i][gen]=1/b
      pop[i][gen+1]=parseFloat((b).toFixed(2))
    }
    console.log("isi pop",pop)
    return pop
}

// metode seleksi elitisme
  function elitisme(pop){
    if(populationE.length>0){
      // console.log("Sasuk sini")
      populationE.splice(0, populationE.length); 
    }
    // console.table(pop)
    for(let i=0;i<pop.length;i++){
      populationE.push([...pop[i]])
    }
    populationE.sort(function (x, y) {
      return y[gen] - x[gen];
    });
    if(parseInt((5/100)*populationE.length)<5){
      populationE.splice(5, populationE.length-5)
    }else{
      populationE.splice(parseInt((5/100)*populationE.length), populationE.length-parseInt((5/100)*populationE.length));
    }
    // console.table(populationE)
  }
// end elitisme

// selection method (roulete wheel)
async function selection(pop){
  if(populationS.length>0){
    populationS.splice(0, populationS.length); 
  }
  if(resultSelection.length>0){
    resultSelection.splice(0, resultSelection.length); 
  }
  // copy dari populasi ke populasiS
  for(let p=0;p<pop.length;p++){
      populationS.push([...pop[p]])
  }
  // hitung total fitness
  let total = 0
  for(let i=0;i<populationS.length;i++){
    total += populationS[i][gen]
  }

  // hitung probabilitas tiap kromosom/individu
  for(let k=0;k<populationS.length;k++){
    let proba = (populationS[k][gen]/total)
    populationS[k][gen+2] = proba
  }

  // hitung komulatif 
  let calculate = 0
  for(let l=0;l<populationS.length;l++){
    calculate += populationS[l][gen+2]
    populationS[l][gen+3] = calculate
  }
  
  // proses seleksi utama
  for(let m=0;m<populationS.length;m++){
    // angka acak antara 0 dan 1
    const random = getRndFloat(0,0)
    if(random >= 0 && random < populationS[0][gen+3]){
      resultSelection.push([...populationS[0]])
    } else{
      for(let i=0;i<populationS.length;i++){
        if(random > populationS[i][gen+3] && random < populationS[i+1][gen+3]){
          resultSelection.push([...populationS[i+1]])
        }
      }
    }
  }
  // console.table(resultSelection)
  for(let k=0;k<resultSelection.length;k++){
    resultSelection[k].splice(gen+2, gen+3);
  }

  pop.splice(0, pop.length);
  for(let j=0;j<resultSelection.length;j++){
    pop.push([...resultSelection[j]])
  }
  console.table(pop);
}
// end rw

// crossover
function crossover(pop){
  if(populationC.length>0){
    populationC.splice(0, populationC.length); 
  }
  const cross = parseInt(pc*pop.length)
  for(let i=0;i<cross;i++){
    let parent1 = pop[i]
    for(let y=0;y<cross;y++){
    let parent2 = []
    if(i === y){
      if(i === cross-1){
        break
      }else{
        parent2 = pop[y+1]
        y++
      }
    } else{
      parent2 = pop[y]
    }

    let batas = parseInt(gen/3)
    let random = shuffle(jumlah)
    let validasi = []
    for(let p=0;p<random.length;p++){
      if(validasi.length > 0) {
        break; 
      }
      for(let q=1;q<random.length;q++){
        if(validasi.length > 0) { break; }
        if(random[p] !== random[q]){
          let isi = random[p]-random[q]
          if(isi === (batas-1) || isi === -(batas-1)){
            if(isi === (batas-1)){
              validasi.push(random[q])
              for(let y=1;y<batas;y++){
                if(random[q]+y === random[p]){ break;}
                validasi.push(random[q]+y)
              }
              validasi.push(random[p])
            }else if(isi === -(batas-1)){
              validasi.push(random[p])
              for(let y=1;y<batas;y++){
                if(random[p]+y === random[q]){ break;}
                validasi.push(random[p]+y)
              }
              validasi.push(random[q])
            }
          }
        }
      }
    }
    let child = createMatrixOne1(gen-1)
    for(let k=0;k<validasi.length;k++){
      child[validasi[k]] = parent1[validasi[k]]
    }

  let f=0
  let progress =0
  while(f<gen){
      if(child[f] === undefined){
      for(let h = progress;h<gen;h++){
        
          let ck = 0
          for(let j=0;j<validasi.length;j++){
            let tes = parent2[h] === child[validasi[j]]
            if(tes === true){
              ck = 1;
              break;
            }
          }
          if(ck === 0){
            child[f] = parent2[h]
            f++
            progress = h+1
            break;
          }
      }
    }else{
      f++
    }
  }
  populationC.push(child)

    }
  }
  // console.log(populationC)
}
// end crossover

// mutation
function mutation(pop){
  if(populationM.length>0){
    populationM.splice(0, populationM.length); 
  }
    const mutt = parseInt(pm*pop.length)
    const half = Math.round(mutt/2)
    for (let i=half;i<mutt;i++){
      populationM.push([...pop[i]])
    }

    for(let p=0;p<populationM.length;p++){
      let posisi = shuffle(jumlah)
      let a = posisi[0]
      let b = posisi[1]
      let tampung = populationM[p][a]
      populationM[p][a] = populationM[p][b]
      populationM[p][b] = tampung
    }
    
    let poprs = []
    for(let p=0;p<half;p++){
    const popr = pop[p]
    poprs = createMatrixOne1(gen-1)
    poprs[0] = 0
    for (let i=1;i<gen;i++){
      poprs[gen-i] = popr[i]
    }
    populationM.push(poprs)
  }
}
// end mutation

// elimination
function elimination(pop){
  if(pop.length > 0){
    pop.splice(0, pop.length);
  }
  let popAll = population.concat(populationE, populationC, populationM)
  dropDuplicate(popAll)
  popAll.sort(function (x, y) {
    return y[gen] - x[gen];
  });
  popAll.splice(kromosom, popAll.length);
  for(let i=0;i<popAll.length;i++){
    pop.push([...popAll[i]])
  }
  // console.log("isi pop3", pop)
}
// end elimination

// add generation
function addGeneration(pop){
  const add = populationFinal.push(pop[0])
  if(add){
    populationFinalFilter.push(pop[0])
  }
}
// end add generation

// new population
function newPopulation(pop){
  pop.splice(0, pop.length);
  populationAll.sort(function (x, y) {
    return y[gen] - x[gen];
  });
  populationAll.splice(kromosom, populationAll.length);
  for(let i=0;i<populationAll.length;i++){
    pop.push([...populationAll[i]]);
  }
  console.log("isi pop akhir", pop)
} 
// end new population

  async function generate(){
    setButton(1)
    createPopulation()
    solution(population)
    fitness(population)
  }

  function route(pop){
    for(let i=0;i<gen;i++){
      // rute.push(placeData[pop[0][i]].address)
      rute.push({
        'position': pop[0][i],
        'address':placeData[pop[0][i]].address
      })
    }
  }

  async function start(){
    setButton(2)
    for(let g=1;g<=maxGenerasi;g++){
      elitisme(population)
      selection(population)

      crossover(population)
      fitness(populationC)

      mutation(populationC)
      fitness(populationM)

      elimination(populationAll)

      addGeneration(populationAll)

      populationFinalFilter.sort(function (x, y) {
        return y[gen] - x[gen];
      });

      newPopulation(population)
    }
    route(population)
    solution(population)
    console.table(populationFinal)
  }

  function clear(){
    SetPopulation([])
    SetPopulationFinal([])
    SetRute([])
    setDirectionsResponse([])
    setButton(0)
  }

  function btnDisatnce(){
    try {
        // isi jumlah
        for(let i=1;i<placeData.length;i++){
          jumlah.push(i)
        }        
        // end isi jumlah
        // set gen amount
        SetGen(placeData.length)
        // end set gen amount
        // fullfil number
        for(let p=1;p<placeData.length;p++){
          number.push(p)
        }
        // end fullfil number
        setGenerateDistanceButton(1)
        getDirection()
    } catch (error) {
      console.log(error)
    }
    // check()
    // setLoadingDistance(1)
  }
  // end algen

  // direct Final
  var delayy = 0;
  function directFinal(request){
    // eslint-disable-next-line no-undef
    const directions = new google.maps.DirectionsService()
    directions.route(request, function(result, status) {
      // console.log("isi status", status)
        // eslint-disable-next-line no-undef
        if (status === google.maps.DirectionsStatus.OK) {
          // directionsResponse[x] = result
          setDirectionFinal(result)
          // console.log(result)
          // directionsResponse.push(result)
        // eslint-disable-next-line no-undef
        } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
            // console.log("masuk sini 2")
            delayy++;
            setTimeout(function () {
                directFinal(request);
            }, delayy * 1000);
        } else {
            console.log("Route: " + status);
        }
    });
  }
  // end direct Final

  // search destination Final
  function search(e){
    try {
      e.preventDefault();
      const ori = originRouteFinal
      const dest = destinationRouteFinal
      let request = {
        origin: placeData[ori].address,
        destination: placeData[dest].address,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING
      };
      // console.log(originR, " x ", destinationR)
      // const isi = (`${i} x ${p}`)
      // const x = originR
      // const y = destinationR
      directFinal(request);
    } catch (error) {
      console.log(error)
    }
  }
  //end search destination Final

  return isLoaded ? (
    <>
    {/* <Header/> */}
    <div className={styles.Home}>
                <div className="container">
                      <section style={{margin:'auto'}}>
                      <div className={styles.Test}>
                        <GoogleMap
                          mapContainerStyle={{width:'100%', height:'600px'}}
                          center={center}
                          zoom={12.2}
                          onLoad={onLoad} 
                          
                        >
                          { /* Child components, such as markers, info windows, etc. */ }
                          <></>
                          {/* <Marker position={center} onClick={()=>{coba()}}/> */}
                          {directionsResponse.map((direct, index) =>
                          <DirectionsRenderer key={index} directions={direct} />)}
                          {selected ?
                          <InfoWindow 
                            position={{lat:selected.lat,lng:selected.lng}}
                            onCloseClick={()=>{
                              setSelected(null)
                            }}
                          // onCloseclick={()=>{closed()}}
                          // options={{pixelOffset: new google.maps.Size(0,-30)}}
                          >
                            <div>
                              <h5>Position</h5>
                              <p>lat : {selected.lat}</p>
                              <p>lng : {selected.lng}</p>
                            </div>
                          </InfoWindow>
                          : null}
                        </GoogleMap>
                      </div>  
                      {/* {add == 0 ? 
                      :
                      <></>
                      } */}
                    </section>
                    <section>
                      {selected? 
                      <h3>{selected.lat}</h3>
                      
                      : null}

                        {add === 0 ? 
                        
                        <Button className={styles.btn} onClick={() =>Ttes()}>Add Destination</Button>
                        :
                          <Button className={styles.btn} variant='danger'  onClick={() =>Cancel()}>Cancel</Button>
                        }
                        {' '}
                        {btn === 0 ? 
                        <Button variant='info' onClick={() =>Data()} className={styles.tes}>Data</Button>
                        : 
                        <Button variant='danger'  onClick={() =>CloseData()}>Close</Button>

                        }
                      {" "}
                      {algen === 0 ? 
                      <Button variant='success'  onClick={() =>ruteCalculate()}>Rute Calculate</Button>
                      :
                      <Button variant='danger'  onClick={() =>CloseRuteCalculate()}>Close</Button>
                      }
                      {" "}
                      {help === 0 ? 
                      <Button variant='warning' className={styles.tes} onClick={()=>setHelp(1)}>Help</Button>
                      :
                      <Button variant='danger'  onClick={()=>setHelp(0)}>Close</Button>
                      }
                      {help === 0 ? null : 
                      <div className={styles.help}>
                        <ol>
                          <li>Masukkan data lokasi melalui menu <b>"Add Destination"</b>.</li>
                          <li>Untuk melihat data lokasi yang sudah diinputkan melalui menu <b>"Data"</b>.</li>
                          <li>Pada menu <b>"Data"</b> juga dapat menghapus data alamat yang tidak diinginkan.</li>
                          <li>Pada menu <b>"Rute Calculate"</b> terdapat tombol <b>"Get Distance"</b> untuk mendapatkan jarak antar alamat.</li>
                          <li>Proses <b>"Get Distance"</b> cukup lama, namun tergantung banyaknya jumlah alamat yang diinputkan, sehingga lebih disarankan hanya memasukkan sejumlah 10 alamat saja .</li>
                          <li>Proses <b>"Get Distance"</b> berjalan dengan ditandai bergantinya tombol tersebut dengan keterangan <b>"Distance Calculating"</b> .</li>
                          <li>Ketika proses <b>"Distance Calculating"</b> selesai maka akan tergantikan dengan tombol <b>"Clear Distance", "Show Distance", dan "Start"</b>.</li>
                          <li>Tombol <b>"Clear Distance"</b> berfungsi untuk menghapus data jarak yang telah ada.</li>
                          <li>Tombol <b> "Show Distance"</b> berfungsi untuk menampilkan data jarak yang telah diperoleh.</li>
                          <li>Tombol <b> "Start"</b> berfungsi untuk memulai proses pendapatan rute tercepat.</li>
                          <li>Ketika menampilkan data jarak dengan tombol <b> "Show Distance"</b> namun terdapat angka <b>"0"</b> selain pada diagonal, dapat diperbaiki melalui tombol <b>"Repair Distance"</b>.</li>
                          <li>Untuk melakukan perbaikan, cukup menginputkan posisi origin dan destination pada bagian yang masih <b>"0"</b> pada form yang ada. Kemudian klik tombol <b>"Repair"</b>.</li>
                          <li>Ketika semua data jarak sudah lengkap, dapat memulai pencarian rute tercepat dengan tombol <b>"Start"</b>, kemudian isikan semua form yang ada dan akan muncul tombol <b>"Generate"</b>.</li>
                          <li>Setelah tombol <b>"Generate"</b> di klik maka akan tergantikan dengan tombol <b>"Start"</b> dan tombol <b>"Clear"</b> serta menandakan bahwa populasi awal telah terbentuk.</li>
                          <li>Klik tombol <b>"Rute Calculate"</b> untuk memicu map menampilkan rute.</li>
                          <li>Klik tombol <b>"Start"</b> untuk memulai proses algoritma genetika dalam pencarian rute tercepat dan hasilnya tersaji di bagian bawah.</li>
                          <li>Tombol <b>"Get One Route"</b> yang ada di bagian paling bawah berfungsi untuk mendapatkan rute antar dua titik tujuan.</li>
                          <li>Hanya perlu menginputkan angka yang ada di row <b>"Posisi Ke"</b> yang ada pada tabel <b>Rute Terbaik"</b>, selanjutnya hanya perlu klik <b>"Find Route"</b> untuk memperoleh rutenya.</li>
                          <li>Klik tombol <b>"Clear"</b> untuk menghapus data pencarian saat ini dan untuk melakukan penggantian nilai variabel.</li>
                        </ol>
                      </div>
                      }
                    </section>
                    <section>
                    {add === 1 ? 
                      <div className={styles.add}>
                      <Row>
                        <Col>
                        <Form onSubmit={(e)=> save(e)}>
                            <Form.Group className="mb-3" >
                                <Form.Control type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                            </Form.Group>
                            {/* <Form.Group className="mb-3">
                              <Autocomplete>
                                <Form.Control type="text" placeholder="Enter the destination" onChange={(e) => setAddress(e.target.value)} />
                              </Autocomplete>
                            </Form.Group> */}
                            <FormGroup className="mb-3">
                              <div className={styles.form}>
                                <PlacesAutocomplete
                                  value={address}
                                  onChange={setAddress}
                                  onSelect={handleSelect}
                                >
                                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                      <Form.Control type='text'  {...getInputProps({ placeholder: "Enter the destination" })} />

                                      <div className={styles.search}>
                                        {loading ? <div>...loading</div> : null}

                                        {suggestions.map(suggestion => {
                                          const style = {
                                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                            padding: "5px"
                                          };

                                          return (
                                            <div {...getSuggestionItemProps(suggestion, { style })}>
                                              {suggestion.description}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </PlacesAutocomplete>
                              </div>
                            </FormGroup>
                            <Form.Group className="mb-3 d-flex" >
                              <Form.Control type="text" value={coordinates.lat}  placeholder="Latitude" disabled />
                              <Form.Control type="text" value={coordinates.lng}  placeholder="Longitude" disabled />
                            </Form.Group>
                            {requireAdd === 1 ? null : 
                            <Form.Group className="mb-3">
                                <Form.Select aria-label="Default select example" value={startingPoint} onChange={(e) => setStartingPoint(e.target.value)}>
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </Form.Select>
                            </Form.Group>
                            }
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                      </Col>
                      <Col xs={8}>

                        <GoogleMap
                            mapContainerStyle={{width:'100%', height:'600px'}}
                            center={{lat:coordinates.lat,lng:coordinates.lng}}
                            zoom={15}
                            onLoad={onLoad}
                            onClick={(event) => {tes(event)}}
                          >
                            { /* Child components, such as markers, info windows, etc. */ }
                            <></>
                            <Marker position={{lat:coordinates.lat,lng:coordinates.lng}}/>
                        </GoogleMap>
                      </Col>
                    </Row>
                    </div>
                    :
                    <></>
                  }
                  </section>
                  {btn === 0 ? null :
                    <section>
                      <Table className='tabelRute mt-2' striped bordered responsive>
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>lat</th>
                            <th>lng</th>
                            <th>Starting Point</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                            {placeData.map((data,index) => (
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td className={styles.rute}>{data.name}</td>  
                              <td className={styles.rute}>{data.address}</td>  
                              <td className={styles.rute}>{data.lat}</td>  
                              <td className={styles.rute}>{data.lng}</td>
                              <td>
                                {data.startingPoint === true ? "Yes" : "No"}</td>
                              <td>
                              {/* <Button variant='warning' color='white'  onClick={() =>upd()}>Update</Button>{' '} */}
                              <Button variant='danger' color='white'  onClick={() => del(data.id)}>Delete</Button>
                              </td>
                            </tr>
                            ))}
                        </tbody>
                      </Table>
                    </section>
                  }
                  {algen === 0 ? null :
                    <>
                      {generateDistanceButton === 0?
                        <Button className='mt-5' variant='primary' color='white'  onClick={() =>btnDisatnce()}>Get Distance</Button>
                        :
                        <>
                          {generateDistanceButton === 1 && loadingDistance === 0 ? 
                          
                            <>
                              <div className='mt-5'>
                                <h5>Distance Calculating   
                                <img className={styles.img} src={load} width="20px" alt="Loading"/>
                                </h5>
                              </div>
                            </>
                          
                          : 
                          
                            <>
                              {generateDistanceButton === 1 && loadingDistance === 1 ? 
                                <div className='mt-5'>
                                  <Button variant='danger'  onClick={() =>btnDisatnce()}>Clear Distance</Button> {" "}
                                  {btnShowDistance === 0 ?
                                    <Button variant='info'  onClick={() =>setBtnShowDistance(1)}>Show Distance</Button>
                                  :
                                    <Button variant='danger'  onClick={() =>setBtnShowDistance(0)}>Close Show Distance</Button>
                                  }{" "}
                                  {btnStartCalculate === 0 ?
                                    <Button variant='primary'  onClick={() =>setBtnStartCalculate(1)}>Start</Button>
                                  :
                                    <Button variant='danger'  onClick={() =>setBtnStartCalculate(0)}>Close Start</Button>
                                  }
                                  
                                </div>  
                              :
                                null
                              }
                            </>
                          
                          }
                        {/* {generateDistanceButton === 1 && loadingDistance === 0?
                          <div>
                          <h5>Distance Calculating...</h5>
                          <div/>
                          :

                        } */}
                        </>
                      }
                    </>
                  }
                  {btnStartCalculate === 0 ? null :
                  <section>
                                    {
                                      button === 0? 
                                    <div className='mb-4 mt-5'>
                                      <div className='form'>
                                      <Form>
                                        <Form.Group className="mb-3">
                                          <Row>
                                            <Col>
                                              <Form.Control type="number" onChange={(e) => SetKromosom(e.target.value)} placeholder="Jumlah Kromosom" />
                                            </Col>
                                            <Col>
                                              <Form.Control type="number" onChange={(e) => SetMaxGenerasi(e.target.value)} placeholder="Jumlah Generasi" />
                                            </Col>
                                            <Col>
                                              <Form.Control type="number" onChange={(e) => SetPc(e.target.value)} placeholder="Probabilitas Crossover (0-1)" />
                                            </Col>
                                            <Col>
                                              <Form.Control type="number" onChange={(e) => SetPm(e.target.value)} placeholder="Probabilitas Mutasi (0-1)" />
                                            </Col>
                                          </Row>
                                        </Form.Group>
                                      </Form>       
                                      </div>
                                      {kromosom !== 0 && maxGenerasi !== 0 && pm !== 0 && pc !== 0 ?
                                      <Button variant="primary" onClick={() => generate()}>Generate</Button> :
                                      <div>
                                        <h3>Isi form terlebih dahulu</h3>
                                      </div>
                                      
                                    }
                                      
                                    </div> 
                                    : 
                                    button === 1?
                                      <div className='mb-4 mt-5'>
                                        <div className='form'>
                                          <Form>
                                            <Form.Group className="mb-3">
                                              <Row>
                                                <Col>
                                                  <Form.Control type="number" value={kromosom} disabled placeholder="Jumlah Kromosom" />
                                                  <Form.Text className="text-muted">
                                                    Jumlah Kromosom
                                                  </Form.Text>
                                                </Col>
                                                <Col>
                                                  <Form.Control type="number" value={maxGenerasi} disabled placeholder="Jumlah Generasi" />
                                                  <Form.Text className="text-muted">
                                                    Jumlah Generasi
                                                  </Form.Text>
                                                </Col>
                                                <Col>
                                                  <Form.Control type="number" value={pc} disabled placeholder="Probabilitas Crossover" />
                                                  <Form.Text className="text-muted">
                                                    Probabilitas Crossover
                                                  </Form.Text>
                                                </Col>
                                                <Col>
                                                  <Form.Control type="number" value={pm} disabled placeholder="Probabilitas Mutasi" />
                                                  <Form.Text className="text-muted">
                                                    Probabilitas Mutasi
                                                  </Form.Text>
                                                </Col>
                                              </Row>
                                            </Form.Group>
                                          </Form>       
                                        </div>
                                        <Button variant="success" onClick={() => start()}>Start</Button>{' '}
                                        <Button variant="danger" onClick={() => clear()}>Clear</Button>
                                      </div>
                                    :
                                    <div className='mb-4 mt-5'>
                                      <div className='form'>
                                      <Form>
                                        <Form.Group className="mb-3">
                                          <Row>
                                            <Col>
                                              <Form.Control type="number" value={kromosom} disabled placeholder="Jumlah Kromosom" />
                                              <Form.Text className="text-muted">
                                                Jumlah Kromosom
                                              </Form.Text>
                                            </Col>
                                            <Col>
                                              <Form.Control type="number" value={maxGenerasi} disabled placeholder="Jumlah Generasi" />
                                              <Form.Text className="text-muted">
                                                Jumlah Generasi
                                              </Form.Text>
                                            </Col>
                                            <Col>
                                              <Form.Control type="number" value={pc} disabled placeholder="Probabilitas Crossover" />
                                              <Form.Text className="text-muted">
                                                Probabilitas Crossover
                                              </Form.Text>
                                            </Col>
                                            <Col>
                                              <Form.Control type="number" value={pm} disabled placeholder="Probabilitas Mutasi" />
                                              <Form.Text className="text-muted">
                                                Probabilitas Mutasi
                                              </Form.Text>
                                            </Col>
                                          </Row>
                                        </Form.Group>
                                      <Button variant="danger" onClick={() => clear()}>Clear</Button>
                                      </Form>       
                                      </div>
                                    </div>
                                    }
                  </section>
                  }
                  {btnShowDistance === 0 ? null :
                    <section>
                      <Table className='tabelGenerasi mt-2' striped bordered responsive>
                        <thead>
                          <tr>
                            <th colSpan={2}> </th>
                            {/* <th style={{backgroundColor:"dodgerblue",color:"white"}}>0</th>
                            {number.map((juml)=>(
                              <th style={{backgroundColor:"dodgerblue",color:"white"}} key={juml}>{juml}</th>
                              ))} */}
                              {placeData.map((data,index)=>(
                                <>
                                <th key={index} style={{backgroundColor:"dodgerblue",color:"white",borderRight:"none",textAlign:"right"}}>({index})</th>
                                <th style={{backgroundColor:"dodgerblue",color:"white",borderLeft:"none",textAlign:"left"}}>{data.name} </th>
                                </>
                              ))}
                          </tr>
                        </thead>
                        <tbody>
                        {distance.map((dist,index)=>(
                          <tr key={index}>
                            {/* <td style={{backgroundColor:"red",color:"white"}}>{index}</td> */}
                            <td style={{backgroundColor:"red",color:"white",borderRight:"none",textAlign:"right"}}><b>({index})</b></td>
                            <td style={{backgroundColor:"red",color:"white",borderLeft:"none",textAlign:"left"}}><b>{placeData[index].name}</b></td>
                              {dist[0] === 0 ? 
                              <td colSpan={2} style={{backgroundColor:"yellow",color:"white"}}>{dist[0]}</td>
                              :
                                <td colSpan={2}>{dist[0]}</td>
                                }
                              {/* <td>
                                {dist[0] === 0 ? 
                                <p style={{backgroundColor:"yellow",color:"white"}}>{dist[0]}</p>
                                :
                                <p>{dist[0]}</p>
                                }
                                
                              </td> */}
                            {number.map((jum)=>(
                              <>
                              {dist[jum] === 0 ? 
                                <td colSpan={2}  key={jum} style={{backgroundColor:"yellow",color:"white"}}>{dist[jum]}</td>
                                :
                                <td colSpan={2} >{dist[jum]}</td>
                                }
                              {/* <td key={jum}>
                                {dist[jum] === 0 ? 
                                <p style={{backgroundColor:"yellow",color:"white"}}>{dist[jum]}</p>
                                :
                                <p>{dist[jum]}</p>
                                }
                                </td> */}
                                </>
                            ))}
                          </tr>
                        ))}
                        </tbody>
                      </Table>
                      {repairBtn === 0 ? 
                      <Button variant='primary' onClick={() =>setRepairBtn(1)}>Repair Distance Data</Button>
                      :
                      <Button variant='danger' onClick={() =>setRepairBtn(0)}>Close Repair Distance Data</Button>
                      }
                      {repairBtn === 0 ? null : 
                        <div className='mt-4' style={{width:"60%", margin:"auto"}}>
                          <Form onSubmit={(e)=>Repair(e)}>
                            <Form.Group className="mb-3">
                              <Row>
                                <Col>
                                  <Form.Control type="number" onChange={(e) => setOriginR(e.target.value)} placeholder="Origin (red) - Input the number" />
                                </Col>
                                <Col>
                                  <Form.Control type="number" onChange={(e) => setDestinationR(e.target.value)} placeholder="Destination (blue) - Input the number" />
                                </Col>
                              </Row>
                            </Form.Group>
                            <Button variant='success' type='submit'>Repair</Button>
                          </Form>      
                        </div>
                      }
                    </section>
                  }
                    {button === 2 ?
                      <section className={styles.tabel}>
                        <div className='mt-5'>
                          <h3>Tabel Individu Terbaik/Generasi</h3>
                          <Table className='tabelGenerasi mt-2' striped bordered responsive>
                            <thead>
                              <tr>
                                <th>Generasi</th>
                                <th>Destinasi</th>
                                <th>Fitness</th>
                                <th>Jarak</th>
                                {/* <th>probability</th>
                                <th>comulative</th> */}
                              </tr>
                            </thead>
                            <tbody>
                                {populationFinal.map((pop,index) => (
                                <tr key={index}>
                                  <td>{index+1}</td>
                                  {/* <td>{pop[0]}-{pop[1]}-{pop[2]}-{pop[3]}-{pop[4]}-{pop[5]}-{pop[6]}-{pop[7]}-{pop[8]}-{pop[9]}</td>   */}
                                  <td>
                                    <span>{pop[0]} {" "}</span>
                                    {number.map((numb)=>(
                                      <span key={numb}>{pop[numb]} {" "} </span>
                                    ))}
                                    <span>{pop[0]} {" "}</span>
                                  </td>
                                  <td>{pop[gen]}</td>  
                                  <td>{pop[gen+1]}</td>  
                                  {/* <td>{pop.fitness}</td> 
                                  <td>{pop.fitness}</td>  */}
                                </tr>
                                ))}
                            </tbody>
                          </Table>
                          <h3>Rute Terbaik</h3>
                          <Table className='tabelRute mt-2' striped bordered responsive>
                            <thead>
                              <tr>
                                <th>Rute ke-</th>
                                <th>Posisi ke-</th>
                                <th>Rute</th>
                                {/* <th>probability</th>
                                <th>comulative</th> */}
                              </tr>
                            </thead>
                            <tbody>
                                {rute.map((rut,index) => (
                                <tr key={index}>
                                  <td>{index+1}</td>
                                  <td>{rut.position}</td>
                                  <td className={styles.rute}>{rut.address}</td>  
                                  {/* <td>{pop.fitness}</td> 
                                  <td>{pop.fitness}</td>  */}
                                </tr>
                                ))}
                                <tr>
                                  <td>{placeData.length+1}</td>
                                  <td>0</td>
                                  <td className={styles.rute}>{placeData[0].address}</td>
                                </tr>
                            </tbody>
                          </Table>
                        </div>
                        {getFinalDestinationBtn === 0 ? 
                        <Button variant="success" onClick={() => setGetFinalDestinationBtn(1)}>Get One Route</Button>
                        :
                        <Button variant="danger" onClick={() => setGetFinalDestinationBtn(0)}>Cancel</Button>
                        }
                        {getFinalDestinationBtn === 0 ? null : 
                        <div className='mt-5'>
                          <Row>
                            <Col>
                              <Form onSubmit={(e)=> search(e)}>
                                {/* <Row>
                                  <Col> */}
                                    <Form.Group className="mb-3" >
                                        <Form.Control type="number" placeholder="Enter the origin position" onChange={(e)=>setOriginRouteFinal(e.target.value)}/>
                                    </Form.Group>
                                  {/* </Col>
                                  <Col> */}
                                    <Form.Group className="mb-3">
                                        <Form.Control type="number" placeholder="Enter the destination position" onChange={(e) => setDestinationRouteFinal(e.target.value)} />
                                    </Form.Group>
                                  {/* </Col>
                                  <Col> */}
                                  <Button variant="primary" type="submit">
                                      Find Route
                                  </Button>{" "}
                                  <Button variant="danger" onClick={()=>setDirectionFinal([])}>
                                      Clear
                                  </Button>
                                  {/* </Col>
                                </Row> */}
                              </Form>
                            </Col>
                            <Col xs={10}>
                              <div>
                                <GoogleMap
                                  mapContainerStyle={{width:'100%', height:'600px'}}
                                  center={{lat:coordinates.lat,lng:coordinates.lng}}
                                  zoom={15}
                                  onLoad={onLoad}
                                  onClick={(event) => {tes(event)}}
                                >
                                  { /* Child components, such as markers, info windows, etc. */ }
                                  <></>
                                  {/* <Marker position={{lat:coordinates.lat,lng:coordinates.lng}}/> */}
                                  {directionFinal &&
                                <DirectionsRenderer directions={directionFinal} />}
                                </GoogleMap>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        }
                      </section>
                      :
                      <div>

                      </div>
                      }
                </div>
            </div>
    </>
  ) : <></>
}

  export default Home;