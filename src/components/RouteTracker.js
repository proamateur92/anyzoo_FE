import React from "react";

// GA 
import ReactGA from "react-ga4";
import { GATrackingId } from '../shared/global_variables'

// route
import { useLocation } from "react-router-dom";


const RouteTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = React.useState(false)

  React.useEffect(()=>{
    if(!window.location.href.includes('localhost')){
      ReactGA.initialize(GATrackingId)
    }
    setInitialized(true)
  },[])

  React.useEffect(()=>{
    if(initialized) {
      ReactGA.send("pageview")
    }
  },[initialized, location])
}

export default RouteTracker