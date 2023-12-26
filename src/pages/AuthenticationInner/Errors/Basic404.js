import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import ParticlesAuth from "../ParticlesAuth";

// Import Images
import error from "../../../assets/images/error.svg";
import logoLight from "../../../assets/images/logo-light.png";

const Basic404 = () => {
document.title="404 Error Basic | Velzon - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <img className='ies_logolefttop' src={logoLight} alt="" height="150" />
            <div className="auth-page-wrapper">
                <ParticlesAuth>
                    <div className="auth-page-content">
                        <Container>
                            <Row>
                                <Col lg={12}>
                                    <div className="text-center pt-4">
                                        <div className="">
                                            <img src={error} alt="" className="error-basic-img move-animation" />
                                        </div>
                                        <div className="mt-n4">
                                            <h1 className="display-1 fw-medium">404</h1>
                                            <h3 className="text-uppercase">DISCULPE, PÁGINA NO ENCONTRADA</h3><br/><br/>
                                            <Link to="/" className="btn btn-success"><i className="mdi mdi-home me-1"></i>Volver al inicio</Link>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </ParticlesAuth>
            </div>
        </React.Fragment>
    );
};

export default Basic404;