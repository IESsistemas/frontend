import React, { useEffect } from "react";
import { Card, CardBody, Col, Container, Row, Progress } from "reactstrap";
import { Link } from 'react-router-dom';
import { getCheckServer as onGetCheckServer } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

const DistanceCourses = () => {
    document.title = "IES - Cursado a distancia";

    const dispatch = useDispatch()

    const { serve } = useSelector(state => ({
        serve: state.CheckServe.serve
    }));

    useEffect(() => {
        dispatch(onGetCheckServer())
    }, [dispatch]);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <h4>CURSADO A DISTANCIA</h4>
                    <br />
                    <Row>
                        {
                            serve &&
                            <Col lg={2} md={4} sm={6} className="mb-2">
                                <Link to="https://adistancia.ies21.edu.ar/escritorio.cgi">
                                    <Card className="mb-0 h-100">
                                        <CardBody style={{ textAlign: "center" }}>
                                            <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                                <i className="ri-calendar-line ies-iconyoenies"></i>
                                            </div><br />
                                            <p className="card-title mb-2 ies-textgray">IES virtual</p>
                                        </CardBody>
                                    </Card>
                                </Link>
                            </Col>
                        }

                        <Col lg={2} md={4} sm={6} className="mb-2">
                            <Link to="/ies/lower-raise-partials">
                                <Card className="mb-0 h-100">
                                    <CardBody style={{ textAlign: "center" }}>
                                        <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                            <i className="ri-calendar-line ies-iconyoenies"></i>
                                        </div><br />
                                        <p className="card-title mb-2 ies-textgray">Bajar y subir parciales</p>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>
                        <Col lg={2} md={4} sm={6} className="mb-2">
                            <Link to="/ies/cursado-distancia/parciales-corrregido">
                                <Card className="mb-0 h-100">
                                    <CardBody style={{ textAlign: "center" }}>
                                        <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                            <i className="ri-calendar-line ies-iconyoenies"></i>
                                        </div><br />
                                        <p className="card-title mb-2 ies-textgray">Parciales corregidos</p>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>
                        <Col lg={2} md={4} sm={6} className="mb-2">
                            <Link to="/ies/lower-raise-partials-cies">
                                <Card className="mb-0 h-100">
                                    <CardBody style={{ textAlign: "center" }}>
                                        <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                            <i className="ri-calendar-line ies-iconyoenies"></i>
                                        </div><br />
                                        <p className="card-title mb-2 ies-textgray">Bajar y subir exámenes CIES</p>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>
                        <Col lg={2} md={4} sm={6} className="mb-2">
                            <Link to="/ies/cursado-distancia/parciales-corrregido-cies">
                                <Card className="mb-0 h-100">
                                    <CardBody style={{ textAlign: "center" }}>
                                        <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                            <i className="ri-calendar-line ies-iconyoenies"></i>
                                        </div><br />
                                        <p className="card-title mb-2 ies-textgray">Exámenes CIES corregidos</p>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>

                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default DistanceCourses;
