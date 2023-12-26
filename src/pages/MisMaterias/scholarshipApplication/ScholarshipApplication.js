import React, { useState, useEffect } from "react";
import { Col, Container, Row, Badge, Table, Modal, Accordion, AccordionItem, Collapse, Alert, Card, CardBody, Form, Label, Input, FormFeedback, CardFooter, Button } from "reactstrap";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { getScholarship as onGetScholarship } from "../../../store/actions";
import { Link } from "react-router-dom";
import withRouter from '../../../Components/Common/withRouter';
import * as Yup from "yup";
import { useFormik } from "formik";

const ScholarshipApplication = (props) => {
    document.title = "IES - Solicitud de Becas";
    const beca = [
        {
            id: 1,
            tipo: 'Beca corporativa'
        },

    ]

    const dispatch = useDispatch()
    //const career = JSON.parse(localStorage.getItem('careerSelected'))

    const { user, carrer, error, } = useSelector((state) => ({
        user: state.Login.userData.data,
        error: state.AcademicSchedule.errorMsg,
        carrer: state.Login.carrerSelected,
    }));

    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            beca: '',
        },
        validationSchema: Yup.object().shape({
            beca: Yup.string().required('Por favor seleccione un tipo de beca'),
        }),
        onSubmit: (values) => {
            console.log(values)
            dispatch(onGetScholarship(values, props.router.navigate));
        }
    });

    useEffect(() => {

    }, [dispatch]);

    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xs="12" className="mb-3">
                            <h4>SOLICITUD DE BECAS</h4>
                        </Col>
                    </Row>



                    <Row >
                        <Col lg="6" xs="12">

                            <div className="ies-mycarrerNav d-flex align-items-center" style={{ minHeight: '0px', flexFlow: 'inherit' }}>
                                <div>
                                    <div alt="" className="avatar-lg img-thumbnail rounded-circle ies-aliceblue ies-color  d-flex align-items-center justify-content-around">
                                        <i className="las la-user-circle" style={{ fontSize: '46px' }}></i>
                                    </div>
                                </div>
                                <div className="ms-3 ies-conttextmycarrer">
                                    {
                                        user &&
                                        <h5 className="text-white">{user.apellidos}, {user.nombres}</h5>
                                    }
                                    {
                                        carrer &&
                                        <p><i className="las la-graduation-cap"></i> {carrer.DESCRIPCION}</p>
                                    }

                                </div>

                            </div>

                            <Alert color="info" className="mt-4">
                                Las Becas Corporativas deberán corresponder a convenios vigentes en el momento de la gestión de beca. <a href="https://www.ies21.edu.ar/becas-corporativas/" target="_blank"><strong>Ver listado.</strong></a>
                            </Alert>

                            <Alert color="info" className="mt-2">
                                Si aún no contás con ninguno de estos beneficios, completá el siguiente formulario. <a href="https://www.ies21.edu.ar/becas-corporativas/formulario.php" target="_blank"><strong>Proponé a tu organización.</strong></a>
                                
                            </Alert>

                        </Col>

                        <Col lg="6" xs="12">

                            <Card>
                                <Form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        validation.handleSubmit();
                                        return false;
                                    }}
                                    className="needs-validation" action="#"
                                >
                                    <CardBody>


                                        <div className="mb-5">
                                            <Label htmlFor="beca" className="form-label">Tipo de beca</Label>
                                            <Input
                                                type="select"
                                                className="form-select"
                                                aria-label="Selecciona un tipo"
                                                name="beca"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.beca || ""}
                                                invalid={
                                                    validation.touched.beca && validation.errors.beca ? true : false
                                                }
                                            >
                                                <option>Selecciona una opción</option>
                                                {beca && beca.length > 0 ? (
                                                    beca.map((beca, index) => (
                                                        <option key={index} value={beca.tipo} selected>{beca.tipo}</option>
                                                    ))
                                                ) : ""}


                                            </Input>
                                            {validation.touched.beca && validation.errors.beca ? (
                                                <FormFeedback type="invalid"><div>{validation.errors.beca}</div></FormFeedback>
                                            ) : null}
                                        </div>



                                    </CardBody>

                                    <CardFooter>
                                        <div className="text-end">
                                            <Button className="btn btn-success" type="submit" disabled={validation.errors.beca}>Solicitar</Button>
                                            {/* <Link to="/ies/materias/documentacion-beca"><button color="info" className="btn btn-success" disabled={!validation.errors.beca}>Solicitar</button></Link> */}
                                        </div>


                                    </CardFooter>
                                </Form>

                            </Card>

                        </Col>
                    </Row>




                </Container>
            </div>
        </React.Fragment>
    );
};

export default withRouter(ScholarshipApplication);
