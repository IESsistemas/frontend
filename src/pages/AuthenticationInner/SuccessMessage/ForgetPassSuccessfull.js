import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import ParticlesAuth from "../ParticlesAuth";

//import images
import logoLight from "../../../assets/images/logo-light.png";

const BasicSuccessMsg = () => {
document.title="IES - Restablecer contraseña";
    return (
        <React.Fragment>
            <div className="auth-page-wrapper">
                <ParticlesAuth>
                    <div className="auth-page-content">
                        <Container>
                            <Row>
                                <Col lg={12}>
                                    <div className="text-center mb-4 text-white-50">
                                        <div>
                                                <img src={logoLight} alt="" height="150" />
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
                                                <h4>Se cambió tu contraseña a:</h4>
                                                <p className="text-muted mx-4">7 digitos conformados por: día de tu cumpleaños (2 digitos ej: 05) + 3 últimos de tu DNI + mes de tu nacimiento (2 digitos).</p>
                                                <div className="mt-4">
                                                    <Link to="/ies/auth" className="btn btn-success w-100 ies_successgreenbgBut">Iniciar sesión</Link>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </ParticlesAuth>
            </div>
        </React.Fragment >
    );
};

export default BasicSuccessMsg;