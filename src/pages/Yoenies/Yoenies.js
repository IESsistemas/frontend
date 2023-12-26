import React from "react";
import { Card, CardBody, Col, Container, Row, Progress } from "reactstrap";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Yoenies = () => {
  document.title ="IES - Yo en IES";

  //const careerSelected = localStorage.getItem('careerSelected')
  const { carrerSelected } = useSelector(state => ({
    carrerSelected: state.Login.carrerSelected,
    alldata: state.Login.userData
  }));

    if(!carrerSelected){
        window.location.href = "/ies/carrer";
    }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
            <h4>YO EN IES</h4>
            <br/>
            <Row>
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/legajo">
                        <Card className="mb-0 h-100">
                            <CardBody style={{textAlign: "center"}}>
                                <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                    <i className="ri-calendar-line ies-iconyoenies"></i>
                                </div><br/>
                                <p className="card-title mb-2 ies-textgray">Legajo</p>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/accountstatus">
                        <Card className="mb-0 h-100">
                            <CardBody style={{textAlign: "center"}}>
                                <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                    <i className="ri-calendar-line ies-iconyoenies"></i>
                                </div><br/>
                                <p className="card-title mb-2 ies-textgray">Estado de cuenta</p>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/doa">
                        <Card className="mb-0 h-100">
                            <CardBody style={{textAlign: "center"}}>
                                <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                    <i className="ri-calendar-line ies-iconyoenies"></i>
                                </div><br/>
                                <p className="card-title mb-2 ies-textgray">Entrevista DOA</p>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/software">
                    <Card className="mb-0 h-100">
                        <CardBody style={{textAlign: "center"}}>
                            <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                <i className="ri-calendar-line ies-iconyoenies"></i>
                            </div><br/>
                            <p className="card-title mb-2 ies-textgray">Solicitud de Software</p>
                        </CardBody>
                    </Card>
                    </Link>
                </Col>
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/regulation">
                    <Card className="mb-0 h-100">
                        <CardBody style={{textAlign: "center"}}>
                            <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                <i className="ri-calendar-line ies-iconyoenies"></i>
                            </div><br/>
                            <p className="card-title mb-2 ies-textgray">RAI</p>
                        </CardBody>
                    </Card>
                    </Link>
                </Col>
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/certificate">
                    <Card className="mb-0 h-100">
                        <CardBody style={{textAlign: "center"}}>
                            <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                <i className="ri-calendar-line ies-iconyoenies"></i>
                            </div><br/>
                            <p className="card-title mb-2 ies-textgray">Solicitud Certificados</p>
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

export default Yoenies;
