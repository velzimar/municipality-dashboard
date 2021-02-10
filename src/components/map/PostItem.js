import React, { useState, useEffect  } from "react";
import ReactMapGL, {Marker, Popup}  from "react-map-gl";
import { setRTLTextPlugin }  from 'mapbox-gl';
import {REACT_APP_MAPBOX_TOKEN} from '../../utils/mapToken';
/*import RedPin from './RedMarker';
import GreenPin from './GreenMarker';
import OrangePin from './OrangeMarker';*/
import  './RedPin.css';
import  './GrennPin.css';
import './OrangePin.css';


setRTLTextPlugin("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js");

export default function PostItem(props) {
    const [viewport, setViewport] = useState({
        latitude: 36.868166,
        longitude:10.163664,
        width: "70vw",
        height: "80vh",
        zoom: 10.5,
      
        
    },
    /*popupInfo= null*/);
    const [popup, setPopup] = useState(null);
    useEffect(() => {
      const listener = e => {
        if (e.key === "Escape") {
          setPopup(null);
        }
      };
      window.addEventListener("keydown", listener);
  
      return () => {
        window.removeEventListener("keydown", listener);
      };
    }, []);
  
    const { posts } = props;
    
   let marker = null;
  

  if (posts.length > 0) {
     marker = posts.map(post => {
     /* post.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1);
      this.setState({ contacts: data })*/
      if(post.rating === 'Good')
      {
      return(
        <div key={post._id}>
      <Marker latitude={parseFloat(post.longitude)} longitude={parseFloat(post.altitude)} offsetLeft={-20} offsetTop={-10} key= {post._id}>
        <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setPopup(post);
              }}
            >
     <div className="markerG"></div>
     <span className="beaconG"></span>
      </button>
       </Marker>
              {popup ? (
                <Popup
                  latitude={parseFloat(popup.longitude)}
                  longitude={parseFloat(popup.altitude)}
                  onClose={() => {
                    setPopup(null);
                  }}
                >
                  <div>
                    <h4 className="popup-btn">{popup.date}</h4>
                    <h4 className="popup-btn">{popup.rating}</h4>
                  </div>
                </Popup>
              ) : null}
       </div>


      )}
      else  if(post.rating === 'not-so-bad'){
        return(
          <div key={post._id}>
          <Marker latitude={parseFloat(post.longitude)} longitude={parseFloat(post.altitude)} offsetLeft={-20} offsetTop={-10} key= {post._id}>
          <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setPopup(post);
              }}
            >
         <div className="markerO"></div>
     <span className="beaconO"></span>
          </button>
           </Marker>
           {popup ? (
          <Popup
            latitude={parseFloat(popup.longitude)}
            longitude={parseFloat(popup.altitude)}
            onClose={() => {
              setPopup(null);
            }}
          >
            <div>
            <h4 className="popup-btn">{post.date}</h4>
            <h4 className="popup-btn">{post.rating}</h4>
            </div>
          </Popup>
        ) : null}
      </div>
          )
      }
      else {
        return (
          <div key={post._id}>
          <Marker latitude={parseFloat(post.longitude)} longitude={parseFloat(post.altitude)} offsetLeft={-20} offsetTop={-10} key= {post._id} >
          <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setPopup(post);
              }}
           >
          <div className="markerR"></div>
     <span className="beaconR"></span>
          </button>
           </Marker>
           {popup ? (
          <Popup
            latitude={parseFloat(popup.longitude)}
            longitude={parseFloat(popup.altitude)}
            onClose={() => {
              setPopup(null);
            }}
          >
            <div>
            <h4 className="popup-btn">{post.date}</h4>
            <h4 className="popup-btn">{post.rating}</h4>
            </div>
            
          </Popup>
        ) : null}
          </div>
        )
      }
    })};
    return (
      
        <div>
        <div className="element-box">
        <ReactMapGL
          {...viewport}
          maxzoom={20}
          mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
          onViewportChange={nextViewport => setViewport(nextViewport)}
          mapStyle= 'mapbox://styles/mapbox/streets-v11'
          
        >
         {marker}
      
       </ReactMapGL>
        </div>
        </div>
      );
  }


