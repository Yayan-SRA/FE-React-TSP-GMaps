import React, {useState, useEffect} from 'react';
import {
  useJsApiLoader,
  GoogleMap, Marker, LoadScript, Autocomplete, InfoWindow
} from "@react-google-maps/api";
import styles from "./styles/Home.module.css";
import Header from "../components/header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal, Row, Col, Form} from 'react-bootstrap/';
// import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox"; 

const containerStyle = {
  width: '800px',
  height: '800px'
};


function Home() {
  const [add, setAdd] = useState(0);
  const [lat, setLat] = useState(-3.745)
  const [lng, setLng] = useState(-38.523)
  const [address, setAddress] = useState("")
  const [selected, setSelected] = useState(null)
  const [ libraries ] = useState(['places']);
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };
  const position ={
    lat: lat,
    lng: lng
  }
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GMAPS_API,
    libraries,
  })

  // const [map, setMap] = React.useState(null)

  const mapRef = React.useRef();
  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    // setMap(map)
    mapRef.current = map
  }, [])

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null)
  // }, [])

  function Ttes(){
    console.log("masuk sini")
    // const navigasi = useNavigate()
    // navigasi("/addDestination")
    setAdd(1)
  }

  function tes(event){
    const lat = event.latLng.lat()
    const lng = event.latLng.lng()
    setLat(lat)
    setLng(lng)
  }

  function Cancel(){
    setAdd(0)
  }
  
  function coba(){
    const fill = {'lat':lat,'lng':lng}
    console.log("masuk sini")
    console.log("masuk sini2", fill)
    setSelected(fill)
    console.log("isi selected", selected)
  }

  function closed(){
    console.log("masuk sini")
    setSelected(null)
  }
  


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
                          zoom={15}
                          onLoad={onLoad}
                          
                        >
                          { /* Child components, such as markers, info windows, etc. */ }
                          <></>
                          <Marker position={center} onClick={()=>{coba()}}/>
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
                        <Button className={styles.btn} onClick={() =>Ttes()}>Add Destination</Button> {''}
                        <Button variant='danger'  onClick={() =>Cancel()}>Cancel</Button>
                    </section>
                    <section>
                    {add === 1 ? 
                      <div className={styles.add}>
                      <Row>
                        <Col>
                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Control type="text" placeholder="Name" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Autocomplete>
                                <Form.Control type="text" placeholder="Enter the destination" onChange={(e) => setAddress(e.target.value)} />
                              </Autocomplete>
                            </Form.Group>
                            <Form.Group className="mb-3 d-flex" >
                              <Form.Control type="text" value={lat} placeholder="Latitude" />
                              <Form.Control type="text" value={lng} placeholder="Longitude" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Select aria-label="Default select example">
                                    <option>make the starting location</option>
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
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
                            center={center}
                            zoom={15}
                            onLoad={onLoad}
                            onClick={(event) => {tes(event)}}
                          >
                            { /* Child components, such as markers, info windows, etc. */ }
                            <></>
                            <Marker position={position}/>
                        </GoogleMap>
                      </Col>
                    </Row>
                    </div>
                    :
                    <></>
                  }
                  </section>
                    {/* Modal */}
                    {/* <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    /> */}
                    {/* End-Modal */}
                </div>
            </div>
    </>
  ) : <></>
}
  
  export default Home;