import React, { useState, useEffect } from "react";
import { Col, Container, Row, Badge, Table, Modal, Accordion, AccordionItem, Collapse, Alert, Card, CardBody, Form, Label, Input, FormFeedback, CardFooter, Button } from "reactstrap";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { getDataException as onGetDataException, postException as onPostException } from "../../../store/actions";
import { Link } from "react-router-dom";
import withRouter from '../../../Components/Common/withRouter';
import * as Yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
const AcademicExceptionsConditional = (props) => {
    document.title = "IES - Solicitud Excepciónes Académicas";


    const dispatch = useDispatch()
    //const career = JSON.parse(localStorage.getItem('careerSelected'))

    const { user, carrer, error, exception, conditional, listener } = useSelector((state) => ({
        user: state.Login.userData.data,
        carrer: state.Login.carrerSelected,
        error: state.AcademicSchedule.errorMsg,
        exception: state.AcademicExceptions.exception,
        conditional: state.AcademicExceptions.conditional,
        listener: state.AcademicExceptions.listener
    }));

    useEffect(() => {
        if (carrer && carrer.ID_CARRERA) {
            dispatch(onGetDataException(carrer.ID_CARRERA, exception))
        }
    }, [dispatch, carrer]);


    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            subjects: "",
            observation: "",
        },
        validationSchema: Yup.object().shape({
            subjects: Yup.string().required("Por favor seleccionar una opción"),
            observation: Yup.string().required("Por favor agrega una observación"),
        }),
        onSubmit: (values, { resetForm }) => {
            const date = new Date();
            const year = date.getFullYear();
            const data = {
                academicExceptionType: '1',
                observations: values.observation,
                originIdCareer: carrer.ID_CARRERA,
                idSubject: Number(values.subjects),
                semester: 2,
                year: year,
            }
            dispatch(onPostException(data, props.router.navigate));
            resetForm();
        }
    });


    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xs="12" className="mb-3">
                            <h4>EXCEPCIÓN ACADÉMICA PARA CURSAR CONDICIONAL</h4>
                        </Col>
                    </Row>



                    <Row >
                        <Col lg="9" xs="12">

                            <p>
                                <strong>Sra. Directora Académica</strong> MARIA FERNANDA SIN
                            </p>
                            <p>
                                <strong>Sr. Secretario Académico</strong> CRISTIAN ROLDAN
                            </p>

                            <p>
                                A través de la presente solicito autorización para cursar con carácter condicional las siguientes materias, comprometiéndome a no rendir bajo ninguna circunstancia los exámenes finales de las materias del cuatrimestre que se me autoriza hasta tanto haber aprobado las materias de los años anteriores según la regla de porcentajes para el cursado de materias cuatrimestrales y/o el régimen de correlatividades del plan de estudios de mi carrera según corresponda bajo pena de expulsión de la Institución.

                            </p>
                            <p className="mt-4">
                                Los alumnos que solicitan cursar condicional, deberán regularizar su situación, en el turno de examen final inmediato posterior al cursado para poder mantener la condición de PROMOCIÓN. Caso contrario, la asignatura quedará REGULAR para poder ser rendida a partir del siguiente turno de exámenes

                            </p>
                        </Col>
                    </Row>

                    <Row className="mt-4">

                        {
                            conditional && conditional.length > 0 ?

                                <Form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        validation.handleSubmit();
                                        return false;
                                    }}
                                    className="needs-validation"
                                >
                                    <Row>
                                        <Col md="6" xs="12">
                                            <Table className="align-middle table-nowrap mb-0 ies-tablelegajo shadow">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col">Selecionar asignatura</th>

                                                    </tr>
                                                </thead>
                                                <tbody style={{ backgroundColor: "white" }}>

                                                    <>
                                                        <tr >
                                                            <td>
                                                                <Input
                                                                    type="select"
                                                                    className="form-select"
                                                                    aria-label="Selecciona"
                                                                    name="subjects"
                                                                    onChange={validation.handleChange}
                                                                    defaultValue={validation.values.subjects || ""}
                                                                    invalid={
                                                                        validation.touched.subjects && validation.errors.subjects ? true : false
                                                                    }
                                                                >
                                                                    <option >Selecciona asignatura</option>
                                                                    {
                                                                        conditional && conditional.map((data, index) => (
                                                                            <option key={index} value={data.ID_MATERIA}><strong>{data.MATERIA}</strong> </option>
                                                                        ))
                                                                    }
                                                                </Input>
                                                                {validation.touched.subjects && validation.errors.subjects ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.subjects}</div></FormFeedback>
                                                                ) : null}


                                                            </td>
                                                        </tr>

                                                        {validation.touched.subjects && validation.errors.subjects ? (
                                                            <FormFeedback type="invalid"><div>{validation.errors.subjects}</div></FormFeedback>
                                                        ) : null}
                                                    </>
                                                </tbody>
                                            </Table>
                                        </Col>

                                        <Col className="mt-md-0 mt-3" md="6" xs="12">
                                            <Card>
                                                <CardBody>
                                                    <div className="mb-5">
                                                        <Label htmlFor="observation" className="form-label">Observaciones</Label>
                                                        <Input
                                                            type="textarea"
                                                            className="form-control"
                                                            name="observation"
                                                            rows="3"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.observation || ""}
                                                            invalid={
                                                                validation.touched.observation && validation.errors.observation ? true : false
                                                            }
                                                        />

                                                        {validation.touched.observation && validation.errors.observation ? (
                                                            <FormFeedback type="invalid"><div>{validation.errors.observation}</div></FormFeedback>
                                                        ) : null}
                                                    </div>



                                                </CardBody>

                                                <CardFooter>
                                                    <div className="text-end">
                                                        <Button className="btn btn-success" type="submit" disabled={!validation.errors}>Solicitar</Button>
                                                    </div>


                                                </CardFooter>
                                            </Card>

                                        </Col>
                                    </Row>
                                </Form>
                                :
                                <Alert color="danger">
                                    Hubo un error, disculpe las molestias.
                                </Alert>

                        }

                    </Row>


                    <ToastContainer />

                </Container>
            </div>
        </React.Fragment>
    );
};

export default withRouter(AcademicExceptionsConditional);
