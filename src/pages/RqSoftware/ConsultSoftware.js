import React, { useEffect, useState } from "react";
import { Col, Container, Alert, Modal, Card, CardBody, CardFooter, Row, Label, Form, Input, Button } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { useFormik } from "formik";
import { getSoftware as onGetSoftware, postRqSoftware, rqSoftware } from "../../store/actions";
import withRouter from "../../Components/Common/withRouter";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
const ConsultSoftware = (props) => {
  document.title = "IES - Solicitud de software";

  const { software } = useSelector((state) => ({
    software: state.Software.software[0],
  }));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal_center, setmodal_center] = useState(false);

  function tog_center() {
    setmodal_center(!modal_center);
  }

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      message: "",
      salida: 'S'
    },
    onSubmit: (values) => {
      dispatch(postRqSoftware(values, props.router.navigate))
    }
  });

  useEffect(() => {
    dispatch(onGetSoftware())
  }, [dispatch])

  useEffect(() => {
    if (software && software.salida === 'S') {
      navigate('/ies/consult-software');
    } else {
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
          </Row>

          <Row className="mt-3 justify-content-center">
            <Col lg="9">
              <Card>
                <CardBody>
                  <Alert color="danger">
                    Usted ya tiene un pedido de software en gestión, a la brevedad recibirá un correo electrónico con más instrucciones.
                  </Alert>

                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                    className="needs-validation" action="#">
                    <div className="mb-3">
                      <Label htmlFor="message" className="form-label">Enviar consulta</Label>
                      <Input
                        id="message"
                        name="message"
                        type="textarea"
                        className="form-control"
                        rows="3"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.message || ""}
                      />

                    </div>



                    <div className="mt-4 text-center">
                      <div><br />
                        <div className="ies_tar">
                          <Button className="btn btn-success" type="submit">Enviar</Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>




          <ToastContainer />
        </Container>
      </div>
    </React.Fragment >
  );
};

export default withRouter(ConsultSoftware);
