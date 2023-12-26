import React, { useEffect, useState } from "react";
import { Col, Container, Alert, Modal, Card, CardBody, CardFooter, Row, Label, Form, Input, FormFeedback, Button } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getSoftware as onGetSoftware, postRqSoftware } from "../../store/actions";
import withRouter from "../../Components/Common/withRouter";
import { ToastContainer } from "react-toastify";

const FormSoftware = (props) => {
    document.title = "IES - Solicitud de software";

    const dispatch = useDispatch();

    const { user, token } = useSelector(state => ({
        user: state.Login.userData.data,
        token: state.Login.userData.user,
    }))

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            student: user.nombres + " " + user.apellidos,
            dni: user.dni,
            email: user.email,
            salida: 'N'
        },

        onSubmit: (values) => {
            dispatch(postRqSoftware(values, props.router.navigate))
        }
    });

    useEffect(() => {
        dispatch(onGetSoftware(token))
    }, [dispatch]);


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
                        <Col lg="9" xs="12">
                            <Card>
                                <Form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        validation.handleSubmit();
                                        return false;
                                    }}
                                    className="needs-validation mt-4" action="#">
                                    <CardBody>
                                        <Alert className="mb-3" color="danger">
                                            Si aparecen materiales deshabilitados, es porque fueron solicitados anteriormente.
                                        </Alert>
                                        <p className="mb-3">
                                            Podes descargar el software desde la página de ELMS(obtendrás los datos de registro: usuario
                                            y contraseña, por mail).
                                        </p>
                                        <p className="mb-3">
                                            Sino puede descargar todo el software desde la WEB de ELMS. no dude en contactarnos
                                            personalmente o por correo electrónico a Laboratorios de Informática
                                            (laboratoriosGies21.edu.ar), Rondeau 165 - Oficina 2.3
                                        </p>
                                        <p className="mb-3">
                                            Nota importante: debes entrar a la plataforma de Dreamspark / ELMS para obtener tus
                                            números de serie. Estos son programas que IES te provee en modo de beneficio por ser
                                            alumno de la institución, cuando termines el registro, en breve te llegarán dos mails de la
                                            cuenta de Patricio Fonrouge, donde podrás acceder a descargar una gran cantidad de
                                            programas de Microsoft.
                                        </p>


                                        <Row>
                                            <Col lg="4" md="4" sm="6">
                                                <Label htmlFor="student" className="form-label">Alumno</Label>
                                                <Input
                                                    id="student"
                                                    name="student"
                                                    className="form-control"
                                                    disabled
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.student}
                                                />

                                            </Col>
                                            <Col lg="4" md="4" sm="6">
                                                <Label htmlFor="dni" className="form-label">DNI</Label>

                                                <Input
                                                    id="dni"
                                                    name="dni"
                                                    className="form-control"
                                                    disabled
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.dni}
                                                />

                                            </Col>
                                            <Col lg="4" md="4" sm="6">
                                                <Label htmlFor="email" className="form-label">E-mail</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="text"
                                                    disabled
                                                    rows="3"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.email || ""}
                                                />
                                            </Col>
                                        </Row>


                                        <Alert className="mt-3" color="info">
                                            <strong>*Atención</strong> El mail que se muestra es el que será utilizado para notificar sobre el software solicitado. De no ser correcto, por favor modifiquelo haciendo <Link to={'/ies/data'}>Click aquí</Link>
                                        </Alert>




                                    </CardBody>

                                    <CardFooter>
                                        <div className="text-end">
                                            <Button className="btn btn-success" type="submit">Solicitar software</Button>
                                        </div>
                                    </CardFooter>
                                </Form>
                            </Card>
                        </Col>
                    </Row>

                    {/*   <Modal
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

export default withRouter(FormSoftware);
