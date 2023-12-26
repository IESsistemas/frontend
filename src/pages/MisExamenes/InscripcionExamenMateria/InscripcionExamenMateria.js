import React, { useState, useEffect } from "react";
import { Col, Container, Row, Badge, Table, Modal, AccordionItem, Collapse, Accordion, Card, CardBody, Alert } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";

const InscripcionExamenMateria = () => {
  document.title ="IES - InscripcionExamenMateria";
  //const career = JSON.parse(localStorage.getItem('careerSelected'))
    const { carrerSelected, alldata, academic } = useSelector(state => {
        return {
        carrerSelected: state.Login.carrerSelected,
        alldata: state.Login.userData,
        academic: state.MisMaterias.academic
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
            <h5>Inscripción a exámenes finales</h5><br/>
            <p><span style={{fontWeight: 'bold'}}>Asignatura:</span> Planeamiento de la comunicación I</p><br/>
            <p><span style={{fontWeight: 'bold'}}>Día y horario:</span> 22/06/2023 a las 11:00am</p><br/>
            <p><span style={{fontWeight: 'bold'}}>Mesa de exámen:</span> Mañana A</p>
            <br/>
            <div className="ies_tar">
                <button color="info" className="btn btn-outline-info ies_mr10" onClick={() => {
                    tog_center();
                }}>Cancelar</button>
                <button className="btn btn-success" >Confirmar</button>
            </div><br/>
        </div>
    </Modal>
    <div className="page-content">
        <Container fluid>
            <h3>INSCRIPCIÓN EXÁMENES FINALES</h3>
                <Row>
                    <Col xs={12} className='mb-2'>
                        <p className='text-muted'>
                            Formas y medios de pago para los aranceles de las asignaturas del semestre
                        </p>
                    </Col>
                </Row>
                <Row className="mt-3 justify-content-center">
                    <Col md={8} className='mb-3' >
                        <Accordion id="default-accordion-example">
                            <AccordionItem>
                                <h2 className="accordion-header" id="headingOne">
                                    <button
                                        className={classnames("accordion-button fw-semibold", { collapsed: !col1 })} type="button" onClick={t_col1} style={{ cursor: "pointer" }} >
                                        Requisitos
                                    </button>
                                </h2>

                                <Collapse isOpen={col1} className="accordion-collapse" id="collapseOne" >
                                    <div className="accordion-body">
                                        <ul>
                                            <li>
                                                Tener el legajo completo.
                                            </li>
                                            <li>
                                                Estar habilitado admistrativa y académicamente.
                                            </li>
                                            <li>
                                                Cumplir con el régimen de correlatividades y el porcentaje de asignaturas aprobadas.
                                            </li>
                                            <li>
                                                Tener abonado el derecho de exámen.
                                            </li>
                                            <li>
                                                Leer el <a href="#" target="_blank">Protocolo</a>
                                            </li>
                                        </ul>
                                    </div>
                                </Collapse>
                            </AccordionItem><br/>
                            <AccordionItem>
                                <h2 className="accordion-header" id="headingTwo">
                                    <button
                                        className={classnames("accordion-button fw-semibold", { collapsed: !col2 })} type="button" onClick={t_col2} style={{ cursor: "pointer" }} >
                                        Plazos
                                    </button>
                                </h2>

                                <Collapse isOpen={col2} className="accordion-collapse" >
                                    <div className="accordion-body">
                                        <ul>
                                            <li>
                                            En ambas modalidades, Libres o Regulares, el último plazo es <span style={{color: 'red'}}>72 hs ántes</span> del exámen
                                            </li>
                                        </ul>
                                    </div>
                                </Collapse>
                            </AccordionItem><br/>
                            <AccordionItem>
                                <h2 className="accordion-header" id="headingThree">
                                    <button
                                        className={classnames("accordion-button fw-semibold", { collapsed: !col3 })} type="button" onClick={t_col3} style={{ cursor: "pointer" }} >
                                        Modalidades
                                    </button>
                                </h2>
                                <Collapse isOpen={col3} className="accordion-collapse" >
                                    <div className="accordion-body">
                                        <span style={{fontWeight: 'bold'}}>MODALIDAD PRESENCIAL</span><br/>
                                        Los exámenes finales se rinden de forma presencial en la sede ubicada en Rondeau 165, Córdoba, Arg<br/>
                                        <ul>
                                            <li>
                                                Alumnos regulares: Instancia escrita.
                                            </li>
                                            <li>
                                                Alumnos libres: Instancia escrita y oral.
                                            </li>
                                        </ul><br/>
                                        <span style={{fontWeight: 'bold'}}>MODALIDAD DISTANCIA</span><br/>
                                        Los exámenes finales son 100% virtuales y constan de dos instancias, una escrita y otra oral, tanto para alumnos regulares, como libres.<br/>
                                        <ul>
                                            <li>
                                                <span style={{fontWeight: 'bold'}}>Exámen escrito:</span> La consigna de la instancia escriba derá ser descargada por el alumno, el día y horario especificado al momento de incribirse desde: <span style={{color: 'red'}}>Autogestión/trámites/ Descargar modelo de exámen.</span>
                                            </li>
                                            <li>
                                                <span style={{fontWeight: 'bold'}}>Exámen oral:</span> La instancia oral se rinde desde la plataforma Zoom en los siguientes turnos:
                                                <ul>
                                                    <li>
                                                        Mañana: <span style={{color: 'red'}}>11:00 am</span>
                                                    </li>
                                                    <li>
                                                        Tarde: <span style={{color: 'red'}}>18:00 pm</span>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </Collapse>
                            </AccordionItem><br/>
                            <AccordionItem>
                                <h2 className="accordion-header" id="headingThree">
                                    <button
                                        className={classnames("accordion-button fw-semibold", { collapsed: !col4 })} type="button" onClick={t_col4} style={{ cursor: "pointer" }} >
                                        Link de acceso
                                    </button>
                                </h2>
                                <Collapse isOpen={col4} className="accordion-collapse" >
                                    <div className="accordion-body">
                                        <span style={{fontWeight: 'bold'}}>Información a considerar</span><br/>
                                        Los exámenes finales se rinden de forma presencial en la sede ubicada en Rondeau 165, Córdoba, Arg<br/>
                                        <ul>
                                            <li>
                                                Cuando las mesas son numerosas, Bedelía distancia notificará mediante whatsapp un horario de ingreso al enlace de Zoom.
                                            </li>
                                            <li>
                                                El alumno deberá ingresar 15 minutos antes y contar a mano con DNI.
                                            </li>
                                            <li>
                                                El enlace siempre será el mismo, <a href="https://us02web.zoom.us/j/5393879873" target="_blank">https://us02web.zoom.us/j/5393879873</a>
                                            </li>
                                        </ul>
                                    </div>
                                </Collapse>
                            </AccordionItem>
                        </Accordion>
                        <br/>
                        <Alert color="danger" role="alert">
                            No existen mesas de exámenes disponibles
                        </Alert>
                        <br/><br/>
                        <h4>
                            Asignaturas regularizadas aptas Exámen
                        </h4><br/>
                        <Table className="table-borderless align-middle table-nowrap mb-0 ies-tableanalitico">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Semestre</th>
                                    <th scope="col">Asignatura</th>
                                    <th scope="col">Centro de extensión</th>
                                    <th scope="col">Mesa de exámen</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <div className="form-check" style={{marginLeft: "10px"}}> 
                                        <input className="form-check-input" type="checkbox" value="" id="cardtableCheck01" />
                                        <label className="form-check-label" htmlFor="cardtableCheck01"></label>
                                    </div>
                                    <td>
                                        3
                                    </td>
                                    <td>
                                        Planeamiento de la comunicación I
                                    </td>
                                    <td>
                                        Virtual
                                    </td>
                                    <td>
                                        <select className="form-select no-border">
                                            <option value=''>Seleccionar</option>
                                            <option value=''>Otra</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <div className="form-check" style={{marginLeft: "10px"}}> 
                                        <input className="form-check-input" type="checkbox" value="" id="cardtableCheck01" />
                                        <label className="form-check-label" htmlFor="cardtableCheck01"></label>
                                    </div>
                                    <td>
                                        3
                                    </td>
                                    <td>
                                        Planeamiento de la comunicación I
                                    </td>
                                    <td>
                                        Virtual
                                    </td>
                                    <td>
                                        <select className="form-select no-border">
                                            <option value=''>Seleccionar</option>
                                            <option value=''>Otra</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="ies-analitico-botTable ies-tableinscmat">
                            <div className="ies-spacebtw">
                                <div className="ies_tar">
                                    <span style={{float: "left", position: "relative", top: "10px"}}>
                                        <span className="ies-bold">Total derechos de exámen: </span> $500,00
                                    </span>
                                    <button color="info" className="btn btn-outline-info ies_mr10">Cancelar</button>
                                    <button className="btn btn-success" onClick={() => {
                                        tog_center();
                                    }}>Inscribirme</button>
                                </div>
                            </div>
                        </div>
                        <br/><br/>
                        <h4>
                            Asignaturas libres aptas Exámen
                        </h4><br/>
                        <Table className="table-borderless align-middle table-nowrap mb-0 ies-tableanalitico">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Semestre</th>
                                    <th scope="col">Asignatura</th>
                                    <th scope="col">Centro de extensión</th>
                                    <th scope="col">Mesa de exámen</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <div className="form-check" style={{marginLeft: "10px"}}> 
                                        <input className="form-check-input" type="checkbox" value="" id="cardtableCheck01" />
                                        <label className="form-check-label" htmlFor="cardtableCheck01"></label>
                                    </div>
                                    <td>
                                        3
                                    </td>
                                    <td>
                                        Planeamiento de la comunicación I
                                    </td>
                                    <td>
                                        Virtual
                                    </td>
                                    <td>
                                        <select className="form-select no-border">
                                            <option value=''>Seleccionar</option>
                                            <option value=''>Otra</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="ies-analitico-botTable ies-tableinscmat">
                            <div className="ies-spacebtw">
                                <div className="ies_tar">
                                    <span style={{float: "left", position: "relative", top: "10px"}}>
                                        <span className="ies-bold">Total derechos de exámen: </span> $500,00
                                    </span>
                                    <button color="info" className="btn btn-outline-info ies_mr10">Cancelar</button>
                                    <button className="btn btn-success"  onClick={() => {
                                        tog_center();
                                    }}>Inscribirme</button>
                                </div>
                            </div>
                        </div>
                        <br/><br/>
                        <h4>
                            Asignaturas inscriptas a rendir
                        </h4><br/>
                        <Table className="table-borderless align-middle table-nowrap mb-0 ies-tableanalitico">
                            <thead>
                                <tr>
                                    <th scope="col">Asignatura</th>
                                    <th scope="col">Centro de extensión</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Hora</th>
                                    <th scope="col">Nota</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Planeamiento de la comunicación I
                                    </td>
                                    <td>
                                        Córdoba capital
                                    </td>
                                    <td>
                                        26/06/23
                                    </td>
                                    <td>
                                        11:00 am
                                    </td>
                                    <td>
                                        Sin nota
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            <br/><br/><br/>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default InscripcionExamenMateria;
