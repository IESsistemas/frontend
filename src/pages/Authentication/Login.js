import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { loginUser, resetLoginFlag } from "../../store/actions";
import withRouter from '../../Components/Common/withRouter';

import logoLight from "../../assets/images/logo-light.png";

const Login = (props) => {

    const dispatch = useDispatch();
    const { user, errorMsg, loading, error } = useSelector(state => ({
        user: state.Account.user,
        errorMsg: state.Login.errorMsg,
        loading: state.Login.loading,
        error: state.Login.error,
    }));

    const [userLogin, setUserLogin] = useState([]);
    const [passwordShow, setPasswordShow] = useState(false);

    if(localStorage.getItem('auth-remember') != null){
        setTimeout(() => {
            try {
                document.getElementById('auth-remember-check').checked = true;
            } catch (error) {console.log(error)}
        }, 500);
    }

    useEffect(() => {
        setUserLogin({
            dni: "",
            password: ""
        })
    }, [user]);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            dni: localStorage.getItem('auth-remember') != null ? localStorage.getItem('auth-remember') : '',
            password: '',
        },
        validationSchema: Yup.object({
            dni: Yup.string().required("Por favor ingrese el DNI"),
            password: Yup.string().required("Pr favor ingrese la contraseña"),
        }),
        onSubmit: (values) => {
            if(document.getElementById('auth-remember-check').checked){
                localStorage.setItem('auth-remember', values.dni);
            }else{
                localStorage.removeItem('auth-remember');
            }
            dispatch(loginUser(values, props.router.navigate));

        }
    });

/*     useEffect(() => {
        if (error) {
            setTimeout(() => {
                dispatch(resetLoginFlag());
            }, 3000);
        }
    }, [dispatch, error]);
 */

    document.title = "IES - Iniciar Sesión";
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
                                            <Link to="/ies/auth/disabled"><h5 className="text-primary ies_titleColor">¡Hola! Bienvenida/o a tu espacio virtual!</h5></Link>
                                            <p className="text-muted">Inicie sesión para ingresar en AUTOGESTIÓN ALUMNOS</p>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                action="#">

                                                <div className="mb-3">
                                                    <Label htmlFor="dni" className="form-label">DNI</Label>
                                                    <Input
                                                        id="dni"
                                                        name="dni"
                                                        className="form-control"
                                                        placeholder="Ingresar DNI"
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.dni || ""}
                                                        invalid={
                                                            validation.touched.dni && validation.errors.dni ? true : false
                                                        }
                                                    />
                                                    {validation.touched.dni && validation.errors.dni ? (
                                                        <FormFeedback type="invalid">{validation.errors.dni}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">
                                                        <Link to="/ies/forgot-password" className="text-muted">Restablecer contraseña?</Link>
                                                    </div>
                                                    <Label className="form-label" htmlFor="password-input">Contraseña</Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            name="password"
                                                            value={validation.values.password || ""}
                                                            type={passwordShow ? "text" : "password"}
                                                            className="form-control pe-5"
                                                            placeholder="Ingresa contraseña"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            invalid={
                                                                validation.touched.password && validation.errors.password ? true : false
                                                            }
                                                        />
                                                        {validation.touched.password && validation.errors.password ? (
                                                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                        ) : null}
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>

                                                <div className="form-check">
                                                    <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                    <Label className="form-check-label" htmlFor="auth-remember-check">Recuerdame</Label>
                                                </div>

                                                <div className="mt-4 ">
                                                    <Button color="success" disabled={error ? null : loading ? true : false} className="btn btn-success w-100" type="submit">
                                                        {error ? null : loading ? <Spinner size="sm" className='me-2'> Cargando... </Spinner> : null}
                                                        Iniciar sesión
                                                    </Button>
                                                </div>
                                                <div className='mt-4'>
                                                {errorMsg && errorMsg ? (<Alert color="danger"> {errorMsg} </Alert>) : null}
                                                </div>
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>

                                <div className="mt-4 text-center">
                                    <p className="mb-0">¿Reclamos o sugerencias?<Link to="/ies/suggestions" className="fw-semibold text-primary text-decoration-underline"> Ingresa aquí </Link> </p>
                                </div>

                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default withRouter(Login);