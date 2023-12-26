import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Link } from 'react-router-dom';

const Contacto = () => {
  document.title = "IES - Contacto";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>CONTACTO</h4>
          <Card>
            <CardBody>
              <Row>
                <Col md="4" className="mb-4">
                  <h4>Departamento Ingreso</h4>
                  <p>3516363549</p>
                </Col>
                <Col md="4" className="mb-4">
                  <h4>Bedelía Presencial</h4>
                  <p>351 4288147 / 4288148 - De 09:00 a 14:00 hs</p>
                  <p>bedelia@ies21.edu.ar /  351 6363634 de 9 a 14 y 16 a 21 hs</p>
                </Col>
                <Col md="4" className="mb-4">
                  <h4>Modalidad Distancia</h4>
                  <p>distancia@ies21.edu.ar /  351 516-0714 de 9 a 13 y de 16 a 20 hs</p>
                </Col>
                <Col md="4" className="mb-4">
                  <h4>Administración</h4>
                  <p>3516363726</p>
                </Col>
                <Col md="4" className="mb-4">
                  <h4>Orientación al Alumnos (DOA)</h4>
                  <p>3516363550</p>
                </Col>
                <Col md="4" className="mb-4">
                  <h4>Secretaría Académica</h4>
                  <p>351 4288185 /  cristianroldan@ies21.edu.ar / Lunes - Martes - Miércoles y Viernes de 9:00 a 14:00 y Jueves de 15:00 a 20:00 hs.</p>
                  <p>Whatsapp: 351 6363556 (solo llamadas de 9 a 14 hs)</p>
                </Col>
                <Col md="4" className="mb-4">
                  <h4>Prosecretaría Académica</h4>
                  <p>351 4288186 /  vgraffi@ies21.edu.ar / Lunes - Martes - Viernes 9hs a 19hs - Miércoles - Jueves 9hs a 15hs.</p>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Contacto;
