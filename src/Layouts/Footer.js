import React from 'react';
import { Col, Container, Row, Button } from 'reactstrap';

//import images
import logoSm from "../assets/images/logo-sm.png";
import logoDark from "../assets/images/logo-dark.png";
import logoLight from "../assets/images/logo-light.png";

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="footer">
                <Container fluid>
                    <Row>
                        <Col sm={3}>
                            <div className="">
                                <img src={logoLight} alt="" height="100" />
                                <p className='ies_white'>COLEGIO UNIVERSITARIO IES</p>
                            </div>
                        </Col>
                        <Col sm={3}><br/>
                            <div className="">
                                <p className='ies_white ies_mgrb10'>TELÉFONO</p>
                                <p>0351-4211717</p>
                                <p>0810-555-1717</p>
                            </div>
                        </Col>
                        <Col sm={3}><br/>
                            <p className='ies_white ies_mgrb10'>UBICACIÓN</p>
                            <p>Rondeau 165, Córdoba, Arg.</p>
                            <p>Buenos Aires 563, Córdoba, Arg.</p>
                        </Col>
                        <Col sm={3}><br/>
                            <p className='ies_white ies_mgrb10'>REDES SOCIALES</p>
                            <div>
                                <Button color="dark" className="btn-icon ies_butonsocial"><i className="ri-facebook-fill fs-16"></i></Button>{" "}
                                <Button color="dark" className="btn-icon ies_butonsocial"><i className="ri-google-fill fs-16"></i></Button>{" "}
                                <Button color="dark" className="btn-icon ies_butonsocial"><i className="ri-github-fill fs-16"></i></Button>{" "}
                                <Button color="dark" className="btn-icon ies_butonsocial"><i className="ri-twitter-fill fs-16"></i></Button>
                            </div>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <div className="text-center">
                            <br/><p>© Copyright 2023 - Colegio Universitario Siglo 21</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    );
};

export default Footer;