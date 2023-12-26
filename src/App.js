import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

//import Scss
import './assets/scss/themes.scss';

//imoprt Route
import Route from './Routes';
import {getPendings} from "./util/functions";
import { loginRestore } from "./store/actions";

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper";

// Fake Backend 
//import fakeBackend from "./helpers/AuthType/fakeBackend";

// Activating fake backend
//fakeBackend();

function App(props) {

  const getInfo = async (alldata) => {
    let pending = await getPendings(alldata, true);
    dispatch(loginRestore(alldata));
  }

  const dispatch = useDispatch();

  try {
    let au = sessionStorage.getItem("authUser");
    let ud = sessionStorage.getItem("userData");
    let hd = sessionStorage.getItem("homeData");

    if(ud && hd && au){
      const alldata = {
        data: JSON.parse(ud),
        home: JSON.parse(hd),
        user: JSON.parse(au),
      };
      
      getInfo(alldata);
      
    }
  } catch (error) {
    console.log(error)
  }
  

  useEffect(() => {
    
  }, []);

  return (
    <React.Fragment>
      <Route />
    </React.Fragment>
  );
}

export default App;
