import React, { useState, useEffect } from "react";
import { Col, Container, Alert, Input, Row, Label, CardHeader, CardBody, CardFooter, Card } from "reactstrap";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getPersonalInformationAction, reqPostCertificateRequest } from "../../store/actions";

const RqSoftware = () => {
  document.title = "IES - Solicitud de Certificados";

  const dispatch = useDispatch();

  const certOptions = [
    { id: 1, name: "Alumno regular" },
    { id: 2, name: "Alumno de la Institución" },
    { id: 3, name: "Analítico Provisorio/Definitivo" },
    { id: 4, name: "Realiza trabajos de tesis" },
    { id: 5, name: "Título original en trámite" },
    { id: 6, name: "Asistencia y aprobación de tesis" },
    { id: 7, name: "Adeuda tesis para la obtención del título" },
    { id: 8, name: "Asistencia a examen" },
    { id: 9, name: "Legalización de programas y analíticos" },
    { id: 10, name: "Otros" }
  ]
  //const career = JSON.parse(localStorage.getItem('careerSelected'))
  const { alldata, phones, carrerSelected } = useSelector(state => ({
    carrerSelected: state.Login.carrerSelected,
    alldata: state.Login.userData,
    phones: state.Profile.phones,
  }));

  if (!carrerSelected) {
    window.location.href = "/ies/carrer";
  }

  const [reqSol, setReqSol] = useState({
    dni: alldata ? alldata.data.dni : "",
    name: alldata ? alldata.data.apellidos + " " + alldata.data.nombres : "",
    email: alldata ? alldata.data.email : "",
    carrer: carrerSelected ? carrerSelected.ID_CARRERA : "",
    phone: phones ? phones[0].NRO_TE : "",
    cert: "1",
    dniType: "1",
    place: "Córdoba"
  });

  useEffect(() => {
    if (phones == null) {
      dispatch(getPersonalInformationAction());
    }
  }, []);

  useEffect(() => {
    setReqSol({
      ...reqSol,
      dni: alldata ? alldata.data.dni : "",
      dniType: alldata ? alldata.data.tipoDni.toString() : "",
      name: alldata ? alldata.data.apellidos + " " + alldata.data.nombres : "",
      email: alldata ? alldata.data.email : "",
      carrer: carrerSelected ? carrerSelected.DESCRIPCION : "",
      phone: phones ? phones[0].NRO_TE : "",
      place: "Córdoba"
    })
  }, [alldata, phones]);

  const chTypeCert = (event) => {
    const nValue = event.target.value;
    setReqSol({ ...reqSol, cert: nValue, other: '', time: '' });
  };

  const chPlace = (event) => {
    const nValue = event.target.value;
    setReqSol({ ...reqSol, place: nValue });
  };

  const chTime = (event) => {
    const nValue = event.target.value;
    setReqSol({ ...reqSol, time: nValue });
  };

  const chOther = (event) => {
    const nValue = event.target.value;
    setReqSol({ ...reqSol, other: nValue });
  };

  const send = () => {
    if (reqSol.name && reqSol.name.length === 0) {
      return window.generic.showModal('Varifica los datos', 'Para poder realizar la solicitud debes completar todos tus datos en perfil')
    }
    if (reqSol.dni && reqSol.dni.length === 0) {
      return window.generic.showModal('Varifica los datos', 'Para poder realizar la solicitud debes completar todos tus datos en perfil')
    }
    if (reqSol.carrer && reqSol.carrer.length === 0) {
      return window.generic.showModal('Varifica los datos', 'Para poder realizar la solicitud debes completar todos tus datos en perfil')
    }
    if (reqSol.phone && reqSol.phone.length === 0) {
      return window.generic.showModal('Varifica los datos', 'Para poder realizar la solicitud debes completar todos tus datos en perfil')
    }
    if (reqSol.email && reqSol.email.length === 0) {
      return window.generic.showModal('Varifica los datos', 'Para poder realizar la solicitud debes completar todos tus datos en perfil')
    }
    if (reqSol.place && reqSol.place.length === 0) {
      return window.generic.showModal('Varifica los datos', 'Para poder realizar la solicitud debes completar todos tus datos en perfil')
    }
    if (reqSol.cert === "10" && reqSol.other.length === 0) {
      return window.generic.showModal('Varifica los datos', 'Debes ingresar el certificado que deseas solicitar')
    }
    if (reqSol.cert === "8" && reqSol.time.length === 0) {
      return window.generic.showModal('Varifica los datos', 'Debes ingresar la materia, fecha y hora del examen')
    }

    let certName = certOptions.find(item => item.id == reqSol.cert).name;

    let toSend = {
      "typeDni": reqSol.dniType || "1",
      "dni": reqSol.dni,
      "dispatchPlace": reqSol.place || "",
      "formalities": certName || "",
      "other": reqSol.cert === "8" ? (reqSol.time || "") : reqSol.other || "",
      "email": reqSol.email || "",
      "idCareer": carrerSelected.ID_CARRERA
    };

    if (toSend.other === "") delete toSend.other;

    dispatch(reqPostCertificateRequest(toSend));
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className="justify-content-center">
            <Col sm={12}>
              <h4>SOLICITUD DE CERTIFICADOS</h4>
            </Col>

            <Col md={9} sm={12} className="mt-3">
              <Alert color="info">
                El certificado solicitado se enviará por correo electrónico. Verifique que sus datos personales sean correctos, si quieres actualizarlos haz <Link to="/ies/data">Click aquí.</Link>
              </Alert>
              <Alert color="info">
                El <b>certificado de alumno regular</b> se solicita en Bedelía.
              </Alert>

              <Card>
                <CardHeader>
                  <p>Verifique sus datos y seleccione el certificado a solicitar</p>
                </CardHeader>

                <CardBody>
                  <Row>
                    <Col md="4">
                      <Label htmlFor="useremail" className="form-label">Apellido y nombre</Label>
                      <Input
                        disabled
                        className="form-control"
                        placeholder="Jhon Doe"
                        type="text"
                        value={reqSol.name ? reqSol.name : ""}
                      />
                    </Col>
                    <Col md="4">
                      <Label htmlFor="useremail" className="form-label">DNI</Label>
                      <Input
                        disabled
                        className="form-control"
                        placeholder="38988465"
                        type="text"
                        value={reqSol.dni ? reqSol.dni : ""}
                      />
                    </Col>
                    <Col md="4">
                      <Label htmlFor="useremail" className="form-label">Carrera</Label>
                      <Input
                        disabled
                        className="form-control"
                        placeholder="Publicidad"
                        type="text"
                        value={reqSol.carrer ? reqSol.carrer : ""}
                      />
                    </Col>
                    <Col md="4">
                      <Label htmlFor="useremail" className="form-label">Teléfono</Label>
                      <Input
                        disabled
                        className="form-control"
                        placeholder="351 2478080"
                        type="text"
                        value={reqSol.phone ? reqSol.phone : "No hay telefono definido"}
                      />
                    </Col>
                    <Col md="4">
                      <Label htmlFor="useremail" className="form-label">Correo electrónico</Label>
                      <Input
                        disabled
                        className="form-control"
                        type="text"
                        value={reqSol.email ? reqSol.email : ""}
                      />
                    </Col>
                    <Col md="4">
                      <Label htmlFor="useremail" className="form-label">Lugar de retiro</Label>
                      <Input
                        disabled
                        onChange={chPlace}
                        className="form-control"
                        placeholder="Córdoba"
                        type="text"
                        value={reqSol.place}
                      />
                    </Col>
                    <Col md="8">
                      <Label htmlFor="exampleFormControlTextarea5" className="form-label">Certificado</Label>
                      <select onChange={chTypeCert} className="form-select mb-3" aria-label="Default select example">
                        {certOptions.map((item, i) => (
                          <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                      </select>
                    </Col>
                    {reqSol.cert == 10 ? (
                      <Col md="4">
                        <Label htmlFor="useremail" className="form-label">Indicar cual certificado</Label>
                        <Input
                          onChange={chOther}
                          className="form-control"
                          placeholder="Certificado de..."
                          type="text"
                          value={reqSol.other}
                        />
                      </Col>
                    ) : ""}
                    {reqSol.cert == 8 ? (
                      <Col md="4">
                        <Label htmlFor="useremail" className="form-label">Indicar materia, día y hora del examen</Label>
                        <Input
                          onChange={chTime}
                          className="form-control"
                          placeholder="Materia DD/MM/AAAA - HH:MM"
                          type="text"
                          value={reqSol.additionaldata}
                        />
                      </Col>
                    ) : ""}

                  </Row>

                </CardBody>
                <CardFooter>
                  <Link to="/ies/yoenies"><button color="info" className="btn btn-outline-info ies_mr10">Cancelar</button></Link>
                  <button onClick={send} className="btn btn-success">Solicitar</button>
                </CardFooter>

              </Card>

            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default RqSoftware;
