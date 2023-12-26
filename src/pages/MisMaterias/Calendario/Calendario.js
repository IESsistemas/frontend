import React, { useState, useEffect } from "react";
import { Col, Container, Row, Badge, Table, Modal, Alert, CardFooter } from "reactstrap";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { reqPostAcademicInfo } from "../../../store/actions";

const Inscripciones = () => {
    document.title = "IES - Home";
    //const career = JSON.parse(localStorage.getItem('careerSelected'))

    const { carrerSelected, alldata, academic } = useSelector(state => {
        return {
            carrerSelected: state.Login.carrerSelected,
            alldata: state.Login.userData,
            academic: state.MisMaterias.academic
        }
    });

    const [modal_center, setmodal_center] = useState(false);

    function tog_center() {
        setmodal_center(!modal_center);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if (carrerSelected) {
            dispatch(reqPostAcademicInfo({ "idCareer": carrerSelected.ID_CARRERA }));
        }
    }, []);

    useEffect(() => {
    }, [academic]);

    const formatNumberArg = (num) => {
        num = parseFloat(num.toFixed(2));
        let n = num.toLocaleString('es-AR');
        return n.indexOf(',') != -1 ? n : (n + ",00");
    }

    const fdate = (date) => {
        //format date string to dd/mm/yyyy
        let d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
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
                    <br />
                    <h5>Tribunal</h5><br />
                    <i className="ri-user-line"></i> <span>Cabral, Enrrique Eduardo - <span className="ies-lk">Presidente</span></span><br /><br />
                    <i className="ri-user-line"></i> <span>Cerry Milicay, María Magdalena Patricia - <span className="ies-lk">1° vocal</span></span><br /><br />
                    <i className="ri-user-line"></i> <span>Rodriguez, María Eguel - <span className="ies-lk">2° vocal</span></span><br /><br />
                    <br />
                </div>
            </Modal>
            <div className="page-content">
                <Container fluid>
                    <h4>INSCRIPCIÓN AL SEMESTRE</h4><br />
                    <div className="ies-mycarrerNav ies-minhunset ies-spacebtwflex">
                        <div>
                            <div className="ies-nexicomycarrer ies-conttextmycarrer">
                                <i className="ri-account-circle-line ies-avataricon ies_white"></i>
                                <span className="ies-position-txtsemestre">
                                    <h4 className="ies-content" style={{ color: "white" }}>1° semestre 2023<span className="ies-pipe">|</span></h4><p className="ies-content">{carrerSelected ? carrerSelected.DESCRIPCION : ""}</p>
                                </span>
                            </div>
                        </div>
                    </div><br />
                    <Row>
                        <Col sm="12" md="3">
                            <div className="card ies-mh100">Modalidad presencial</div>
                        </Col>
                        <Col sm="12" md="3">
                            <div className="card ies-mh100">Modalidad distancia</div>
                        </Col>
                        <Col sm="12" md="3">
                            <div className="card ies-mh100">Final</div>
                        </Col>
                        <Col sm="12" md="3">
                            <div className="card ies-mh100">Feriados</div>
                        </Col>
                    </Row>



                    <br /><br /><br />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Inscripciones;
