import React, { useEffect } from 'react';
import withRouter from '../Components/Common/withRouter';
import { useDispatch } from "react-redux";
import { useProfile } from "../Components/Hooks/UserHooks";
import { logoutUser, setCareer } from "../store/actions";
import {setAuthorization} from "../helpers/api_helper";
import { useNavigate } from "react-router-dom";

//redux
import { useSelector } from "react-redux";

const NonAuthLayout = ({ children }) => {
    // const {
    //     layoutModeType,
    // } = useSelector(state => ({
    //     layoutModeType: state.Layout.layoutModeType,
    // }));

    // useEffect(() => {
    //     if (layoutModeType === "dark") {
    //         document.body.setAttribute("data-layout-mode", "dark");
    //     } else {
    //         document.body.setAttribute("data-layout-mode", "light");
    //     }
    //     return () => {
    //         document.body.removeAttribute("data-layout-mode")
    //     }
    // }, [layoutModeType]);
    
    const dispatch = useDispatch();
    const { userProfile, loading, token } = useProfile();
    



    //userProfile.user
    
    useEffect(() => {
    }, [token, userProfile, loading, dispatch]);
    const history = useNavigate();
    
    return (
        <div>
            {children}
        </div>
    );
};

export default withRouter(NonAuthLayout);