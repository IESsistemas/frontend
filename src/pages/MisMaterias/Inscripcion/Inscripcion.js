import React, { useState, useEffect } from "react";
import { Col, Container, Row, Badge, Table, Modal, Alert, CardFooter } from "reactstrap";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { reqPostInscriptionInfo } from "../../../store/actions";
import { useNavigate } from 'react-router-dom';

const Inscripciones = () => {
    const navigate = useNavigate();
    document.title ="IES - Home";
    //const career = JSON.parse(localStorage.getItem('careerSelected'))

    const { carrerSelected, alldata, inscription } = useSelector(state => {
        return {
        carrerSelected: state.Login.carrerSelected,
        alldata: state.Login.userData,
        inscription: state.MisMaterias.inscription
    }});

    const [modal_center, setmodal_center] = useState(false);

    function tog_center() {
        setmodal_center(!modal_center);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if(carrerSelected){
            dispatch(reqPostInscriptionInfo({"idCareer": carrerSelected.ID_CARRERA}));
        }
    }, []);

    useEffect(() => {
        if(inscription)
        if(inscription.data)
        if(inscription.data.code == 1){
            navigate('/ies/materias');
        }
    }, [inscription]);

    const formatNumberArg = (num) => {
        num = parseFloat(num.toFixed(2));
        let n = num.toLocaleString('es-AR');
        return n.indexOf(',')!= -1 ? n:(n+",00");
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
            <h5>Tribunal</h5><br/>
            <i className="ri-user-line"></i> <span>Cabral, Enrrique Eduardo - <span className="ies-lk">Presidente</span></span><br/><br/>
            <i className="ri-user-line"></i> <span>Cerry Milicay, María Magdalena Patricia - <span className="ies-lk">1° vocal</span></span><br/><br/>
            <i className="ri-user-line"></i> <span>Rodriguez, María Eguel - <span className="ies-lk">2° vocal</span></span><br/><br/>
            <br/>
        </div>
    </Modal>
      <div className="page-content">
        <Container fluid>
            <h4>INSCRIPCIÓN AL SEMESTRE</h4><br/>
            <div className="ies-mycarrerNav ies-minhunset ies-spacebtwflex">
                <div>
                    <div className="ies-nexicomycarrer ies-conttextmycarrer">
                        <i className="ri-account-circle-line ies-avataricon ies_white"></i>
                        <span className="ies-position-txtsemestre">
                            <h4 className="ies-content" style={{color:"white"}}>{alldata ? (alldata.data ? alldata.data.apellidos:""):""}, {alldata? (alldata.data ? alldata.data.nombres:""):""}<span className="ies-pipe">|</span></h4><p className="ies-content">{carrerSelected ? carrerSelected.DESCRIPCION : ""}</p>
                        </span>
                    </div>
                </div>
                <div>
                <a href="/RAI.pdf" target="_blank" className="btn btn-outline-info ies_mr10 mt-20 ies-t10 ies-whiteborderbuttom">Tramitar cambio modalidad</a>
                </div>
            </div><br/>
            <Row>
                <Col sm="12" md="7">
                    <Alert color="danger" className="">
                    Los Importes mencionados no incuyen matrícula, ni materias otorgadas por equivalencia.<br/>
                    
                    </Alert>

                    <Alert color="info" className="">
                    El valor de la matrícula es proporcional a la cantidad de asignaturas inscriptas en el semestre.<br/>
                    No se recibirá en la Institución ningún Pago en Efectivo, <Link to="/ies/materias/formas-pago">consultar las Formas de Pago.</Link><br/>
                    </Alert>

                    <Alert color="info" className="">
                    Si el nombre de la materia es acompañado por un signo "#" y un nùmero, esto indica que las materias indentificadas con el mismo nùmero deberàn ser inscriptas en conjunto y no podrán ser gestionadas de manera individual.
                    </Alert>

                    <br/><br/><h4>Asignaturas aptas para cursar</h4><br/>
                    <div className="ies-shadow">
                    <Table className="table-borderless align-middle table-nowrap mb-0 ies-tableanalitico">
                            <thead className="ies-bgcgray">
                                <tr>
                                    <th scope="col">Semestre</th>
                                    <th scope="col">Asignatura</th>
                                    {/*<th scope="col">Modalidad</th>
                                    <th scope="col">Comisión</th>
                                    <th scope="col">Centro extensión</th>*/}
                                    <th scope="col">Monto</th>
                                    <th scope="col">Inscribirse</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    inscription ? (
                                        inscription.data ? (
                                            (inscription.data.subjectsAvailablesToCourse ? inscription.data.subjectsAvailablesToCourse : []).map(el => 
                                                <tr key={el.ID_MATERIA}>
                                                    <td>
                                                        {el.CUATRIMESTRE}
                                                    </td>
                                                    <td>
                                                        {el.NOMBRE_MATERIA}
                                                    </td>
                                                    <td>
                                                        {el.PUNTOS_MAT}
                                                    </td>
                                                    <td>
                                                        <i className="ies-bico bx bx-edit-alt ies-top2" onClick={tog_center}></i>
                                                    </td>
                                                </tr>
                                            )
                                        ) : ""
                                    ):""
                                }
                            </tbody>
                        </Table>
                    </div>

                    <br/><br/><h4>Asignaturas pre-inscriptas</h4><br/>
                    <div className="ies-shadow">
                    <Table className="table-borderless align-middle table-nowrap mb-0 ies-tableanalitico">
                            <thead className="ies-bgcgray">
                                <tr>
                                    <th scope="col">Semestre</th>
                                    <th scope="col">Asignatura</th>
                                    <th scope="col">Modalidad</th>
                                    <th scope="col">Comisión</th>
                                    <th scope="col">Centro extensión</th>
                                    <th scope="col">Monto</th>
                                    <th scope="col">Borrar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    inscription ? (
                                        inscription.data ? (
                                            (inscription.data.subjectsPreEnrolled ? inscription.data.subjectsPreEnrolled : []).map(el => 
                                                <tr key={el.ID_MATERIA} className={el.Materia ? "":"displaynone"}>
                                                    <td>
                                                        {el.Semestre}
                                                    </td>
                                                    <td>
                                                        {el.Materia}
                                                    </td>
                                                    <td>
                                                        {el.Modalidad}
                                                    </td>
                                                    <td>
                                                        {el.Id_Comision}
                                                    </td>
                                                    <td>
                                                        {el.Ctro_Ext}
                                                    </td>
                                                    <td>
                                                        {el.Puntos}
                                                    </td>
                                                    <td>
                                                        <i className="ies-bico bx bx-x-circle ies-top2" onClick={tog_center}></i>
                                                    </td>
                                                </tr>
                                            )
                                        ) : ""
                                    ):""
                                }
                            </tbody>
                        </Table>
                    </div>

                    <br/><br/><h4>Asignaturas inscriptas</h4><br/>
                    <div className="ies-shadow">
                        <Table className="table-borderless align-middle table-nowrap mb-0 ies-tableanalitico">
                            <thead className="ies-bgcgray">
                                <tr>
                                    <th scope="col">Semestre</th>
                                    <th scope="col">Asignatura</th>
                                    <th scope="col">Modalidad</th>
                                    <th scope="col">Comisión</th>
                                    <th scope="col">Centro extensión</th>
                                    <th scope="col">Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    inscription ? (
                                        inscription.data ? (
                                            (inscription.data.subjectsEnrolled ? inscription.data.subjectsEnrolled : []).map(el => 
                                                <tr key={el.ID_MATERIA} className={el.Materia ? "":"displaynone"}>
                                                    <td>
                                                        {el.semestre}
                                                    </td>
                                                    <td>
                                                        {el.Materia}
                                                    </td>
                                                    <td>
                                                        {el.Modalidad}
                                                    </td>
                                                    <td>
                                                        {el.Id_Comision}
                                                    </td>
                                                    <td>
                                                        {el.Ctro_Ext}
                                                    </td>
                                                    <td>
                                                        ${formatNumberArg(el.Valor_Materia)}
                                                    </td>
                                                </tr>
                                            )
                                        ) : ""
                                    ):""
                                }
                            </tbody>
                        </Table>
                    </div>

                    
                </Col>
                <Col sm="12" md="5">
                    <h4>Valores de puntos</h4><br/>

                    <div className="ies-shadow ies-tableanalitico">
                        <Table className="table-borderless align-middle table-nowrap mb-0 ies-tableanalitico">
                            <thead className="ies-bgcgray">
                                <tr>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Porcentaje</th>
                                    <th scope="col">Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1 Asignatura</td>
                                    <td>25%</td>
                                    <td>
                                        {
                                            inscription ? (
                                                inscription.data ? (
                                                    inscription.data.registrationFee ?
                                                        ("$"+formatNumberArg(inscription.data.registrationFee.mediodelmediovalor))
                                                    :""
                                                ):""
                                            ): ""
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>2 Asignaturas</td>
                                    <td>50%</td>
                                    <td>
                                        {
                                            inscription ? (
                                                inscription.data ? (
                                                    inscription.data.registrationFee ?
                                                        ("$"+formatNumberArg(inscription.data.registrationFee.mediovalor))
                                                    :""
                                                ):""
                                            ): ""
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>3 o + Asignaturas</td>
                                    <td>100%</td>
                                    <td>
                                        {
                                            inscription ? (
                                                inscription.data ? (
                                                    inscription.data.registrationFee ?
                                                        ("$"+formatNumberArg(inscription.data.registrationFee.fullvalor))
                                                    :""
                                                ):""
                                            ): ""
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <br/>
                    </div><br/><br/>
                    <h4>Calculadora</h4><br/>

                    <div className="ies-shadow ies-tableanalitico">
                        <Table className="table-borderless align-middle table-nowrap mb-0 ies-tableanalitico">
                            <thead className="ies-bgcgray">
                                <tr>
                                    <th scope="col">Detalle</th>
                                    <th scope="col" className="ies-txalgnr-insc">Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={2}>
                                        <select className="form-select">
                                            <option value=''>Forma de pago...</option>
                                            {
                                                inscription ? (
                                                    inscription.payment ? (
                                                        (inscription.payment.typesOfPayments ? inscription.payment.typesOfPayments : []).map(el => 
                                                            <option key={el.tipo_pago} value={el.tipo_pago}>{el.descripcion}</option>
                                                        )
                                                    ) : ""
                                                ):""
                                            }
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Recargo forma de pago
                                    </td>
                                    <td className="ies-txalgnr-insc">
                                        {"$ 0,00"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Importes del semestre
                                    </td>
                                    <td className="ies-txalgnr-insc">
                                        {"$ 0,00"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Crédito a cuenta / derecho de exámen
                                    </td>
                                    <td className="ies-txalgnr-insc">
                                        {"$ 0,00"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Matrícula
                                    </td>
                                    <td className="ies-txalgnr-insc">
                                        {"$ 0,00"}
                                    </td>
                                </tr>
                                <tr className="ies-bgcgray ies-lk ies-bold">
                                    <td>
                                        TOTAL
                                    </td>
                                    <td className="ies-txalgnr-insc">
                                        $ 0,00
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="ies-paddingcard text-end">
                            <button color="info" className="btn btn-outline-info ies_mr10">Cancelar</button>
                            <button className="btn btn-success" type="submit">Solicitar</button>
                        </div>
                    </div>
                </Col>
            </Row>

            
            
            <br/><br/><br/>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Inscripciones;
