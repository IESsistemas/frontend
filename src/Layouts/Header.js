import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { useSelector } from 'react-redux';

import logoLight from "../assets/images/logo-light.png";

const Header = ({ headerClass }) => {
    
    //const careerSelected = localStorage.getItem('careerSelected')

    const { alldata, carrerSelected } = useSelector(state => ({
        alldata: state.Login.userData,
        carrerSelected: state.Login.carrerSelected,

    }));


    const toogleMenuBtn = () => {

    };

    const closeSession = () => {
        //localStorage.removeItem('careerSelected')
        sessionStorage.removeItem("authUser");
        sessionStorage.removeItem("userData");
        sessionStorage.removeItem("homeData");
        window.location.href = "/ies/auth";
    }

    return (
        <React.Fragment>
            <header id="page-topbar" className={headerClass}>
            <div className="layout-width">
                    <div className="navbar-header">
                        <div className="d-flex">

                            <Link to="/ies/carrer" className="logo logo-dark">
                                <img src={logoLight} alt="" height="100" />
                            </Link>

                            <button
                                onClick={toogleMenuBtn}
                                type="button"
                                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger ies_hide"
                                id="topnav-hamburger-icon">
                                <span className="hamburger-icon">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>

                            <div className="navbar-brand-box horizontal-logo ies_logomrg">
                                <div>
                                    <Link to="/ies/carrer" className="logo logo-dark">
                                        <img src={logoLight} alt="" height="100" />
                                    </Link>

                                    <Link to="/ies/carrer" className="logo logo-light">
                                        <img src={logoLight} alt="" height="100" />
                                    </Link>
                                </div>
                            </div>

                        </div>

                        <div className="d-flex align-items-center"><br/>
                            
                                <UncontrolledDropdown className='ies-profileMenu'>
                                    <DropdownToggle className='ies-profileMenu'>
                                    <i className="bx bx-user-circle ies-fs24"></i> <span className='ies-spantext'>¡Hola <span className='capitalize'>{alldata.data ? alldata.data.nombres.toLowerCase():""}</span>! <i className="mdi mdi-chevron-down"></i></span>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        { carrerSelected ? (
                                            <>
                                            <Link to="/ies/data"><DropdownItem>Datos personales</DropdownItem></Link>
                                            <Link to="/ies/chpass"><DropdownItem>Modificar contraseña</DropdownItem></Link>
                                            </>
                                        ):
                                           null
                                        }
                                        <DropdownItem onClick={closeSession}>Cerrar sesión</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
};

export default Header;