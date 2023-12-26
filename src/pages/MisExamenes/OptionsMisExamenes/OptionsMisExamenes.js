import React from "react";
import { Card, CardBody, Col, Container, Row, Progress } from "reactstrap";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OptionsMisExamenes = () => {
    document.title ="IES - Mis Examenes";

   //const career = JSON.parse(localStorage.getItem('careerSelected'))
   const { carrerSelected, alldata } = useSelector(state => ({
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
            <h4>MIS EXAMENES</h4>
            <br/>
            <Row>
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/examenes/inscripcion-materia">
                        <Card className="mb-0 h-100">
                            <CardBody style={{textAlign: "center"}}>
                                <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                    <i className="ri-calendar-line ies-iconyoenies"></i>
                                </div><br/>
                                <p className="card-title mb-2 ies-textgray">Inscripción exámenes materia</p>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/examenes/modelo-examen">
                        <Card className="mb-0 h-100">
                            <CardBody style={{textAlign: "center"}}>
                                <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                    <i className="ri-calendar-line ies-iconyoenies"></i>
                                </div><br/>
                                <p className="card-title mb-2 ies-textgray">Descargar modelo exámen</p>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/examenes/fecha-seminario">
                        <Card className="mb-0 h-100">
                            <CardBody style={{textAlign: "center"}}>
                                <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                    <i className="ri-calendar-line ies-iconyoenies"></i>
                                </div><br/>
                                <p className="card-title mb-2 ies-textgray">Fecha seminario final o título</p>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
                {/*<Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/examenes/examen-especial">
                    <Card className="mb-0 h-100">
                        <CardBody style={{textAlign: "center"}}>
                            <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                <i className="ri-calendar-line ies-iconyoenies"></i>
                            </div><br/>
                            <p className="card-title mb-2 ies-textgray">Exámenes especiales</p>
                        </CardBody>
                    </Card>
                    </Link>
                </Col>*/}
                <Col lg={2} md={4} sm={6} className="mb-2">
                    <Link to="/ies/examenes/inscripcion-cursillo">
                    <Card className="mb-0 h-100">
                        <CardBody style={{textAlign: "center"}}>
                            <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico ies-encint">
                                <i className="ri-calendar-line ies-iconyoenies"></i>
                            </div><br/>
                            <p className="card-title mb-2 ies-textgray">Exámen de cursillo</p>
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

export default OptionsMisExamenes;
