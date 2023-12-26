import { Col, Container, Row, Alert, Card, CardHeader, CardBody, CardDeck, Modal, ModalHeader, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPartial as onGetPartial } from '../../../store/actions';

const PartialsCorrected = () => {

    document.title = "IES - Parciales corregidos";

    const dispatch = useDispatch()

    const { partials, error } = useSelector((state) => ({
        partials: state.Partials.partials,
        error: state.Partials.errorMsg,
    }));
    useEffect(() => {
        dispatch(onGetPartial())
    }, [dispatch]);


    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg="4" md="4" sm="6">
                            <h4>PARCIALES CORREGIDOS</h4>
                        </Col>

                        {
                            partials === undefined || !partials.length > 0 ?
                                <Col md="6" sm="6" >
                                    <Alert className="alert-danger" role="alert">
                                        No existen exámenes para consultar
                                    </Alert>
                                </Col>
                                :
                                ""
                        }

                        {
                            partials && partials.length > 0 &&
                            <Col lg="12">
                                <Row className="mt-3 justify-content-center">
                                    <Col lg="8" md={10} sm={12}>
                                        <Card>
                                            <div className="table-responsive">
                                                <table className="table table-borderless mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Cátedra</th>
                                                            <th scope="col">Parcial</th>
                                                            <th scope="col">Fecha bajado</th>
                                                            <th scope="col">Fecha subido</th>
                                                            <th scope="col">Corregido</th>
                                                            <th scope="col">Fecha de corregido</th>
                                                            <th scope="col">Documento</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            partials &&
                                                            partials.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>{item.descripcion}</td>
                                                                    <td>{item.parcial}</td>
                                                                    <td>{item.fechaBajado}</td>
                                                                    <td>{item.fechaSubido}</td>
                                                                    <td>{item.corregido}</td>
                                                                    <td>{item.fechaCorregido}</td>
                                                                    <td>
                                                                        <a href={item.archivoCorregido} className="btn btn-soft-success btn-sm">
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

export default PartialsCorrected