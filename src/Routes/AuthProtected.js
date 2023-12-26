import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import {setAuthorization} from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "../Components/Hooks/UserHooks";

import { loginSuccess, logoutUser } from "../store/actions";

const AuthProtected = (props) => {
  const dispatch = useDispatch();
  const { userProfile, loading, token } = useProfile();
  useEffect(() => {
    if (userProfile && !loading && token) {
      
      setAuthorization(token);
    } else if (!userProfile && loading && !token) {
      dispatch(logoutUser());
    }
  }, [token, userProfile, loading, dispatch]);

useEffect(() => {
  //dispatch(loginSuccess(userProfile))
}, [dispatch])

  


  if (!userProfile && loading && !token) {
    return (
      <Navigate to={{ pathname: "/ies/auth", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (<> <Component {...props} /> </>);
      }}
    />
  );
};

export { AuthProtected, AccessRoute };