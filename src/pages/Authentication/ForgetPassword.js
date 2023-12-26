import PropTypes from "prop-types";
import React from "react";
import { Row, Col, Alert, Card, CardBody, Container, FormFeedback, Input, Label, Form, Spinner, Button } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { userForgetPassword } from "../../store/actions";

// import images
// import profile from "../../assets/images/bg.png";
import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import withRouter from "../../Components/Common/withRouter";

const ForgetPasswordPage = props => {
  const dispatch = useDispatch();

  const { user, errorMsg, loading, error, states } = useSelector(state => ({
    user: state.Account.user,
    errorMsg: state.Login.errorMsg,
    loading: state.ForgetPassword.loading,
    error: state.Login.error,
    states: state
  }));

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      dni: '',
    },
    validationSchema: Yup.object({
      dni: Yup.string().required("Ingresar DNI"),
    }),
    onSubmit: (values) => {
      dispatch(userForgetPassword(values, props.router.navigate));
    }
  });

  const { forgetError, forgetSuccessMsg } = useSelector(state => ({
    forgetError: state.ForgetPassword.forgetError,
    forgetSuccessMsg: state.ForgetPassword.forgetSuccessMsg,
  }));

  document.title = "IES - Restablecer contraseña";

  return (
    <ParticlesAuth>
      <div className="auth-page-content">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-4 text-white-50">
                <div>
                  <Link to="/" className="d-inline-block auth-logo">
                    <img src={logoLight} alt="" height="150" />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="mt-4">

                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">¿Restablecer contraseña?</h5>
                    <p className="text-muted">Te informaremos cómo acceder con tu contraseña original.</p>

                    <lord-icon
                      src="https://cdn.lordicon.com/rhvddzym.json"
                      trigger="loop"
                      colors="primary:#00AAE4"
                      className="avatar-xl"
                      style={{ width: "120px", height: "120px" }}
                    >
                      </lord-icon>


                  </div>
                  {validation.values.dni == "" ?
                    <div className="mt-4">
                      <Alert className="alert-borderless alert-warning text-center mb-2 mx-2" role="alert">
                        Por favor, ingrese su número de documento
                      </Alert>
                    </div>
                    : ""
                  }

                  <div className="p-2">
                    {forgetError && forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {forgetError}
                      </Alert>
                    ) : null}
                    {forgetSuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {forgetSuccessMsg}
                      </Alert>
                    ) : null}
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-4">
                        <Label className="form-label">DNI</Label>
                        <Input
                          name="dni"
                          className="form-control"
                          placeholder="Ingresar DNI"
                          type="dni"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.dni || ""}

                        />

                      </div>

                      {/* <div className="text-center mt-4">
                        <Link to="/ies/forgot-password/success"><button className="btn btn-success w-100" type="submit">Restablecer contraseña</button></Link>
                      </div> */}

                      <div className="mt-4 ">
                        <Button color="success" disabled={error ? null : loading ? true : false} className="btn btn-success w-100" type="submit">
                          {error ? null : loading ? <Spinner size="sm" className='me-2'> Cargando... </Spinner> : null}
                          Restablecer contraseña
                        </Button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-4 text-center">
                <p className="mb-0">Espere, ya recordé mi contraseña... <Link to="/ies/auth" className="fw-semibold text-primary text-decoration-underline"> Volver </Link> </p>
              </div>

            </Col>
          </Row>
        </Container>
      </div>
    </ParticlesAuth>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);
