import React, { useEffect } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback, CardHeader, Button } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//redux
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import withRouter from '../../Components/Common/withRouter';

//import images 
import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

import { getAreas as onGetAreas, suggestions } from "../../store/actions";

const Suggestions = (props) => {
    const history = useNavigate();
    const dispatch = useDispatch();

    const { areas, error, } = useSelector((state) => ({
        areas: state.Suggestions.areas.areas,
        error: state.Suggestions.error
    }));


    useEffect(() => {
        dispatch(onGetAreas())
    }, []);



    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            dni: '',
            area: '',
            message: '',
        },
        validationSchema: Yup.object().shape({
            dni: Yup.string().min(7, 'El DNI debe tener al menos 7 caracteres').max(8, 'El DNI debe tener máximo caracteres').required('Por favor ingrese el DNI'),
            area: Yup.string().required('Por favor seleccione un area'),
            message: Yup.string().max(200, 'El mensaje debe tener máximo 200 caracteres').required('Por favor escribe un mensaje'),
        }),
        onSubmit: (values) => {          
            dispatch(suggestions(values, props.router.navigate));
        }
    });

    document.title = "IES - Reclamos o sugerencias";

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
                                    <CardHeader className="text-center ">
                                        <h5 className="text-primary mb-0">Reclamos o sugerencias</h5>
                                    </CardHeader>
                                    <CardBody>

                                        <div>
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                className="needs-validation" action="#">

                                                {error && error ? (
                                                    <Alert color="danger">Hubo un error, intente nuevamente.</Alert>
                                                ) : null}

                                                <div className="mb-3">
                                                    <Label htmlFor="dni" className="form-label">DNI</Label>
                                                    <Input
                                                        id="dni"
                                                        name="dni"
                                                        className="form-control"
                                                        placeholder="Ingrese DNI"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.dni}
                                                        invalid={
                                                            validation.touched.dni && validation.errors.dni ? true : false
                                                        }
                                                    />
                                                    {validation.touched.dni && validation.errors.dni ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.dni}</div></FormFeedback>
                                                    ) : null}

                                                </div>
                                                <div className="mb-3">
                                                    <Label htmlFor="area" className="form-label">Área</Label>
                                                    <Input
                                                        type="select"
                                                        className="form-select"
                                                        aria-label="Selecciona un área"
                                                        name="area"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.area || ""}
                                                        invalid={
                                                            validation.touched.area && validation.errors.area ? true : false
                                                        }
                                                        >


                                                        <option >Selecciona un área </option>

                                                        {areas && areas.length > 0 ? (
                                                            areas.map(area => (
                                                                <option key={area.Id_area} value={JSON.stringify(area)}>{area.Descripcion}</option>
                                                            ))
                                                        ) : ""}


                                                    </Input>
                                                    {validation.touched.area && validation.errors.area ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.area}</div></FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label htmlFor="message" className="form-label">Mensaje</Label>
                                                    <Input
                                                        id="message"
                                                        name="message"
                                                        type="textarea"
                                                        className="form-control"
                                                        rows="3"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.message || ""}
                                                        invalid={
                                                            validation.touched.message && validation.errors.message ? true : false
                                                        }

                                                    />
                                                 {validation.touched.message && validation.errors.message ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.message}</div></FormFeedback>
                                                    ) : null}  
                                                </div>



                                                <div className="mt-4 text-center">
                                                    <div><br />
                                                        <div className="ies_tar">
                                                            <Link to="/ies/auth"><button color="info" className="btn btn-outline-info ies_mr10">Cancelar</button></Link>
                                                            <Button className="btn btn-success" type="su">Enviar</Button>

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
}

export default withRouter(Suggestions);