import React, { useState, useEffect } from "react";
import { Col, Container, Row, Badge, Table, Modal, Accordion, AccordionItem, Collapse, Alert, Card, CardBody, Form, Label, Input, FormFeedback, CardFooter, Button } from "reactstrap";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { getException as onGetException, getExceptionProcessed as onGetExceptionProcessed } from "../../../store/actions";
import { Link } from "react-router-dom";
import withRouter from '../../../Components/Common/withRouter';
import * as Yup from "yup";
import { useFormik } from "formik";

const AcademicExceptions = (props) => {
    document.title = "IES - Solicitud Excepciónes Académicas";
    const options = [
        {
            id: '1',
            tipo: 'Excepción académica para cursar condicional'
        },
        {
            id: '2',
            tipo: 'Solicitud a cursar de oyente'
        },
        {
            id: '3',
            tipo: 'Excepción académica para cursar en otra carrera'
        },

    ]

    const dispatch = useDispatch()

    //const career = JSON.parse(localStorage.getItem('careerSelected'))

    const { user, career, error, exceptionProcessed } = useSelector((state) => ({
        user: state.Login.userData.data,
        career: state.Login.carrerSelected,
        error: state.AcademicSchedule.errorMsg,
        exceptionProcessed: state.AcademicExceptions.exceptionProcessed.academicExceptionsProcessed
    }));

    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            options: '',
        },
        validationSchema: Yup.object().shape({
            options: Yup.string().required('Por favor seleccione un tipo de options'),
        }),
        onSubmit: (values) => {
            dispatch(onGetException(values, props.router.navigate));
        }
    });

    useEffect(() => {
        dispatch(onGetExceptionProcessed())
    }, [dispatch]);

    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xs="12" className="mb-3">
                            <h4>SOLICITUD DE EXCEPCIÓNES ACADÉMICAS</h4>
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
                                        career &&
                                        <p><i className="las la-graduation-cap"></i> {career.DESCRIPCION}</p>
                                    }

                                </div>

                            </div>

                            <Alert color="info" className="mt-4">
                                Solo podrás imprimir la Excepción para Cursar en Otra Carrera una vez que esté <a href="https://www.ies21.edu.ar/becas-corporativas/" target="_blank"><strong>ACEPTADA.</strong></a>
                            </Alert>

                            <Alert color="info" className="mt-2">
                                Una vez impresa, deberás presentarla en Bedelia.

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
                                            <Label htmlFor="options" className="form-label">Tipo de excepción</Label>
                                            <Input
                                                type="select"
                                                className="form-select"
                                                aria-label="Selecciona una excepción"
                                                name="options"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                defaultValue={validation.values.options || ""}
                                                invalid={
                                                    validation.touched.options && validation.errors.options ? true : false
                                                }
                                            >
                                                <option>Selecciona una excepción</option>
                                                {options && options.length > 0 ? (
                                                    options.map((options, index) => (
                                                        <option key={index} value={options.id} selected>{options.tipo}</option>
                                                    ))
                                                ) : ""}


                                            </Input>
                                            {validation.touched.options && validation.errors.options ? (
                                                <FormFeedback type="invalid"><div>{validation.errors.options}</div></FormFeedback>
                                            ) : null}
                                        </div>



                                    </CardBody>

                                    <CardFooter>
                                        <div className="text-end">
                                            <Button className="btn btn-success" type="submit" disabled={validation.errors.options}>Solicitar</Button>
                                        </div>


                                    </CardFooter>
                                </Form>

                            </Card>

                        </Col>
                    </Row>
                    {
                        exceptionProcessed &&
                        <Row className="mt-3">
                            <Col xs="12">
                                <Table className="align-middle table-nowrap mb-0 ies-tablelegajo shadow table-responsive">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col">Asignatura</th>
                                            <th scope="col">Tipo de excepción</th>
                                            <th scope="col">Estado</th>
                                            <th scope="col">Fecha de solicitud</th>
                                            <th scope="col">Imprimir</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ backgroundColor: "white" }}>
                                        {
                                            exceptionProcessed ? exceptionProcessed.map((item, index) => (
                                                <tr key={index}>
                                                     <td>{item.Materia}</td>
                                                    <td>{item.TIPO_EXCEP}</td>
                                                    <td>
                                                        {
                                                            item.ESTADO_EXCEP === 'ACEPTADA' ?
                                                                <spam style={{ color: '#13C56B' }}>{item.ESTADO_EXCEP}</spam>
                                                                :
                                                                <spam style={{ color: '#00AAE4' }}>{item.ESTADO_EXCEP}</spam>
                                                        }


                                                    </td>
                                                    <td>{item.Fecha_solicitud}</td>
                                                    <td>
                                                        {
                                                            item.ESTADO_EXCEP === 'ACEPTADA' && item.TIPO_EXCEP === 'CURSADO EN OTRA CARRERA'?
                                                            <Link 
                                                            to="/ies/materias/academic-exceptions-print"
                                                            className="btn btn-success" 
                                                            onClick={() => {
                                                                localStorage.setItem('subject', item.Materia);
                                                              }}
                                                            ><i className="ri-printer-line"/></Link>
                                                            : null
                                                        }
                                                    
                                                    </td>
                                                </tr> 
                                            ))
                                                : null
                                        } 
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    }


                </Container>
            </div>
        </React.Fragment>
    );
};

export default withRouter(AcademicExceptions);
