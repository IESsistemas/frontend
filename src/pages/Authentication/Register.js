import React, { useEffect } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// action
import { registerUser, apiError, resetRegisterFlag } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

//import images 
import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

const Register = () => {
    const history = useNavigate();
    const dispatch = useDispatch();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: '',
            first_name: '',
            password: '',
            confirm_password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Please enter a valid email address')
                .required('Please enter your email'),
            first_name: Yup.string().required('Please enter your username'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required')
        }),
        onSubmit: (values) => {
            dispatch(registerUser(values));
        }
    });

    const { error, registrationError, success } = useSelector(state => ({
        registrationError: state.Account.registrationError,
        success: state.Account.success,
        error: state.Account.error
    }));

    useEffect(() => {
        dispatch(apiError(""));
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            setTimeout(() => history("/login"), 3000);
        }

        setTimeout(() => {
            dispatch(resetRegisterFlag());
        }, 3000);

    }, [dispatch, success, error, history]);

    document.title = "Basic SignUp | Velzon - React Admin & Dashboard Template";

    return (
        <React.Fragment>
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
                                            <h5 className="text-primary">Reclamos o sugerencias</h5>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                className="needs-validation" action="#">
                                                {success && success ? (
                                                    <>
                                                        {toast("Your Redirect To Login Page...", { position: "top-right", hideProgressBar: false, className: 'bg-success text-white', progress: undefined, toastId: "" })}
                                                        <ToastContainer autoClose={2000} limit={1} />
                                                        <Alert color="success">
                                                            Register User Successfully and Your Redirect To Login Page...
                                                        </Alert>
                                                    </>
                                                ) : null}

                                                {error && error ? (
                                                    <Alert color="danger"><div>
                                                        {/* {registrationError} */}
                                                        Email has been Register Before, Please Use Another Email Address... </div></Alert>
                                                ) : null}

                                                <div className="mb-3">
                                                    <Label htmlFor="useremail" className="form-label">DNI</Label>
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Ingrese DNI"
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.email || ""}
                                                        invalid={
                                                            validation.touched.email && validation.errors.email ? true : false
                                                        }
                                                    />
                                                    {validation.touched.email && validation.errors.email ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.email}</div></FormFeedback>
                                                    ) : null}

                                                </div>
                                                <div className="mb-3">
                                                    <Label htmlFor="exampleFormControlTextarea5" className="form-label">Área</Label>
                                                    <select className="form-select mb-3" aria-label="Default select example">
                                                        <option >Select your Status </option>
                                                        <option defaultValue="1">Declined Payment</option>
                                                        <option defaultValue="2">Delivery Error</option>
                                                        <option defaultValue="3">Wrong Amount</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <Label htmlFor="exampleFormControlTextarea5" className="form-label">Mensaje</Label>
                                                    <textarea className="form-control" id="exampleFormControlTextarea5" rows="3"></textarea>
                                                        {validation.touched.first_name && validation.errors.first_name ? (
                                                            <FormFeedback type="invalid"><div>{validation.errors.first_name}</div></FormFeedback>
                                                    ) : null}
                                                </div>

                                                

                                                <div className="mt-4 text-center">
                                                    <div><br/>
                                                        <div className="ies_tar">
                                                            <Link to="/ies/auth"><button color="info" className="btn btn-outline-info ies_mr10">Cancelar</button></Link>
                                                            <Link to=""><button className="btn btn-success">Enviar</button></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>

                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default Register;
