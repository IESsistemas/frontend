import React, { useState, useEffect } from "react";
import { Col, Container, Row, Badge, Table, Modal, AccordionItem, Collapse, Accordion, Card, CardBody, Alert, Label, Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";

const InscripcionExamenMateria = () => {
  document.title ="IES - Fecha Seminario";
  //const career = JSON.parse(localStorage.getItem('careerSelected'))
    const { alldata, academic, carrerSelected} = useSelector(state => {
        return {
        alldata: state.Login.userData,
        academic: state.MisMaterias.academi,
        carrerSelected: state.Login.carrerSelected,
    }});

    const [col1, setcol1] = useState(false);
    const [col2, setcol2] = useState(false);
    const [col3, setcol3] = useState(false);
    const [col4, setcol4] = useState(false);

    const t_col1 = () => {
        setcol1(!col1);
    };

    const t_col2 = () => {
        setcol2(!col2);
    };

    const t_col3 = () => {
        setcol3(!col3);
    };

    const t_col4 = () => {
        setcol4(!col4);
    };
    
    const dispatch = useDispatch();

    useEffect(() => {
        if(carrerSelected){
            //dispatch(reqPostAcademicInfo({"idCareer": carrerSelected.ID_CARRERA}));
        }
    }, []);


    const formatNumberArg = (num) => {
        num = parseFloat(num.toFixed(2));
        let n = num.toLocaleString('es-AR');
        return n.indexOf(',')!= -1 ? (
            n.split(',')[1].length == 1 ? (n+"0"):n
        ):(n+",00");
    }

    const fdate = (date)=>{
        //format date string to dd/mm/yyyy
        let d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();
        if (month.length < 2){
            month = '0' + month;
        } 
        if (day.length < 2){
            day = '0' + day;
        }
    
        return [day, month, year].join('/');
    }

    const [modal_center, setmodal_center] = useState(false);

    function tog_center(tribunal) {
        //if(tribunal) settribunalValue(tribunal)
        setmodal_center(!modal_center);
    }

    return (
    <React.Fragment>
    <Modal
        isOpen={modal_center}
        toggle={() => {
            tog_center();
        }}
        centered
    >
        <div className="ies-spacebtw">
            <br/>
            <h5>Constancia pedido Fecha de tesis</h5><br/>
            <div style={{textAlign: "center"}}>
            <img src="/comprobanteFechaSeminario.jpeg" style={{maxWidth: "400px"}}/><br/><br/>
            <button>Imprimir</button>
            </div><br/>
            <p>Con este procedimiento:</p>
            <br/>
            <ul>
                <li>
                    Solicitaste la fecha de Seminario Final
                </li>
                <li>
                    Iniciaste el trámite de tu título
                </li>
                <li>
                    Estás incluido en la base de datos para el próximo acto de colación, cuya información está disponible en www.ies21.edu.ar
                </li>
            </ul>
            <br/>
            <p>Recordamos que queda prohibido que los alumnos y alumnas del instituto, así</p>
            <div className="ies_tar">
                <button className="btn btn-success" onClick={() => {
                    tog_center();
                }}>Imprimir</button>
            </div><br/>
        </div>
    </Modal>
    <div className="page-content">
        <Container fluid>
                <h3>SOLICITUD FECHA EXÁMEN FINAL</h3>
                <Row className="mt-3 justify-content-center">
                    <Col md={8} className='mb-3' >
                        <Accordion id="default-accordion-example" className="custom-accordionwithicon custom-accordion-border accordion-border-box accordion-success ">
                            <AccordionItem>
                                <h2 className="accordion-header" id="headingOne">
                                    <button
                                        className={classnames("accordion-button fw-semibold", { collapsed: !col1 })} type="button" onClick={t_col1} style={{ cursor: "pointer" }} >
                                        Procedimiento
                                    </button>
                                </h2>

                                <Collapse isOpen={col1} className="accordion-collapse" id="collapseOne" >
                                    <div className="accordion-body">
                                        <ul>
                                            <li>
                                            Presentar el trabajo de Seminario Final al Director de Carrera quien deberá autorizar la defensa oral del mismo.
                                            </li>
                                            <li>
                                            Realizar la Solicitud de Mesa de Seminario Final utilizando Autogestión e imprimir constancia de trámite.
                                            </li>
                                            <li>
                                            Solicitar en Secretaría o Prosecretaría Académica el analítico, confirmando si está en condiciones académicas y administrativas (debe tener el arancel de examen pago) de inscribirse al examen.
                                            </li>
                                            <li>
                                            Entregar al Director de Carrera comprobante de pedido de mesa y analítico para fijar la fecha del Seminario Final.
                                            </li>
                                        </ul>
                                        <p>Si usted cuenta con la autorización de su director de carrera, haga <a href="#">click aqui</a> para continuar</p>
                                    </div>
                                </Collapse>
                            </AccordionItem><br/>
                        </Accordion>
                        <Alert color="info" role="alert">
                        De esta planilla se tomarán los datos personales para confeccionarte el título, los mismos deben coincidir con los datos que figuran en tu DNI.
                        </Alert>
                        

                        <div className="ies-mycarrerNav">
                            <div>
                                <div alt="" className="avatar-lg img-thumbnail rounded-circle ies-avatarcircleico ies-aliceblue ies-color ies-iconmycarrermenucarrer">
                                    <i className="ri-bookmark-3-fill ies-avataricon ies-orangecolor"></i>
                                </div>
                            </div>
                            <div className="ies-nexicomycarrer ies-conttextmycarrer"><br/>
                                <h4 style={{color:"white"}}>{alldata ? (alldata.data ? alldata.data.apellidos:""):""}, {alldata? (alldata.data ? alldata.data.nombres:""):""}</h4>
                                <p><i className=" bx bxs-graduation"></i> {carrerSelected ? carrerSelected.DESCRIPCION : ""} <span className="ies-pipe">|</span> 
                                <i className="bx bxs-folder-open"></i> Analítico-resolución: {carrerSelected ? carrerSelected.RESOLUCION : ""} 
                                <span className="ies-pipe">|</span><Badge className="ies-orangecolorbg capitalize" pill> {carrerSelected ? carrerSelected.MODALIDAD.toLowerCase() : ""} </Badge></p>
                                {
                                    academic ? (
                                        <p>{academic.datosBeca ? (
                                            academic.datosBeca.porcentaje > 0? (
                                                "Beca "+academic.datosBeca.porcentaje+"% para el Periodo "+academic.datosBeca.semestre+"/"+academic.datosBeca.anio
                                            ):""
                                        ):""}</p>
                                    ):""
                                }
                            </div>
                            
                            <div className="ies-nexicomycarrer ies-conttextmycarrer">
                            </div>
                        </div>
                        <div className="card" style={{padding: "20px"}}>
                            <h4>
                                Datos se nacimiento
                            </h4>
                            <Row className="g-2">
                                <Col lg={4}>
                                    <Label htmlFor="confirmpasswordInput" className="form-label">
                                        Nombre</Label>
                                    <Input type="text" className="form-control"
                                    id="confirmpasswordInput"
                                    placeholder="San lorenzo 512" 
                                    />
                                </Col>
                                <Col lg={4}>
                                    <Label htmlFor="confirmpasswordInput" className="form-label">
                                        Apellido</Label>
                                    <Input type="text" className="form-control"
                                    id="confirmpasswordInput"
                                    placeholder="San lorenzo 512" 
                                    />
                                </Col>
                                <Col lg={4}>
                                    <Label htmlFor="confirmpasswordInput" className="form-label">
                                        Fecha</Label>
                                    <Input type="text" className="form-control"
                                    id="confirmpasswordInput"
                                    placeholder="San lorenzo 512" 
                                    />
                                </Col>
                                <Col lg={4}>
                                <   Label htmlFor="exampleFormControlTextarea5" className="form-label">País</Label>
                                    <select className="form-select mb-3" aria-label="Default select example">
                                        <option value="-1">Seleccione...</option>
                                    </select>
                                </Col>
                                <Col lg={4}>
                                <   Label htmlFor="exampleFormControlTextarea5" className="form-label">Provincia</Label>
                                    <select className="form-select mb-3" aria-label="Default select example">
                                        <option value="-1">Seleccione...</option>
                                    </select>
                                </Col>
                                <Col lg={4}>
                                <   Label htmlFor="exampleFormControlTextarea5" className="form-label">Localidad</Label>
                                    <select className="form-select mb-3" aria-label="Default select example">
                                        <option value="-1">Seleccione...</option>
                                    </select>
                                </Col>
                                <Col lg={4}>
                                <   Label htmlFor="exampleFormControlTextarea5" className="form-label">Departamento</Label>
                                    <select className="form-select mb-3" aria-label="Default select example">
                                        <option value="-1">Seleccione...</option>
                                    </select>
                                </Col>
                            </Row><br/><br/>

                            <h4>
                                Domicilio
                            </h4>
                            <Row className="g-2">
                                <Col lg={4}>
                                <   Label htmlFor="exampleFormControlTextarea5" className="form-label">País</Label>
                                    <select className="form-select mb-3" aria-label="Default select example">
                                        <option value="-1">Seleccione...</option>
                                    </select>
                                </Col>
                                <Col lg={4}>
                                <   Label htmlFor="exampleFormControlTextarea5" className="form-label">Provincia</Label>
                                    <select className="form-select mb-3" aria-label="Default select example">
                                        <option value="-1">Seleccione...</option>
                                    </select>
                                </Col>
                                <Col lg={4}>
                                <   Label htmlFor="exampleFormControlTextarea5" className="form-label">Localidad</Label>
                                    <select className="form-select mb-3" aria-label="Default select example">
                                        <option value="-1">Seleccione...</option>
                                    </select>
                                </Col>
                                <Col lg={4}>
                                <   Label htmlFor="exampleFormControlTextarea5" className="form-label">Barrio</Label>
                                    <select className="form-select mb-3" aria-label="Default select example">
                                        <option value="-1">Seleccione...</option>
                                    </select>
                                </Col>
                                <Col lg={4}>
                                    <Label htmlFor="confirmpasswordInput" className="form-label">
                                        Código Postal</Label>
                                    <Input type="text" className="form-control"
                                    id="confirmpasswordInput"
                                    placeholder="San lorenzo 512" 
                                    />
                                </Col>
                                <Col lg={4}>
                                    <Label htmlFor="confirmpasswordInput" className="form-label">
                                        Calle</Label>
                                    <Input type="text" className="form-control"
                                    id="confirmpasswordInput"
                                    placeholder="San lorenzo 512" 
                                    />
                                </Col>
                                <Col lg={4}>
                                    <Label htmlFor="confirmpasswordInput" className="form-label">
                                        Número</Label>
                                    <Input type="text" className="form-control"
                                    id="confirmpasswordInput"
                                    placeholder="San lorenzo 512" 
                                    />
                                </Col>
                                <Col lg={4}>
                                    <Label htmlFor="confirmpasswordInput" className="form-label">
                                        Piso</Label>
                                    <Input type="text" className="form-control"
                                    id="confirmpasswordInput"
                                    placeholder="San lorenzo 512" 
                                    />
                                </Col>
                                <Col lg={4}>
                                    <Label htmlFor="confirmpasswordInput" className="form-label">
                                        Departamento</Label>
                                    <Input type="text" className="form-control"
                                    id="confirmpasswordInput"
                                    placeholder="San lorenzo 512" 
                                    />
                                </Col>
                            </Row><br/><br/>

                            <h4>
                                Teléfonos
                            </h4>
                            <Row className="g-2">
                                <Col lg={4}>
                                    <Label htmlFor="confirmpasswordInput" className="form-label">
                                        Particular</Label>
                                    <Input type="text" className="form-control"
                                    id="confirmpasswordInput"
                                    placeholder="San lorenzo 512" 
                                    />
                                </Col>
                                <Col lg={4}>
                                    <Label htmlFor="confirmpasswordInput" className="form-label">
                                        Celular</Label>
                                    <Input type="text" className="form-control"
                                    id="confirmpasswordInput"
                                    placeholder="San lorenzo 512" 
                                    />
                                </Col>
                            </Row><br/><br/>

                            <h4>
                                Datos laborales
                            </h4>
                            <Row className="g-2">
                                <Col lg={4}>
                                    <Label htmlFor="confirmpasswordInput" className="form-label">
                                        Empresa</Label>
                                    <Input type="text" className="form-control"
                                    id="confirmpasswordInput"
                                    placeholder="San lorenzo 512" 
                                    />
                                </Col>
                                <Col lg={4}>
                                    <Label htmlFor="confirmpasswordInput" className="form-label">
                                        Puesto</Label>
                                    <Input type="text" className="form-control"
                                    id="confirmpasswordInput"
                                    placeholder="San lorenzo 512" 
                                    />
                                </Col>
                                <Col lg={4}>
                                    <Label htmlFor="confirmpasswordInput" className="form-label">
                                        Fecha de inicio</Label>
                                    <Input type="text" className="form-control"
                                    id="confirmpasswordInput"
                                    placeholder="San lorenzo 512" 
                                    />
                                </Col>
                            </Row><br/><br/>

                            <div className="ies-analitico-botTable ies-tableinscmat">
                                <div className="ies-spacebtw">
                                    <div className="ies_tar">
                                        <button color="info" className="btn btn-outline-info ies_mr10">Cancelar</button>
                                        <button className="btn btn-success" onClick={() => {
                                            tog_center();
                                        }} >Eviar</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        

                    <br /><br />
                    </Col>
                </Row>
            <br/><br/><br/>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default InscripcionExamenMateria;
