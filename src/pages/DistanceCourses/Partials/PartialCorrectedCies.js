import { Col, Container, Row, Alert, Card, CardHeader, CardBody, CardDeck, Modal, ModalHeader, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPartialCies as onGetPartialCies } from '../../../store/actions';

const PartialsCorrectedCies = () => {

    document.title = "IES - Parciales corregidos CIES";

    const dispatch = useDispatch()

    const { partialsCies, error } = useSelector((state) => ({
        partialsCies: state.Partials.partialsCies,
        error: state.Partials.errorMsg,
    }));

    useEffect(() => {
        dispatch(onGetPartialCies())
    }, [dispatch]);




    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg="4" md="4" sm="6">
                            <h4>EXÁMENES CIES CORREGIDOS</h4>
                        </Col>



                        {
                            partialsCies === undefined || !partialsCies.length > 0 ?
                                <Col md="6" sm="6" >
                                    <Alert className="alert-danger" role="alert">
                                        No existen exámenes para consultar
                                    </Alert>
                                </Col>
                                :
                                ""
                        }

                        {
                            partialsCies && partialsCies.length > 0 &&
                            <Col lg="12">
                                <Row className="mt-3 justify-content-center">
                                    <Col lg="8">
                                        <Card>
                                            <div className="table-responsive">
                                                 
                                            
                                            <table className="table table-borderless mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Materia</th>
                                                        <th scope="col">Fecha de examen</th>
                                                        <th scope="col">Hora</th>
                                                        <th scope="col">Documento</th>
                                                    </tr>
                                                </thead>
                                                  <tbody>
                                                    {
                                                        partialsCies && Array(partialsCies).map((item, index) => (
                                                            <tr key={index} className="text-muted align-middle">
                                                                <td>{item.carrera}</td>
                                                                <td>{item.fechaExamen}</td>
                                                                <td>{item.horaExamen}</td>
                                                                <td>

                                                                    <a href={item.examenCorregido} target="_blank" className="btn btn-soft-success btn-sm">
                                                                        <i className="ri-file-text-line align-bottom"></i>
                                                                    </a>

                                                                </td>
                                                            </tr>

                                                        ))
                                                    }
                                                </tbody> 
                                            </table>
                                            </div>
                                        </Card>

                                    </Col>
                                </Row>
                            </Col>
                        }


                    </Row>






                </Container>
            </div>
        </>
    )
}

export default PartialsCorrectedCies