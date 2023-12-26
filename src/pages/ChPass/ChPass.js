import React, { useState, useEffect } from "react";
import { Col, Container, Row, Label, Input, CardBody, CardFooter, Card } from "reactstrap";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { changePass } from "../../store/actions";

const ChPass = () => {

  document.title = "IES - Home";

  const { alldata } = useSelector(state => ({
    alldata: state.Login.userData,
  }));
  const dispatch = useDispatch();

  const [itemCh, setItemCh] = useState({
    act: '',
    newp: '',
    rep: ''
  });

  const chPassSend = () => {
    if (itemCh.act.length < 6 || itemCh.act.length > 15) {
      return window.generic.showModal('Verifica los datos', "La contraseña actual es incorrecta")
    }
    if (itemCh.newp.length < 6 || itemCh.rep.length < 6 || itemCh.newp.length > 15 || itemCh.rep.length > 15) {
      return window.generic.showModal('Verifica los datos', "La contraseña debe contener entre 6 y 15 caracteres")
    }
    if (itemCh.newp === itemCh.act) {
      return window.generic.showModal('Verifica los datos', "La contraseña nueva no puede ser igual a la anterior")
    }
    if (itemCh.newp !== itemCh.rep) {
      return window.generic.showModal('Verifica los datos', "La contraseña nueva no coincide")
    }
    if (alldata) {
      if (itemCh.newp.indexOf(alldata.data.dni) !== -1) {
        return window.generic.showModal('Verifica los datos', "La contraseña nueva no puede contener el DNI")
      }
    }

    let toSend = {
      newPassword: itemCh.newp, currentPassword: itemCh.act
    };
    dispatch(changePass(toSend));
  }

  const chPass = (event) => {
    const nValue = event.target.value;
    setItemCh({ ...itemCh, act: nValue });
  };

  const chNew = (event) => {
    const nValue = event.target.value;
    setItemCh({ ...itemCh, newp: nValue });
  };

  const chRep = (event) => {
    const nValue = event.target.value;
    setItemCh({ ...itemCh, rep: nValue });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Modificar Contraseña</h4>
          <Card className="mt-4">
            <CardBody className="mt-4">
              <Row>
                <Col lg="3">
                  <b>
                    Requisitos de seguridad
                  </b>
                  <ul>
                    <li>
                      No debe contener su número de DNI.
                    </li>
                    <li>
                      No debe ser igual a su contraseña original.
                    </li>
                    <li>
                      No debe ser igual a su contraseña anterior
                    </li>
                    <li>
                      Debe contener entre 6 y 15 caracteres
                    </li>
                  </ul>
                </Col>
                <Col lg="9">
                  <Row>
                    <Col lg="12">
                      <h5>Contraseña</h5><br />
                    </Col>
                    <Col lg="4">
                      <Label htmlFor="confirmpasswordInput" className="form-label">
                        Contraseña actual</Label>
                      <Input type="password" className="form-control" value={itemCh.act}
                        onChange={chPass} />
                    </Col>
                    <Col lg="4">
                      <Label htmlFor="confirmpasswordInput" className="form-label">
                        Nueva contraseña</Label>
                      <Input type="password" className="form-control" value={itemCh.newp}
                        onChange={chNew} />
                    </Col>
                    <Col lg="4">
                      <Label htmlFor="confirmpasswordInput" className="form-label">
                        Repetir nueva contraseña</Label>
                      <Input type="password" className="form-control" value={itemCh.rep}
                        onChange={chRep} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <Row>
                <Col lg="12">
                  <div className="text-end">
                    <div className="ies_tar">
                      <Link to="/ies/mycarrer"><button color="info" className="btn btn-outline-info ies_mr10">Cancelar</button></Link>
                      <button onClick={chPassSend} className="btn btn-success">Guardar</button>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ChPass;
