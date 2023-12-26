import React, { useState, useEffect } from "react";
import { Card, TabContent, Form, TabPane , Col, Container, Row, OffcanvasBody, Label, CardBody, CardHeader, Nav, NavItem, Input, NavLink,
    Button, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import { Link } from 'react-router-dom';
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { changeEmail, getPersonalInformationAction, getProvinces, getLocalities, getNeighbours, cleanModal, reqAddAddress, reqUpdateAddress, reqDeleteAddress, reqAddPhone, reqUpdatePhone, reqDeletePhone, getAllDataAddress  } from "../../store/actions";

import logoLight from "../../assets/images/favicon.ico";

const DatosPersonales = () => {
    document.title ="IES - Datos personales";

    const [usremail, setUsrEmail] = useState("");
    const [email, setEmail] = useState("");

    const [myAddresses, setMyAddresses] = useState([]);
    const [myPhones, setMyPhones] = useState([]);

    const [makeChangeAddress, setMakeChangeAddress] = useState(false);
    const [makeChangePhone, setMakeChangePhone] = useState(false);

    const [itemCh, setItemCh] = useState({});
    const [phoneCh, setPhoneCh] = useState({});

    const dispatch = useDispatch();

    const { alldata, addressType, counties, provinces, localities, neighbours, userAddress, userEmail, phones } = useSelector(state => ({
        alldata: state.Login.userData,
        addressType: state.Profile.addressType,
        counties: state.Profile.counties,
        provinces: state.Profile.provinces,
        localities: state.Profile.localities,
        neighbours: state.Profile.neighbours,
        userAddress: state.Profile.userAddress,
        userEmail: state.Profile.userEmail,
        phones: state.Profile.phones,
    }));

    if(!alldata.data){
        window.location.href = "/ies/carrer";
    }

    useEffect(() => {
        setEmail(userEmail ? userEmail.E_MAIL:"");
        setUsrEmail(userEmail ? userEmail.E_MAIL:"");

        //procesar addresses
        let myAddressesAux = [];
        userAddress.forEach((address) => {
            if(address.Calle){
                myAddressesAux.push({
                    ...address,
                    visible: address.Calle ? true : false,
                    edit: false
                })
            }
        })
        setMyAddresses(myAddressesAux)
    }, [userEmail]);

    //get only numbers in text
    const onlyNumbers = (text)=>{
        try {
            return text.replace(/[^0-9]/g, '');
        } catch (error) {
            return text;
        }
    }

    useEffect(() => {
        //procesar phones
        if(phones){
            let myPhonesAux = [];
            phones.forEach((ph) => {
                let area = onlyNumbers(ph.NRO_TE.split('-')[0]);
                let tel = onlyNumbers(ph.NRO_TE.split('-')[1]);
                myPhonesAux.push({
                    ...ph,
                    area,
                    tel,
                    edit: false
                })
            })
            setMyPhones(myPhonesAux)
        }
    }, [phones]);

    

    const changeEmailClick = (email)=>{
        dispatch(changeEmail(email));
    }

    const [activeTab, setActiveTab] = useState("1");

    const tabChange = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const editAddress = (index) => {
        if(makeChangeAddress){
            let myAddressesAux = [...myAddresses];
            if(myAddressesAux[index].n){
                myAddressesAux.splice(index, 1);
            }else{
                myAddressesAux[index].edit = false;
            }
            setMyAddresses(myAddressesAux);
            setMakeChangeAddress(false);
        }else{
            let myAddressesAux = [...myAddresses];
            myAddressesAux[index].edit = true;
            setMyAddresses(myAddressesAux);
            dispatch(getAllDataAddress(myAddressesAux[index].id_pais, myAddressesAux[index].id_provincia, myAddressesAux[index].id_localidad));

            setMakeChangeAddress(true);
            
            setItemCh({
                Id_Tipo_Domi: myAddressesAux[index].Id_Tipo_Domi, 
                Cod_postal: myAddressesAux[index].Cod_postal, 
                Calle: myAddressesAux[index].Calle, 
                Id_Pais: myAddressesAux[index].id_pais, 
                Id_Provincia: myAddressesAux[index].id_provincia, 
                Id_Localidad: myAddressesAux[index].id_localidad, 
                Id_Barrio: myAddressesAux[index].Id_Barrio,
                nuevo: false
            });
        }
    }

    const addAddress = ()=>{
        let myAddressesAux = [...myAddresses];
        myAddressesAux.push({
            edit: true,
            n: true
        })
        setItemCh({Id_Tipo_Domi: "F",Cod_postal: "", Calle: "", nuevo: true});
        setMyAddresses(myAddressesAux);
        setMakeChangeAddress(true);
    }

    const separeNumAreaCod = (tel)=>{
        let sep = tel.split('-');
        for (let i = 0; i < sep.length; i++) {
            sep[i] = onlyNumbers(sep[i]);
        }
        while (sep.length < 3) {
            sep = ["", ...sep];
        }
        return sep;
    }

    const editPhone = (index) => {
        if(makeChangePhone){
            let myAddressesAux = [...myPhones];
            if(myAddressesAux[index].n){
                myAddressesAux.splice(index, 1);
            }else{
                myAddressesAux[index].edit = false;
            }
            setMyPhones(myAddressesAux);
            setMakeChangePhone(false);
        }else{
            let myAddressesAux = [...myPhones];

            myAddressesAux[index].edit = true;
            setMyPhones(myAddressesAux);

            let sep = separeNumAreaCod(myAddressesAux[index].NRO_TE);
            setPhoneCh({type: myAddressesAux[index].ID_TIPO_TE, nuevo: false, area: sep[1], tel: sep[2], pais: sep[0].length > 0 ? sep[0] : "54"});
            setMakeChangePhone(true);
        }
    }

    const addPhone = ()=>{
        let myPhonesAux = [...myPhones];
        myPhonesAux.push({
            edit: true,
            n: true
        })
        setPhoneCh({type: "C", nuevo: true, area: "", tel: "", pais: "54"});
        setMyPhones(myPhonesAux);
        setMakeChangePhone(true);
    }

    const getProvincesOfCountry = (event) => {
        const selectedValue = event.target.value;
        setItemCh({ ...itemCh, Id_Pais: selectedValue, Id_Provincia: undefined, Id_Localidad: undefined, Id_Barrio: undefined });
        dispatch(getProvinces(selectedValue));
    };

    const getLocalitiesOfProvinces = (event) => {
        const selectedValue = event.target.value;
        setItemCh({ ...itemCh, Id_Provincia: selectedValue, Id_Localidad: undefined, Id_Barrio: undefined });
        dispatch(getLocalities(selectedValue));
        
    };

    const getNeighboursOfLocality = (event) => {
        const selectedValue = event.target.value;
        setItemCh({ ...itemCh, Id_Localidad: selectedValue, Id_Barrio: undefined });
        dispatch(getNeighbours(selectedValue));
    };

    const setNeighbours = (event) => {
        const selectedValue = event.target.value;
        setItemCh({ ...itemCh, Id_Barrio: selectedValue });
    };

    const chCalle = (event) => {
        const nValue = event.target.value;
        setItemCh({ ...itemCh, Calle: nValue });
    };

    const chCP = (event) => {
        const nValue = event.target.value;
        setItemCh({ ...itemCh, Cod_postal: nValue });
    };

    const chTypeAd = (event) => {
        const nValue = event.target.value;
        setItemCh({ ...itemCh, Id_Tipo_Domi: nValue });
    };

    const chPhoneType = (event) => {
        const nValue = event.target.value;
        setPhoneCh({ ...phoneCh, type: nValue });
    };

    const chPhoneCountry = (event) => {
        const nValue = getAreaPaisXId(event.target.value);
        setPhoneCh({ ...phoneCh, pais: nValue });
    };

    const chPhoneCode = (event) => {
        const nValue = event.target.value;
        setPhoneCh({ ...phoneCh, area: nValue });
    };

    const chPhoneNum = (event) => {
        const nValue = event.target.value;
        setPhoneCh({ ...phoneCh, tel: nValue });
    };

    useEffect(() => {
        window.JsBarcode("#barcode", alldata.data ? alldata.data.credentials.barCode:"", {
            lineColor: "#000",
            height: 50,
        });

        if(userEmail === null){
            dispatch(getPersonalInformationAction());
        }
    }, []);

    const capitalize = (text)=>{
        try {
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        } catch (error) {
            return text;
        }
    }

    const saveChanges = ()=>{
        if(!itemCh.Id_Tipo_Domi){
            return window.generic.showModal('Verifica los datos', "Por favor seleccione un tipo de domicilio válido")
        }
        if(!itemCh.Id_Pais || itemCh.Id_Pais === 0){
            return window.generic.showModal('Verifica los datos', "Por favor seleccione un país válido")
        }
        if(!itemCh.Id_Provincia || itemCh.Id_Provincia === 0){
            return window.generic.showModal('Verifica los datos', "Por favor seleccione una provincia válida")
        }
        if(!itemCh.Id_Localidad || itemCh.Id_Localidad === 0){
            return window.generic.showModal('Verifica los datos', "Por favor seleccione una localidad válida")
        }
        if(!itemCh.Id_Barrio || itemCh.Id_Barrio === 0){
            return window.generic.showModal('Verifica los datos', "Por favor seleccione un barrio válido")
        }
        if(itemCh.Calle === ""){
            return window.generic.showModal('Verifica los datos', "Por favor ingrese una calle válida")
        }
        if(itemCh.Cod_postal === ""){
            return window.generic.showModal('Verifica los datos', "Por favor ingrese un código postal válido")
        }

        if(itemCh.nuevo){
            let tipo = itemCh.Id_Tipo_Domi;
            let igualAddress = myAddresses.find((address)=>{return address.Id_Tipo_Domi === tipo});
            if(igualAddress){
                return window.generic.showModal('Verifica los datos', "No se puede registrar dos domicilios del mismo tipo")
            }
            let tosend = {
                "idTipoDomi": itemCh.Id_Tipo_Domi,
                "calle": itemCh.Calle,
                "torre": "-",
                "piso": "-",
                "dpto": "-",
                "idBarrio": itemCh.Id_Barrio,
                "codigoPostal": itemCh.Cod_postal
            }
            dispatch(reqAddAddress(tosend));
            setMakeChangeAddress(false);
        }else{
            let tosend = {
                "idTipoDomi": itemCh.Id_Tipo_Domi,
                "calle": itemCh.Calle,
                "idBarrio": itemCh.Id_Barrio,
                "codigoPostal": itemCh.Cod_postal
            }
            dispatch(reqUpdateAddress(tosend));
            setMakeChangeAddress(false);
        }
        //dispatch(getPersonalInformationAction());
    }

    const getPaisArea = (area)=>{
        let res = "";
        for (let i = 0; i < counties.length; i++) {
            if(counties[i].Cod_TE === area){
                res = counties[i].Pais+" +"+counties[i].Cod_TE;
                break;
            }
        }
        return res;
    }

    const getAreaPaisXId = (id)=>{
        let res = "";
        for (let i = 0; i < counties.length; i++) {
            if(counties[i].Id_Pais === id){
                res = counties[i].Cod_TE;
                break;
            }
        }
        return res;
    }

    const deleteAddress = (type)=>{
        let tosend = {
            "idTipoDomi": type
        }
        dispatch(reqDeleteAddress(tosend));
        //dispatch(getPersonalInformationAction());
    }

    const saveChangesPhone = ()=>{
        if(!phoneCh.type){
            return window.generic.showModal('Verifica los datos', "Por favor seleccione un tipo de teléfono válido")
        }

        if(!phoneCh.pais || phoneCh.pais === 0){
            return window.generic.showModal('Verifica los datos', "Por favor seleccione un pais válido")
        }

        if(!phoneCh.area){
            return window.generic.showModal('Verifica los datos', "Por favor ingresa un código de área válido")
        }

        if(!phoneCh.tel || phoneCh.tel.length < 6){
            return window.generic.showModal('Verifica los datos', "Por favor ingresa un número de teléfono válido")
        }

        if(phoneCh.nuevo){
            let tipo = phoneCh.type;
            let igualPhone = myPhones.find((pho)=>{return pho.ID_TIPO_TE == tipo});
            if(igualPhone){
                return window.generic.showModal('Verifica los datos', "No se puede registrar dos teléfonos del mismo tipo")
            }
            let tosend = {
                "idTipoTel": phoneCh.type,
                "nroTel": phoneCh.pais+"-"+phoneCh.area+"-"+phoneCh.tel
            }
            dispatch(reqAddPhone(tosend));
            setMakeChangePhone(false);
        }else{
            let tosend = {
                "idTipoTel": phoneCh.type,
                "nroTel": phoneCh.pais+"-"+phoneCh.area+"-"+phoneCh.tel,
            }
            dispatch(reqUpdatePhone(tosend));
            setMakeChangePhone(false);
        }
        //dispatch(getPersonalInformationAction());
    }

    const deletePhone = (type)=>{
        let tosend = {
            "idTipoTel": type
        }
        dispatch(reqDeletePhone(tosend));
        //dispatch(getPersonalInformationAction());
    }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

            <div className="ies-mycarrerNav ies-mh260 ies-flwxbotomleft">
            <h4 className="ies-textpdata">DATOS PERSONALES</h4>
            </div>
            
            <div className="ies-tm40">
                <Row>
                    <Col xl={3} lg={12} md={12} sm={12} >
                        <Card>
                            <CardBody className="ies-hcardmycarrer">
                                <OffcanvasBody className="profile-offcanvas p-0">
                                        
                                <div className="p-3 text-center">

                                    {alldata.data ? (alldata.data.photo ? (
                                        <div className="photoContainer">
                                            <img src={alldata.data.photo} className="photoData"/>
                                        </div>
                                    ):(
                                        <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-dpcircleav">
                                            <i className="ri-account-circle-line ies-iconyoenies ies-avataricon ies-ico34px"></i>
                                        </div>
                                    )):""}
                                    
                                    <div className="mt-3">
                                        <h5 className="fs-15"><Link to="#" className="link-primary">{alldata.data ? alldata.data.apellidos : ""}, {alldata.data ? alldata.data.nombres: ""}</Link></h5>
                                        <p className="text-muted">{usremail != "" ? usremail : (alldata.data ? alldata.data.email:"")}</p>
                                    </div>
                                </div>
                                </OffcanvasBody>
                            </CardBody>
                        </Card>
                        <Card>
                            <div className="ies-cardProfile">
                                <Row className="ies-cardProfileTop ies-fixrow">
                                    <Col lg={4} className="center"><br/>
                                        {alldata.data ? (alldata.data.photo ? (
                                            <div className="photoContainerbox">
                                                <img src={alldata.data.photo} className="photoDatabox"/>
                                            </div>
                                        ):(
                                            <img src="/cardprofile/av.jpeg" className="ies-mw100"/>
                                        )):<img src="/cardprofile/av.jpeg" className="ies-mw100"/>}
                                        <br/><br/>
                                    </Col>
                                    <Col lg={8} className="refactorCard">
                                        <br/><img className="ies-profilecardwhite" src={logoLight}/><br/>
                                        <h4 className="ies_white ies-mrgb0 capitalize ies-fs18">{alldata.data ? alldata.data.apellidos.toLowerCase():""}, {alldata.data ? alldata.data.nombres.toLowerCase():""}</h4>
                                        <span className="ies_white">{alldata.data ? alldata.data.dni: ""}</span>
                                    </Col>
                                </Row>
                                <Row className="ies-fixrow">
                                <Col lg={12} className="center ies-pad10">
                                    <svg id="barcode"></svg>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col xl={9} lg={12}>
                            <Card className="ies-mh518">
                                <CardHeader>
                                    <Nav className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                                        role="tablist">
                                        <NavItem className="pointer">
                                            <NavLink
                                                className={classnames({ active: activeTab === "1" }, "text-body")}
                                                onClick={() => {
                                                    tabChange("1");
                                                }}>
                                                <i className="fas fa-home"></i>
                                                Correo electronico
                                            </NavLink>
                                        </NavItem>
                                        <NavItem className="pointer">
                                            <NavLink to="#"
                                                className={classnames({ active: activeTab === "2" }, "text-body")}
                                                onClick={() => {
                                                    tabChange("2");
                                                }}
                                                type="button">
                                                <i className="far fa-user"></i>
                                                Domicilios
                                            </NavLink>
                                        </NavItem>
                                        <NavItem className="pointer">
                                            <NavLink to="#"
                                                className={classnames({ active: activeTab === "3" }, "text-body")}
                                                onClick={() => {
                                                    tabChange("3");
                                                }}
                                                type="button">
                                                <i className="far fa-envelope"></i>
                                                Teléfonos
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </CardHeader>
                                <CardBody className="p-4">
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="1">
                                            <Form>
                                                <Row className="g-2">
                                                    <Col lg={12}>
                                                        <p className="text-muted">Se le enviará un mensaje a la dirección de correo ingresado solicitandole la confirmación para validar el cambio.</p>
                                                        <br/>
                                                        <div>
                                                            <Label htmlFor="oldpasswordInput" className="form-label">
                                                                Correo</Label>
                                                            <Input type="text" className="form-control"
                                                                id="emailChange"
                                                                placeholder="email@correo.com" 
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}    
                                                            />
                                                        </div>
                                                    </Col>

                                                    <Col lg={12}>
                                                        <div className="text-end"><br/>
                                                            <button type="button" className="btn btn-success" onClick={() => changeEmailClick(email)}>
                                                                Guardar
                                                            </button>
                                                        </div>
                                                    </Col>

                                                </Row>

                                            </Form>
                                        </TabPane>

                                        <TabPane tabId="2">
                                                {
                                                    myAddresses.map((item, i) => (
                                                        (
                                                        <Row className="g-2" key={item.Id_Tipo_Domi}>
                                                            <Col lg={4}>
                                                                <div>
                                                                    <Label htmlFor="exampleFormControlTextarea5" className="form-label">Tipo</Label>
                                                                    <select onChange={chTypeAd} disabled={!item.edit?true:(item.isObligatory ? true:false)} className="form-select mb-3" aria-label="Default select example" defaultValue={item.Id_Tipo_Domi}>
                                                                        {
                                                                            addressType.map((itemAdd) => (
                                                                                <option value={itemAdd.id} key={itemAdd.id} >{capitalize(itemAdd.name)} </option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </Col>

                                                            <Col lg={4}>
                                                                <div>
                                                                    <Label htmlFor="exampleFormControlTextarea5" className="form-label">Pais</Label>
                                                                    <select  onChange={getProvincesOfCountry} disabled={!item.edit?true:false} className="form-select mb-3" aria-label="Default select example" value={itemCh.Id_Pais}>
                                                                        {item.edit ? (
                                                                            <>
                                                                                {(counties ? counties:[]).map((itemC) => (
                                                                                    <option value={itemC.Id_Pais} key={itemC.Id_Pais} >{capitalize(itemC.Pais)} </option>
                                                                                ))}
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <option >{capitalize(item.pais)} </option>
                                                                            </>
                                                                        )}
                                                                    </select>
                                                                </div>
                                                            </Col>

                                                            <Col lg={4}>
                                                                <div>
                                                                <Label htmlFor="exampleFormControlTextarea5" className="form-label">Provincia</Label>
                                                                    <select onChange={getLocalitiesOfProvinces} disabled={!item.edit?true:false} className="form-select mb-3" aria-label="Default select example" value={itemCh.Id_Provincia}>
                                                                        {item.edit ? (
                                                                            <>
                                                                                {(provinces ? (itemCh.Id_Pais ? provinces: []):[]).map((itemC) => (
                                                                                    <option value={itemC.Id_Provincia} key={itemC.Id_Provincia} >{capitalize(itemC.Provincia)} </option>
                                                                                ))}
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <option >{capitalize(item.provincia)} </option>
                                                                            </>
                                                                        )}
                                                                    </select>
                                                                </div>
                                                            </Col>
                                                            <Col lg={4}>
                                                                <div>
                                                                <Label htmlFor="exampleFormControlTextarea5" className="form-label">Localidad</Label>
                                                                    <select onChange={getNeighboursOfLocality} disabled={!item.edit?true:false} className="form-select mb-3" aria-label="Default select example" value={itemCh.Id_Localidad}>
                                                                        {item.edit ? (
                                                                            <>
                                                                                {(localities ? (itemCh.Id_Provincia ? localities: []):[]).map((itemC) => (
                                                                                    <option value={itemC.Id_Localidad} key={itemC.Id_Localidad} >{capitalize(itemC.Localidad)} </option>
                                                                                ))}
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <option >{capitalize(item.Localidad)} </option>
                                                                            </>
                                                                        )}
                                                                    </select>
                                                                </div>
                                                            </Col>

                                                            <Col lg={4}>
                                                                <div>
                                                                <Label htmlFor="exampleFormControlTextarea5" className="form-label">Barrio</Label>
                                                                    <select onChange={setNeighbours} disabled={!item.edit?true:false} className="form-select mb-3" aria-label="Default select example" value={itemCh.Id_Barrio}>
                                                                        {item.edit ? (
                                                                            <>
                                                                                {(neighbours ? (itemCh.Id_Localidad ? neighbours: []):[]).map((itemC) => (
                                                                                    <option value={itemC.Id_Barrio} key={itemC.Id_Barrio} >{capitalize(itemC.barrio)} </option>
                                                                                ))}
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <option >{capitalize(item.Barrio)} </option>
                                                                            </>
                                                                        )}
                                                                    </select>
                                                                </div>
                                                            </Col>

                                                            <Col lg={4}>
                                                                <div>
                                                                    <Label htmlFor="confirmpasswordInput" className="form-label">
                                                                        Calle y número</Label>
                                                                    <Input disabled={!item.edit?true:false} type="text" className="form-control"
                                                                        id="confirmpasswordInput"
                                                                        placeholder="San lorenzo 512" 
                                                                        onChange={chCalle}
                                                                        value={item.edit ? itemCh.Calle : item.Calle}
                                                                        />
                                                                </div>
                                                            </Col>

                                                            <Col lg={4}>
                                                                <div>
                                                                    <Label htmlFor="confirmpasswordInput" className="form-label">
                                                                        Código postal</Label>
                                                                    <Input onChange={chCP} disabled={!item.edit?true:false} type="text" className="form-control"
                                                                        id="confirmpasswordInput"
                                                                        value={item.edit ? itemCh.Cod_postal : item.Cod_postal}
                                                                        placeholder="5000" />
                                                                </div>
                                                            </Col>
                                                            <Col lg={4}>
                                                                {makeChangeAddress ? (item.edit ? (
                                                                    <div>
                                                                        <Label htmlFor="confirmpasswordInput" className="form-label">{"　"}</Label><br/>
                                                                        <button onClick={()=>editAddress(i)} color="info" className="btn btn-outline-info ies_mr10 ies-buttonAddress"><i className="bx bx-x-circle ies-top2"></i></button>
                                                                    </div>
                                                                ):"") : (
                                                                    <div>
                                                                        <Label htmlFor="confirmpasswordInput" className="form-label">{"　"}</Label><br/>
                                                                        <button onClick={()=>editAddress(i)} color="info" className="btn btn-outline-info ies_mr10 ies-buttonAddress"><i className="bx bx-edit-alt ies-top2"></i></button>
                                                                        { item.isObligatory ? "" : 
                                                                            (
                                                                                <button color="info" onClick={()=>deleteAddress(item.Id_Tipo_Domi)} className="btn btn-outline-info ies_mr10 ies-buttonAddress"><i className="bx bx-trash ies-top2"></i></button>
                                                                            )
                                                                        }
                                                                    </div>
                                                                )}
                                                            </Col>
                                                            <Col lg={12}><hr/></Col>
                                                        </Row>
                                                        )
                                                    ))
                                                }
                                                
                                                <Row>
                                                    <Col lg={12}><br/></Col>
                                                    <Col lg={12}><br/>
                                                        <div className="text-end">
                                                            <div className="ies_tar">
                                                                <button disabled={makeChangeAddress} onClick={addAddress} color="info" className="btn btn-outline-info ies_mr10">Agregar</button>
                                                                <button disabled={!makeChangeAddress} onClick={saveChanges} className="btn btn-success">Guardar</button>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                        </TabPane>

                                        <TabPane tabId="3">
                                                {myPhones.map((item, y) => (
                                                    <Row className="g-2" key={item.ID_TIPO_TE}>
                                                        <Col lg={3}>
                                                            <div>
                                                            <Label htmlFor="exampleFormControlTextarea5" className="form-label">Tipo</Label>
                                                                <select value={phoneCh.type} onChange={chPhoneType} disabled={!item.edit?true:(phoneCh.nuevo?false:true)} className="form-select mb-3" aria-label="Default select example">
                                                                    {item.edit ? (
                                                                        <>
                                                                            <option value="C">Celular</option>
                                                                            <option value="D">Celular corporativo</option>
                                                                            <option value="F">Familiar</option>
                                                                            <option value="X">Fax</option>
                                                                            <option value="M">Mensajes</option>
                                                                            <option value="P">Particular</option>
                                                                            <option value="O">Otros</option>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <option >{capitalize(item.TIPO_TE)}</option>
                                                                        </>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </Col>

                                                        {
                                                            item.edit ? (
                                                                <>
                                                                    <Col lg={2}>
                                                                    <Label htmlFor="exampleFormControlTextarea5" className="form-label">País</Label>
                                                                    <select onChange={chPhoneCountry} disabled={!item.edit?true:false} className="form-select mb-3" aria-label="Default select example" defaultValue={1}>
                                                                    {item.edit ? (
                                                                            <>
                                                                                {
                                                                                    (counties ? counties:[]).map((itemC) => (
                                                                                        <option value={itemC.Id_Pais} key={itemC.Id_Pais} >{capitalize(itemC.Pais)+(itemC.Cod_TE == '0' ? "":(" +"+itemC.Cod_TE))} </option>
                                                                                    ))
                                                                                }
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <option >{getPaisArea(parseInt(54))}</option>
                                                                            </>
                                                                        )}
                                                                        
                                                                    </select>
                                                                    </Col>

                                                                    <Col lg={2}>
                                                                        <Label htmlFor="newpasswordInput" className="form-label">
                                                                            Código área</Label>
                                                                        <Input onChange={chPhoneCode} disabled={!item.edit?true:false} type="text" className="form-control"
                                                                            id="newpasswordInput" placeholder="351" value={item.edit ? phoneCh.area:item.area}/>
                                                                    </Col>

                                                                    <Col lg={3}>
                                                                        <div>
                                                                            <Label htmlFor="confirmpasswordInput" className="form-label">
                                                                                Número</Label>
                                                                            <Input onChange={chPhoneNum} disabled={!item.edit?true:false} type="text" className="form-control"
                                                                                id="confirmpasswordInput"
                                                                                placeholder="24565844"  value={item.edit ? phoneCh.tel:item.tel}/>
                                                                        </div>
                                                                    </Col>
                                                                </>
                                                            ):(
                                                                <Col lg={7}>
                                                                    <div>
                                                                        <Label htmlFor="confirmpasswordInput" className="form-label">
                                                                            Número</Label>
                                                                        <Input onChange={chPhoneNum} disabled={!item.edit?true:false} type="text" className="form-control"
                                                                            id="confirmpasswordInput"
                                                                            placeholder="24565844"  value={item.NRO_TE}/>
                                                                    </div>
                                                                </Col>
                                                            )
                                                        }
                                                        

                                                        <Col lg={2}>
                                                            <div>
                                                                <Label htmlFor="confirmpasswordInput" className="form-label">{"　"}</Label><br/>

                                                                {makeChangePhone ? (item.edit ? (
                                                                    <div>
                                                                        <button onClick={()=>editPhone(y)} color="info" className="btn btn-outline-info ies_mr10 ies-buttonAddress"><i className="bx bx-x-circle ies-top2"></i></button>
                                                                    </div>
                                                                ):"") : (
                                                                    <div>
                                                                        <button onClick={()=>editPhone(y)} color="info" className="btn btn-outline-info ies_mr10 ies-buttonAddress"><i className="bx bx-edit-alt ies-top2"></i></button>
                                                                        <button color="info" onClick={()=>deletePhone(item.ID_TIPO_TE)} className="btn btn-outline-info ies_mr10 ies-buttonAddress"><i className="bx bx-trash ies-top2"></i></button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </Col>
                                                        <Col lg={12}><hr/></Col>
                                                    </Row>
                                                ))}
                                                
                                                <Row>
                                                    <Col lg={12}><br/></Col>
                                                    <Col lg={12}><br/>
                                                        <div className="text-end">
                                                            <div className="ies_tar">
                                                                <button disabled={makeChangePhone} onClick={addPhone} color="info" className="btn btn-outline-info ies_mr10">Agregar</button>
                                                                <button disabled={!makeChangePhone} onClick={saveChangesPhone} className="btn btn-success">Guardar</button>
                                                            </div>
                                                        </div>
                                                    </Col>

                                                </Row>
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                </Row>
            </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DatosPersonales;
