import React, { useState, useEffect } from "react";
import { Col, Container, Row, Badge, Table, Modal, Alert, CardFooter, Card, Input, CardHeader, CardBody, Label, Button, ModalBody, ModalHeader } from "reactstrap";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { reqPostInscriptionInfo } from "../../../store/actions";

const CreditCardPrint = () => {
    document.title = "IES - Generación e impresión de pagarés";

    const data = [
        {
            asignatura: 'Dirección de cuentas     ',
            extension: 'Córdoba Capital',
            modalidad: 'Presencial',
            puntos: 50,
            valor: '46.935,00'

        },
        {
            asignatura: 'Derecho de exámen',
            extension: 'N/A',
            modalidad: 'N/A',
            puntos: 'N/A',
            valor: '600'

        },
        {
            asignatura: 'Valor de matrícula',
            extension: 'N/A',
            modalidad: 'N/A',
            puntos: 'N/A',
            valor: '3.500'

        },

    ]
    const [modal_center, setmodal_center] = useState(false);

    function tog_center() {
        setmodal_center(!modal_center);
    }

    const { user, error, } = useSelector((state) => ({
        user: state.Login.userData.data,
        error: state.AcademicSchedule.errorMsg
    }));


    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col md={4} xs={12}>
                            <h4>IMPRESIÓN DE PAGARÉS</h4><br />
                        </Col>

                        <Col md={6} xs={12}>
                            <Alert className="alert alert-danger">
                                Aclaración
                                <ul>
                                    <li>El/los pagarés deberán ser firmados por el Padre/Madre/Tutor, en caso de que el alumno no sea mayor de edad.</li>
                                    <li>Deben enviarse todos los pagarés firmados y certificados por el Banco, Escribano o Policía a la siguiente Dirección: Rondeau 165 - Córdoba Capital - C.P.5000 - Argentina.</li>
                                    <li>En caso de incumplimiento en la cancelación del presente documento, la Institución se reserva el derecho de informar tal situación a las empresas de consulta de antecedentes crediticios a los fines de su tratamiento o publicación, prestando en este acto el librador su consentimiento libre, expreso e informado, en los términos del Art. 5 y concordantes de la Ley 25.326.</li>
                                </ul>



                            </Alert>
                        </Col>

                    </Row>

                    <Row className="justify-content-center ">
                        <Col md="10" xs="12" className='mt-3 text-end'>

                            <button color="info" className="btn btn-outline-info ies_mr10">Modificar</button>
                            <button className="btn btn-success">Generar</button>


                        </Col>
                    </Row>
                </Container>

            </div>
        </React.Fragment>
    );
};

export default CreditCardPrint;
