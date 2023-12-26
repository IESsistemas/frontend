import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';


//import images
import logoLight from "../../../assets/images/logo-light.png";
import withRouter from '../../../Components/Common/withRouter';
import ParticlesAuth from '../ParticlesAuth';

const SuccessSuggestions = () => {
    document.title = "IES - Reclamos o sugerencias";
    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-wrapper">

                    <div className="auth-page-content">
                        <Container>
                            <Row>
                                <Col lg={12}>
                                    <div className="text-center mb-4 text-white-50">
                                        <div>
                                            <Link to="/dashboard" className="d-inline-block auth-logo">
                                                <img src={logoLight} alt="" height="150" />
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="justify-content-center">
                                <Col md={8} lg={6} xl={5}>
                                    <Card className="mt-4">
                                        <CardBody className="p-4 text-center">
                                            <div className="avatar-lg mx-auto mt-2">
                                                <div className="avatar-title bg-light text-success display-3 rounded-circle">
                                                    <i className="ri-checkbox-circle-fill ies_successgreencolor"></i>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-2">
                                                <h4>¡Bien hecho!</h4>
                                                <p className="text-muted mx-4">Tu mensaje fué enviado, recibiras una respuesta por correo.</p>
                                                <div className="mt-4">
                                                    <Link to="/ies/auth" className="btn btn-success w-100 ies_successgreenbgBut">Cerrar</Link>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </ParticlesAuth>
        </React.Fragment >
    );
};

export default withRouter(SuccessSuggestions);