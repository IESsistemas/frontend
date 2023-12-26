import React, { useEffect, useState } from "react";
import { Table, Container, Badge, Label, Col, Row, Card } from "reactstrap";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getFileDocumentation as onGetFileDocumentation } from "../../store/actions";



const Legajo = () => {
  document.title = "IES - Reglamento";
  const dispatch = useDispatch();

  //const career = JSON.parse(localStorage.getItem('careerSelected'))
  const { user, token, documentation, docdata, carrerSelected } = useSelector(state => ({
    user: state.Login.userData,
    token: state.Login.userData.user,
    docdata: state.FileDocumentation.data,
    documentation: state.FileDocumentation.data.documentation,
    carrerSelected: state.Login.carrerSelected,
  }))

  if (!carrerSelected) {
    window.location.href = "/ies/carrer";
  }
  const [modal_center, setmodal_center] = useState(false);

  function tog_center() {
    setmodal_center(!modal_center);
  }


  useEffect(() => {
    dispatch(onGetFileDocumentation(token))
  }, [dispatch]);

  const [alermessage, setalermessage] = useState("");

  useEffect(() => {
    if (!documentation && docdata.code == 2) {
      setalermessage(docdata.message)
    }
  }, [docdata]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="12">
              <h4>DOCUMENTACIÓN DE LEGAJO</h4>
            </Col>
            <Col lg="12">
              <Row className="mt-3 justify-content-center">
                <Col lg="8">
                  <Card className="ies-shadow1">
                    <div className="table-responsive ">
                      <Table className="align-middle table-nowrap mb-0 ies-tablelegajo">
                        <thead className="table-light">
                          <tr>
                            <th scope="col" style={{ width: "100%" }}>Alumno:  <span className="text-muted">{user.data.apellidos}, {user.data.nombres}</span> </th>
                            <th scope="col">Estado</th>
                          </tr>
                        </thead>
                        <tbody style={{ backgroundColor: "white" }}>
                          {
                            documentation && documentation.map(item => (
                              <tr key={item.id_documentacion}>
                                <td>{item.descripcion}</td>
                                <td>
                                  <Badge className={`ies-badged ${item.estado === 'Adeuda' ? 'ies-danger' : item.estado === 'Definitiva' ? 'ies-success' : item.estado === 'Provisoria' && 'ies-warning'}`} pill> {item.estado} </Badge>
                                </td>
                              </tr>

                            ))
                          }
                        </tbody>
                      </Table>
                    </div>
                  </Card>
                </Col>
              </Row>
              {
                documentation === undefined ? (
                  <Row className="mt-3 justify-content-center">
                    <Col lg="8">
                      <h4>{alermessage}</h4>
                    </Col>
                  </Row>
                ) : ""
              }

            </Col>

          </Row>

        </Container>
      </div>
    </React.Fragment>
  );
};

export default Legajo;
