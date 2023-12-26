import React, { useState, useEffect } from "react";
import { Col, Container, Row, Badge, Table, Modal } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

const ExamenEspecial = () => {
  document.title ="IES - ExamenEspecial";
  //const career = JSON.parse(localStorage.getItem('careerSelected'))
    const { alldata, academic, carrerSelected } = useSelector(state => {
        return {
        alldata: state.Login.userData,
        academic: state.MisMaterias.academic,
        carrerSelected: state.Login.carrerSelected,
    }});


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
            <h5>SOLICITUD DE EXÁMEN ESPECIAL</h5>
            
            <Row className="mt-3 justify-content-center">
                    <Col md={8} className='mb-3' >
                    <Table className="table-borderless align-middle table-nowrap mb-0 ies-tableanalitico">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
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
                                        <span className="ies-bold">Derecho de exámen: </span> $0,00
                                    </span>
                                    <button color="info" className="btn btn-outline-info ies_mr10">Cancelar</button>
                                    <button className="btn btn-success" onClick={() => {
                                        tog_center();
                                    }}>Solicitar</button>
                                </div>
                            </div>
                        </div>
                        <br/><br/>
                    </Col>
                    <Col md={8} className='mb-3' >
                        <h5>Asignaturas inscriptas a rendir</h5>
                        <Table className="table-borderless align-middle table-nowrap mb-0 ies-tableanalitico">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
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
                    </Col>
            </Row>
            
            <br/><br/><br/>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ExamenEspecial;
