// Import Package google-maps yang telah diinstall
import {
    useJsApiLoader,
    GoogleMap, Marker, LoadScript
  } from "@react-google-maps/api";
  import styles from "./styles/Home.module.css";
  import Header from "../components/header";
  import 'bootstrap/dist/css/bootstrap.min.css';
  import {Button, Modal, Row, Col, Form} from 'react-bootstrap/';
  import React, {useState, useEffect} from 'react';
  
  const center = {lat: 48.8584, lng: 2.2945}
  
  // function MyVerticallyCenteredModal(props) {
  //   // const [markers, setMarkers] = useState([])
  //   const [lat, setLat] = useState(48.8584)
  //   const [lng, setLng] = useState(2.2945)

  //   function tes(event){
  //     const lat = event.latLng.lat()
  //     const lng = event.latLng.lng()
  //     setLat(lat)
  //     setLng(lng)
  //   }

  //   console.log("isi lat", lat)
  //   // if(lat)
  //   const ini = {
  //     lat:lat,
  //     lng:lng
  //   }

  //   return (
  //     <Modal
  //       {...props}
  //       size="xl"
  //       aria-labelledby="contained-modal-title-vcenter"
  //       centered
  //     >
  //       <Modal.Header closeButton>
  //         <Modal.Title id="contained-modal-title-vcenter">
  //           Add Destination
  //         </Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //           <Row>
  //               <Col>
  //                   <Form>
  //                       <Form.Group className="mb-3" >
  //                           <Form.Control type="text" placeholder="Enter your destination" />
  //                       </Form.Group>
  //                       <Form.Group className="mb-3 d-flex" >
  //                           <Form.Control type="text" value={lat} placeholder="Latitude" />
  //                           <Form.Control type="text" value={lng} placeholder="Longitude" />
  //                       </Form.Group>
  //                       <Form.Group className="mb-3">
  //                           <Form.Select aria-label="Default select example">
  //                               <option>make the starting location</option>
  //                               <option value="0">No</option>
  //                               <option value="1">Yes</option>
  //                           </Form.Select>
  //                       </Form.Group>
  //                       <Button variant="primary" type="submit">
  //                           Submit
  //                       </Button>
  //                   </Form>
  //               </Col>
  //               <Col xs={8}>
  //               <GoogleMap center={center} zoom={15} mapContainerStyle={{width:'100%', height:'600px'}} options={{streetViewControl:false, mapTypeControl:false}} onClick={(event) => {tes(event)}} >
  //               <Marker position={ini} />
  //               </GoogleMap>
  //               </Col>
  //           </Row>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button onClick={props.onHide}>Close</Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
  // }
  
  
function Home() {
    const [modalShow, setModalShow] = React.useState(false);
  
    const{isLoaded} = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GMAPS_API,
    })
  
    if(!isLoaded){
      return <h1>Loading</h1>
    }
    const position = {
      lat: 48.8584,
      lng: 2.2945
    }
    
    const onLoad = marker => {
      console.log('marker: ', marker)
    }
  
  
    return (
        <>
            <Header/>
            <div className={styles.Home}>
                <div className="container">
                    <section style={{margin:'auto'}}>
                        <div className={styles.Test}>
                        <GoogleMap center={center} zoom={15} mapContainerStyle={{width:'100%', height:'600px'}} options={{streetViewControl:false, mapTypeControl:false}} >
                        <Marker
                          onLoad={onLoad}
                          position={position}
                        />
                        </GoogleMap>
                        </div>
                    </section>
                    <section>
                        {/* <Button className={styles.btn} onClick={() => setModalShow(true)}>Add Destination</Button> */}
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
    );
  }
  
  export default Home;