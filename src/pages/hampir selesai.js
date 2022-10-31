import React, {useState, useEffect} from 'react';
import {
  useJsApiLoader,
  GoogleMap, Marker, LoadScript, Autocomplete, InfoWindow, DirectionsRenderer
} from "@react-google-maps/api";
import styles from "./styles/Home.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal, Row, Col, Form, FormGroup, Table} from 'react-bootstrap/';
import axios from "axios";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByPlaceId
} from "react-places-autocomplete";

function Home() {
  const [add, setAdd] = useState(0);
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
    lat: -3.745,
    lng: -38.523
  });
  const [directionsResponse, setDirectionsResponse] = useState([])
  const [savingDirection, setSavingDirection] = useState([])


  // algen state
  const [jumlah, setJumlah] = useState([])
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
  
  // end algen state

  // var geocoder = new google.maps.Geocoder();

  useEffect(() => {
    fetchdata();
}, [])

const fetchdata = async () => {
    try {
        let response = await axios.get("http://localhost:8000/api/v1/algen/list")
        console.log("isi response", response.data.data)
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
      let response = await axios.post(`http://localhost:8000/api/v1/algen/create`, {
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
      let response = await axios.delete(`http://localhost:8000/api/v1/algen/delete/${id}`)
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
    // end create matrix

    // suffle
    function shuffle(array) {
      let currentIndex = array.length,  randomIndex;
    
      // While there remain elements to shuffle.
      while (currentIndex != 0) {
    
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
    const solu = createMatrixOneObject(placeData.length)
    console.log("isi dist", solu)
    for(let q=0;q<solu.length;q++){
      directionsResponse.push(solu[q])
    }
    // console.log("isi distres", savingDirection)
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
    // console.log("isi distres", savingDirection)
    // setDirectionsResponse(savingDirection)
    console.log("isi distres2", directionsResponse)
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
    
    async function fitness(pop) {
    for(let i=0;i<pop.length;i++){
      let sol = pop[i]
      const a = createMatrixOne(gen);
      for(let q=0;q<gen;q++){
        a[q] = placeData[sol[q]].address
      }
      a[gen] = placeData[sol[0]].address
      let b = 0
      console.log("isi a", a)
      
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService(results, sta)
      console.log("isiss", directionsService)
      for(let p=0;p<gen-1;p++){
        // direc
        // eslint-disable-next-line no-undef
        if(sta === google.maps.DirectionsStatus.OK ){

        // eslint-disable-next-line no-undef
        }else if(sta === google.maps.DirectionsStatus.OVER_QUERY_LIMIT){
          // delay++;
        }
        // if(status == )
        console.log("isiss2", directionsService)
        let results = await directionsService.route({
          origin: a[p],
          destination: a[p+1],
          
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING
        })
        const dist = results.routes[0].legs[0].distance.text
        const space = dist.indexOf(" ")
        const distFix = parseFloat(dist.slice(0,space))
        b += distFix
        console.log("isi b dalam", b)
      }
      // let results = await directionsService.route({
      //   origin: a[gen-1],
      //   destination: a[0],
        
      //   // eslint-disable-next-line no-undef
      //   travelMode: google.maps.TravelMode.DRIVING
      // })
      // b += results.routes[0].legs[0].distance.text

      console.log("isi b", b)
      // fitness[i]=b
      // pop[i][gen]=1/b
      // pop[i][gen+1]=parseFloat((b).toFixed(2))
    }
    console.log(pop)
    return pop
  }


  async function generate(){
    setButton(1)
    createPopulation()
    solution(population)
    
    
    // fitness(population)
  }

  async function start(){
    setButton(2)
  }

  function clear(){
    setButton(0)
    // SetKromosom(0)
    // SetMaxGenerasi(0)
    // SetPc(0)
    // SetPm(0)
  }

  function btnDisatnce(){
    try {
        // isi jumlah
        for(let i=1;i<placeData.length;i++){
          jumlah.push(i)
        }
        SetGen(placeData.length)
        
        // end isi jumlah
        setGenerateDistanceButton(1)
        getDirection()
    } catch (error) {
      console.log(error)
    }
    // check()
    // setLoadingDistance(1)
  }

  function apa(){
    console.log("buat tes aja")
  }
  // end algen

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
                        <Button variant='info' onClick={() =>Data()}>Data</Button>
                        : 
                        <Button variant='danger'  onClick={() =>CloseData()}>Close</Button>

                        }
                      {" "}
                      {algen === 0 ? 
                      <Button variant='success'  onClick={() =>ruteCalculate()}>Rute Calculate</Button>
                      :
                      <Button variant='danger'  onClick={() =>CloseRuteCalculate()}>Close</Button>
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

                                      <div>
                                        {loading ? <div>...loading</div> : null}

                                        {suggestions.map(suggestion => {
                                          const style = {
                                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
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
                            <Form.Group className="mb-3">
                                <Form.Select aria-label="Default select example" value={startingPoint} onChange={(e) => setStartingPoint(e.target.value)}>
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </Form.Select>
                            </Form.Group>
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
                              <td>{data.name}</td>  
                              <td>{data.address}</td>  
                              <td>{data.lat}</td>  
                              <td>{data.lng}</td>
                              <td>
                                {data.startingPoint == true ? "Yes" : "No"}</td>
                              <td>
                              <Button variant='warning' color='white'  onClick={() =>upd()}>Update</Button>{' '}
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
                              <div>
                                <h5>Distance Calculating...</h5>
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
                                    <Button variant='primary'  onClick={() =>setBtnStartCalculate(1)}>Start Calculate</Button>
                                  :
                                    <Button variant='danger'  onClick={() =>setBtnStartCalculate(0)}>Close Start Calculate</Button>
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
                                              <Form.Control type="number" onChange={(e) => SetPc(e.target.value)} placeholder="Probabilitas Crossover" />
                                            </Col>
                                            <Col>
                                              <Form.Control type="number" onChange={(e) => SetPm(e.target.value)} placeholder="Probabilitas Mutasi" />
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
                            <th> </th>
                            <th>0</th>
                            {jumlah.map((juml)=>(
                              <th key={juml}>{juml}</th>
                              ))}
                          </tr>
                        </thead>
                        <tbody>
                        {distance.map((dist,index)=>(
                          <tr key={index}>
                            <td>{index}</td>
                              <td>
                                {dist[0] === 0 ? 
                                <p style={{backgroundColor:"yellow",color:"white"}}>{dist[0]}</p>
                                :
                                <p>{dist[0]}</p>
                                }
                                
                              </td>
                            {jumlah.map((jum)=>(
                              <td>
                                {dist[jum] === 0 ? 
                                <p style={{backgroundColor:"yellow",color:"white"}}>{dist[jum]}</p>
                                :
                                <p>{dist[jum]}</p>
                                }
                                </td>
                            ))}
                          </tr>
                        ))}
                        </tbody>
                      </Table>
                    </section>
                  }
                </div>
            </div>
    </>
  ) : <></>
}

  export default Home;