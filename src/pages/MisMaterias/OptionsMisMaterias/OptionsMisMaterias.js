import React from "react";
import { Card, CardBody, Col, Container, Row, Progress } from "reactstrap";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OptionsMisMaterias = () => {
    document.title ="IES - Mis Materias";

    //const career = JSON.parse(localStorage.getItem('careerSelected'))
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
            <h4>MIS MATERIAS</h4>
            <br/>
            <Row>
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/materias/analitico">
                        <Card className="mb-0 h-100">
                            <CardBody style={{textAlign: "center"}}>
                                <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                    <i className="ri-calendar-line ies-iconyoenies"></i>
                                </div><br/>
                                <p className="card-title mb-2 ies-textgray">Analítico</p>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/materias/cronograma-academico">
                        <Card className="mb-0 h-100">
                            <CardBody style={{textAlign: "center"}}>
                                <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                    <i className="ri-calendar-line ies-iconyoenies"></i>
                                </div><br/>
                                <p className="card-title mb-2 ies-textgray">Cronograma Académico</p>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/materias/inscripcion">
                        <Card className="mb-0 h-100">
                            <CardBody style={{textAlign: "center"}}>
                                <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                    <i className="ri-calendar-line ies-iconyoenies"></i>
                                </div><br/>
                                <p className="card-title mb-2 ies-textgray">Inscripción Semestre</p>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/materias/horarios-materias">
                    <Card className="mb-0 h-100">
                        <CardBody style={{textAlign: "center"}}>
                            <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                <i className="ri-calendar-line ies-iconyoenies"></i>
                            </div><br/>
                            <p className="card-title mb-2 ies-textgray">Horarios Materias</p>
                        </CardBody>
                    </Card>
                    </Link>
                </Col>
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/materias/solicitud-beca">
                    <Card className="mb-0 h-100">
                        <CardBody style={{textAlign: "center"}}>
                            <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                <i className="ri-calendar-line ies-iconyoenies"></i>
                            </div><br/>
                            <p className="card-title mb-2 ies-textgray">Solicitud de Becas</p>
                        </CardBody>
                    </Card>
                    </Link>
                </Col>
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/materias/inasistencias-reincorporaciones">
                    <Card className="mb-0 h-100">
                        <CardBody style={{textAlign: "center"}}>
                            <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                <i className="ri-calendar-line ies-iconyoenies"></i>
                            </div><br/>
                            <p className="card-title mb-2 ies-textgray">Inasistencias y Reincorporaciones</p>
                        </CardBody>
                    </Card>
                    </Link>
                </Col>
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/surveys">
                    <Card className="mb-0 h-100">
                        <CardBody style={{textAlign: "center"}}>
                            <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                <i className="ri-calendar-line ies-iconyoenies"></i>
                            </div><br/>
                            <p className="card-title mb-2 ies-textgray">Encuestas</p>
                        </CardBody>
                    </Card>
                    </Link>
                </Col>
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/materias/academic-exceptions">
                    <Card className="mb-0 h-100">
                        <CardBody style={{textAlign: "center"}}>
                            <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                <i className="ri-calendar-line ies-iconyoenies"></i>
                            </div><br/>
                            <p className="card-title mb-2 ies-textgray">Excepciones Académicas</p>
                        </CardBody>
                    </Card>
                    </Link>
                </Col>
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/materias/formas-pago">
                    <Card className="mb-0 h-100">
                        <CardBody style={{textAlign: "center"}}>
                            <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                <i className="ri-calendar-line ies-iconyoenies"></i>
                            </div><br/>
                            <p className="card-title mb-2 ies-textgray">Formas de pago</p>
                        </CardBody>
                    </Card>
                    </Link>
                </Col>
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/materias/biblioteca-virtual">
                    <Card className="mb-0 h-100">
                        <CardBody style={{textAlign: "center"}}>
                            <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                <i className="ri-calendar-line ies-iconyoenies"></i>
                            </div><br/>
                            <p className="card-title mb-2 ies-textgray">Biblioteca Virtual</p>
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

export default OptionsMisMaterias;
