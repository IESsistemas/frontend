import React, { useEffect, useState } from "react";
import { Col, Container, Alert, Modal, Row, Label, Card, CardHeader, CardBody, CardFooter, Input, FormFeedback, Button, Form } from "reactstrap";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { applyInterview, getCheckInterview as onGetCheckInterview, getInterviewDoa as onGetInterviewDoa } from "../../store/actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import withRouter from "../../Components/Common/withRouter";
import DoaInterviews from "../DoaSelect/DoaInterviews";
import { addHours, format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";

const Doa = (props) => {
  document.title = "IES - Entrevista DOA";

  const dispatch = useDispatch();

  const { checkInterview, turns, interviewEnabled, interview, apply, interviewError } = useSelector(state => ({
    checkInterview: state.Doa.checkInterview,
    interview: state.Doa.checkInterview.turnosSolicitados,
    turns: state.Doa.checkInterview.turnosSolicitados?.length || [],
    interviewEnabled: state.Doa.interview,
    apply: state.Doa.apply,
    interviewError: state.Doa.interviewError
  }))

  useEffect(() => {
    dispatch(onGetCheckInterview())
    dispatch(onGetInterviewDoa())
  }, [dispatch]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      type: '',
      day: '',
      hour: '',
    },
    validationSchema: Yup.object().shape({
      type: Yup.string().required('Por favor seleccione un tipo de entrevista'),
      day: Yup.string().required('Por favor seleccione un día'),
      hour: Yup.string().required('Por favor seleccione un horario'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(applyInterview(values, props.router.navigate));
      resetForm();
    }
  });



  const [modal_center, setmodal_center] = useState(true);

  function tog_center() {
    setmodal_center(!modal_center);
    dispatch(onGetCheckInterview())
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="4" md="4" sm="6" className="mb-3">
              <h4>SOLICITUD DE ENTREVISTA DOA</h4>
            </Col>
            {
              interviewError &&

              <Col md="6" sm="6" >
                <Alert color="info">
                  En estos momentos no hay turnos disponibles. Por favor intenta en los próximos días.
                </Alert>
              </Col>

            }


          </Row>


          {
            turns && turns == 0 &&
            <>
              <Card>
                <CardHeader>
                  <p>Completar los campos de la solicitud.</p>
                </CardHeader>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                  className="needs-validation" action="#">
                  <CardBody className="mb-5">
                    {/*     {error && error ? (
                  <Alert color="danger">Hubo un error, intente nuevamente.</Alert>
                ) : null} */}
                    <Row className="mt-1 mb-5">
                      <Col md="4" xs="12" className="mb-3">
                        <Label htmlFor="type" className="form-label">Tipo de entrevista</Label>
                        <Input
                          id="type"
                          name="type"
                          className="form-select"
                          placeholder="Seleccione una entrevista"
                          type="select"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.type}
                          invalid={
                            validation.touched.type && validation.errors.type ? true : false
                          }
                        >

                          <option>Selecciona una entrevista</option>
                          {
                            checkInterview.esIngresante && <option value={1} >Entrevista de ingreso</option>
                          }
                          {
                            checkInterview.doaRealizada && <option value={2} >Entrevista de asesoramiento</option>
                          }
                          {
                            checkInterview.becaHabilitada && <option value={3} >Entrevista de beca</option>
                          }

                        </Input>
                        {validation.touched.type && validation.errors.type ? (
                          <FormFeedback type="invalid"><div>{validation.errors.type}</div></FormFeedback>
                        ) : null}

                      </Col>
                      <Col md="4" xs="12" className="mb-3">
                        <Label htmlFor="day" className="form-label">Día</Label>
                        <Input
                          type="select"
                          className="form-select"
                          aria-label="Seleccione un día"
                          name="day"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.day || ""}
                          invalid={
                            validation.touched.day && validation.errors.day ? true : false
                          }
                        >


                          <option >Selecciona un día </option>
                          {interviewEnabled && Object.keys(interviewEnabled).length > 0 ? (
                            Object.keys(interviewEnabled).map((data, index) => {
                              return (
                                <option key={index} value={data}>{(data == 'Saturday' ? 'Sábado': data)}</option>
                              )
                            })
                          ) : ""}


                        </Input>
                        {validation.touched.day && validation.errors.day ? (
                          <FormFeedback type="invalid"><div>{validation.errors.day}</div></FormFeedback>
                        ) : null}
                      </Col>
                      <Col md="4" xs="12" className="mb-3">
                        <Label htmlFor="hour" className="form-label">Horarios disponibles</Label>
                        <Input
                          type="select"
                          className="form-select"
                          aria-label="Seleccione un horario"
                          name="hour"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.hour || ""}
                          invalid={
                            validation.touched.hour && validation.errors.hour ? true : false
                          }
                        >


                          <option >Seleccione hora </option>

                           {interviewEnabled && interviewEnabled[validation.values.day]? (
                            interviewEnabled[validation.values.day].map((data, index) => {
                              return (
                              <option key={index} value={JSON.stringify(data)}>{data.hora} hs - Entrevistadora: {data.apellidos} {data.nombres}</option>
                              )
                            })
                          ) : ""} 


                        </Input>
                        {validation.touched.hour && validation.errors.hour ? (
                          <FormFeedback type="invalid"><div>{validation.errors.hour}</div></FormFeedback>
                        ) : null}
                      </Col>

                    </Row>


                  </CardBody>
                  <CardFooter className="text-end">
                    <Link to="/ies/yoenies"><button color="info" className="btn btn-outline-info ies_mr10">Cancelar</button></Link>
                    <button className="btn btn-success" type="submit">Solicitar</button>
                  </CardFooter>
                </Form>
              </Card>

              {apply === true &&
                <Modal
                  isOpen={modal_center}
                  centered
                >
                  <div className="ies-conttextmycarrer ies-card ies-talignc"><br /><br />
                    {/* <img src="/send.png" /><br /><br /> */}
                    <h3>¡Ups!</h3>
                    <p>El turno seleccionado ya no se encuentra disponible.</p><br /><br />
                    <button className="btn btn-success" onClick={() => tog_center()} >Cerrar</button>
                  </div>
                </Modal>
              }

            </>
          }

          {
            turns && turns > 0 &&
            <DoaInterviews interview={interview} />
          }

        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Doa);
