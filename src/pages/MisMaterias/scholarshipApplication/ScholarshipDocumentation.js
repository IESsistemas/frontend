import React, { useState, useEffect } from "react";
import { Col, Container, Row, Badge, Table, Modal, Accordion, AccordionItem, Collapse, Alert, Card, CardBody, Form, Label, Input, FormFeedback, CardFooter, Button } from "reactstrap";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { getCompany as onGetCompany } from "../../../store/actions";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import withRouter from '../../../Components/Common/withRouter';

const ScholarshipDocumentation = (props) => {
    document.title = "IES - Solicitud de Becas";


    const dispatch = useDispatch()

    const { user, error, carrer } = useSelector((state) => ({
        user: state.Login.userData.data,
        error: state.AcademicSchedule.errorMsg,
        carrer: state.Login.carrerSelected,
    }));


    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            information: '',
        },
        validationSchema: Yup.object().shape({
            information: Yup.string().required('Por favor, completar este campo antes de imprimir.'),
        }),
        onSubmit: (values) => {
            dispatch(onGetCompany(values, props.router.navigate));
        }
    });



    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xs="12" className="mb-3">
                            <h4>DOCUMENTACIÓN  A PRESENTAR</h4>
                        </Col>
                    </Row>



                    <Row className="justify-content-center">
                        <Col lg="9" xs="12">

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
                                        <ol>
                                            <li>
                                                Fotocopia del comprobante que determine la vinculación con la empresa, organización, asociación con la cual IES tiene convenio (recibo de sueldo, carnet social, constancia de trabajo en el lugar, etc).
                                            </li>
                                            <li>
                                                En caso de ser FAMILIAR DIRECTO del titular del servicio, deberá adjuntar al recibo indicado arriba, una copia de la libreta de familia dónde constatar el vínculo existente (para parejas sin vínculo civil, presentar certificado de convivencia).
                                            </li>
                                            <li>
                                                Enviar toda la documentación indicada, al email: doa@ies21.edu.ar colocando en el asunto “SOLICITUD BECA CORPORATIVA” y en el cuerpo del correo:
                                                <ul>
                                                    <li>
                                                        NOMBRE Y APELLIDO DEL ALUMNO
                                                    </li>
                                                    <li>
                                                        DNI
                                                    </li>
                                                    <li>
                                                        TELÉFONO DE CONTACTO ACTUALIZADO
                                                    </li>
                                                    <li>
                                                        TIPO DE BECA QUE GESTIONA (indicar nombre de la empresa u organización y la relación con la misma).
                                                    </li>
                                                </ul>

                                            </li>
                                            <li>
                                                Para la renovación de la beca, deberá alcanzar la calificación de 7 o más, como resultado de promediar las notas de exámenes finales correspondiente a todas las materias cursadas en el semestre que acabó de finalizar, sin excepción.
                                            </li>
                                            <li>
                                                Deberás presionar en “imprimir” y guardar como pdf el formulario.
                                            </li>
                                        </ol>

                                        <div className="mt-2 mb-2">
                                                <Label htmlFor="information" className="form-label">Escribir el Nombre de la empresa u Organización, y si es Titular o Familiar Directo:</Label>
                                                <Input
                                                    type="input"
                                                    className="form-control"
                                                    aria-label="Escribir información"
                                                    name="information"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.information || ""}
                                                    invalid={
                                                        validation.touched.information && validation.errors.information ? true : false
                                                    }
                                                />
                                                {validation.touched.information && validation.errors.information ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.information}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        


                                       

                                    </CardBody>

                                    <CardFooter>
                                        <div className="text-end">
                                            <Button className="btn btn-success" type="submit" disabled={validation.errors.beca}>Imprimir</Button>
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
export default withRouter(ScholarshipDocumentation);

