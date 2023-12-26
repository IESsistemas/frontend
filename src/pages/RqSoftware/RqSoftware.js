import React, { useEffect, useState } from "react";
import { Col, Container, Alert, Modal, Card, CardBody, CardFooter, Row, Label, Form, Input, Button } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { useFormik } from "formik";
import { getSoftware as onGetSoftware, rqSoftware } from "../../store/actions";
import withRouter from "../../Components/Common/withRouter";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
const RqSoftware = (props) => {
  document.title = "IES - Solicitud de software";

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal_center, setmodal_center] = useState(false);

  function tog_center() {
    setmodal_center(!modal_center);
  }

  const { software } = useSelector((state) => ({
    software: state.Software.software[0],
  }));

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      conditions: false,
    },
    validationSchema: Yup.object().shape({
      conditions: Yup.boolean().oneOf([true]),
    }),
    onSubmit: (values) => {
      dispatch(rqSoftware(values, props.router.navigate));
    }
  });

  useEffect(() => {
    dispatch(onGetSoftware())
  }, [dispatch])

  useEffect(() => {
    if (software && software.salida === 'S') {
      navigate('/ies/consult-software');
    }else{
      navigate('/ies/software');
    }
  }, [software])
  
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="4" md="4" sm="6">
              <h4>SOLICITUD DE SOFTWARE</h4>
            </Col>
            {validation.touched.conditions && validation.errors.conditions && (
              <Col md="6" sm="6" >
                <Alert color="danger" role="alert">
                  Debes seleccionar <strong>“Estoy de acuerdo y acepto los términos de registro”</strong> para continuar
                </Alert>
              </Col>
            )}
          </Row>


          <Row className="mt-3 justify-content-center">
            <Col lg="9">
              <Card>
                <CardBody>
                  <p style={{ marginBottom: '15px' }}>Solicito ser registrado como usuario en office.com plataforma de la cual se descargan el software y números de licencia de Microsoft. Me comprometo a utilizar el software dentro de las normas establecidas en MSDN AA Amendment, MSDN End User license Agreement y MSDN Subscriber Downloads.</p>

                  <ul>
                    <li>
                      Estoy de acuerdo con utilizar el software solo para uso personal, con fines académicos y/o de investigación.
                    </li>
                    <li>
                      No realizaré ningún desarrollo comercial ni uso no previstos en los términos establecidos por Microsoft.
                    </li>
                    <li>
                      Acepto que mis datos (nombre, apellido y correo electrónico) sean registrados a su vez por Microsoft.
                    </li>
                    <li>
                      Estoy de acuerdo en recibir por correo electrónico mi alta de usuario en Office.com y otras novedades.
                    </li>
                  </ul>
                </CardBody>

                <CardFooter>

                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                    className="needs-validation" action="#">
                    <div className="d-flex align-items-md-center justify-content-md-between flex-md-row flex-column ">
                      <div>
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          name="conditions"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.conditions}
                          invalid={validation.touched.conditions && !!validation.errors.conditions}
                        />

                        <Label htmlFor="area" className="form-label ms-2 mb-0">Estoy de acuerdo y acepto los términos de registro</Label>

                      </div>
                      <div className="text-end">
                        <Button className="btn btn-success" type="submit">Registrar</Button>
                      </div>
                    </div>
                  </Form>

                </CardFooter>
              </Card>
            </Col>
          </Row>

         {/*  <Modal
            isOpen={modal_center}
            toggle={() => {
              tog_center();
            }}
            centered
          >
            <div className="ies-conttextmycarrer ies-card ies-talignc">
              <img src="/send.png" />
              <h3>¡Muy Bien!</h3>
              <p>La solicitud de software se realizó correctamente</p><br />
              <button className="btn btn-success" onClick={() => tog_center()}>Cerrar</button>
            </div>
          </Modal> */}
          
          <ToastContainer />
        </Container>
      </div>
    </React.Fragment >
  );
};

export default withRouter(RqSoftware);
