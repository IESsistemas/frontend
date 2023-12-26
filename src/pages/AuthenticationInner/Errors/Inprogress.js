import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import ParticlesAuth from "../ParticlesAuth";

// Import Images
import error from "../../../assets/images/error.svg";
import logoLight from "../../../assets/images/logo-light.png";

const Inprogress = () => {
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
                                        <div className="ies-vinp">
                                            <img src={error} alt="" className="error-basic-img move-animation" />
                                        </div>
                                        <div className="mt-n4">
                                            <h3 className="text-uppercase">VISTA EN PROCESO</h3>
                                            <h3 className="">Estamos trabajando en esta vista, aún no se encuentra disponible. Disculpe las molestias</h3><br/>
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

export default Inprogress;