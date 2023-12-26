import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";

//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import { AuthProtected } from './AuthProtected';
import { useSelector, useDispatch } from "react-redux";

import Loader from '../Components/Common/Loader';

import { 
    Button, Modal, ModalBody, ModalFooter
} from "reactstrap";
import { t } from 'i18next';

const Index = () => {

    /*const { gloading } = useSelector(state => {
        return {
            gloading: state.Global.loading
        }
    });*/
    
    const [modal_standard, setmodal_standard] = useState(false);
    const [modalTitle, setmodalTitle] = useState("");
    const [modalText, setmodalText] = useState("");
    const showModal = (title, text)=>{
        if( (title && title!=="") || (text && text!=="") ){
            setmodalTitle(title ? title : "");
            setmodalText(text ? text : "");
            setmodal_standard(true);
        }else{
            setmodal_standard(false);
        }
    }

    useEffect(() => {
        window.generic.showModal = (title, text)=>{
            showModal(title, text);
        }
        document.getElementById('loderSc').setAttribute('style', window.generic.loading ? "" : 'display:none;')
    }, []);

    return (
        <React.Fragment>
            {
                /*gloading ? (
                <div id="loderSc">
                    <Loader class="ligloading"/>
                </div>) : ""*/
            }
            <div id="loderSc">
                <Loader class="ligloading"/>
            </div>
            <Modal id="myModal"
                    isOpen={modal_standard}
                    toggle={() => {
                        showModal();
                    }}
            >
                <ModalBody>
                    <h5 className="fs-15">
                        {modalTitle}
                    </h5>
                    <p className="text-muted">{modalText}</p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            showModal();
                        }}
                    >
                        Aceptar
                    </Button>
                </ModalFooter>
            </Modal>
            <Routes>
                <Route>
                    {publicRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                <NonAuthLayout>
                                    {route.component}
                                </NonAuthLayout>
                            }
                            key={idx}
                            exact={true}
                        />
                    ))}
                </Route>

                <Route>
                    {authProtectedRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                <AuthProtected>
                                    <VerticalLayout>{route.component}</VerticalLayout>
                                </AuthProtected>}
                            key={idx}
                            exact={true}
                        />
                    ))}
                </Route>
            </Routes>
        </React.Fragment>
    );
};

export default Index;