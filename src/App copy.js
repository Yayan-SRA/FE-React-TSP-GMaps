// Import Package google-maps yang telah diinstall
import {
  GoogleMap,
  LoadScript,
  Marker, // Import Marker
} from "@react-google-maps/api";

function App() {

  // Atur LongLat Focus map disini saya mengatur LongLat yang mengarah ke Jakarta
  const center = {
    lat: -6.2269976,
    lng: 106.7848748,
  };

  // ContainerStyle Berfungsi Untuk Mengatur StyleContainer Untuk google maps
  const containerStyle = {
    width: '800px',
    height: '800px'
  };

  return (
    <>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GMAPS_API}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        >
          <Marker
            //Titik Marker akan di letakkan dengan menentukan LongLat
            position={{
              lat: -6.214511929764319,
              lng:  106.84522285129088,
            }}
            // Jika Ingin Marker dapat di drag rubah value draggable menjadi true
            draggable={true}
          />
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default App;