import React, { useState, useEffect } from "react";
import { Col, Container, Row, Table, Alert, Card, CardBody, Form, Label, Input, FormFeedback, CardFooter, Button } from "reactstrap";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { getDataException as onGetDataException, postException as onPostException, getCommissions as onGetCommissions } from "../../../store/actions";
import { Link } from "react-router-dom";
import withRouter from '../../../Components/Common/withRouter';
import * as Yup from "yup";
import { useFormik } from "formik";
import { getCommission } from "../../../helpers/iesback_helper";
import { ToastContainer } from "react-toastify";

const AcademicExceptionsAnotherCareer = (props) => {
    document.title = "IES - Solicitud Excepciónes Académicas";

    const [selectedOptions, setSelectedOptions] = useState({});


    const dispatch = useDispatch()
    //const career = JSON.parse(localStorage.getItem('careerSelected'))

    const { user, career,exception, commissions, anotherCareer } = useSelector((state) => ({
        user: state.Login.userData.data,
        career: state.Login.carrerSelected,
        exception: state.AcademicExceptions.exception,
        commissions: state.AcademicExceptions.commissions,
        anotherCareer: state.AcademicExceptions.anotherCareer
    }));

    useEffect(() => {
        if (career && career.ID_CARRERA) {
            dispatch(onGetDataException(career.ID_CARRERA, exception))
        }

    }, [dispatch, career]);


    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            subjects: "",
            turn: "",
            commissions: "",
            observation: "",
        },
        validationSchema: Yup.object().shape({
            subjects: Yup.string().required("Por favor seleccionar una opción"),
            turn: Yup.string().required("Por favor seleccionar una opción"),
            commissions: Yup.string().required("Por favor seleccionar una opción"),
            observation: Yup.string().required("Por favor agrega una observación"),
        }),
        onSubmit: (values, { resetForm }) => {
            const date = new Date();
            const year = date.getFullYear();
            const currenMonth = date.getMonth() + 1; 
            const commissions = JSON.parse(values.commissions)
            const data = {
                academicExceptionType: '2',
                idSubject: commissions.Id_Materia,
                originIdCareer: career.ID_CARRERA,
                destinationIdCareer: commissions.Id_Carrera,
                semester: currenMonth <= 6 ? '1' : '2' ,
                year: year,
                observations: values.observation,
                idCatedra: commissions.Id_Catedra,
                idCommission: commissions.Id_Comision,

            }

            //dispatch(onPostException(data, props.router.navigate));
            resetForm()
        }
    });



    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xs="12" className="mb-3">

                            <h4>EXCEPCIÓN ACADÉMICA PARA CURSAR EN OTRA CARRERA</h4>

                        </Col>
                    </Row>



                    <Row >
                        <Col xs="12">

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
                            anotherCareer && Object.keys(anotherCareer).length > 0 ?

                                <Form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        validation.handleSubmit();
                                        return false;
                                    }}
                                    className="needs-validation"
                                >
                                    <Row>
                                        <Col sm="12">
                                            <Table className="table-responsive align-middle table-nowrap mb-0 ies-tablelegajo">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col">Selecionar asignatura</th>
                                                        <th scope="col">Carrera</th>
                                                        <th scope="col">Comisión</th>
                                                        <th scope="col">Turno</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ backgroundColor: "white" }}>
                                                    <tr>

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
                                                                <option>Selecciona asignatura</option>
                                                                {
                                                                    Object.keys(anotherCareer).map((data, index) => (
                                                                        <option key={index} value={data}><strong>{data}</strong> </option>
                                                                    ))

                                                                }
                                                            </Input>
                                                            {validation.touched.subjects && validation.errors.subjects ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.subjects}</div></FormFeedback>
                                                            ) : null}
                                                        </td>
                                                        <td> {career.DESCRIPCION}</td>
                                                        <td>
                                                            <Input
                                                                type="select"
                                                                className="form-select"
                                                                aria-label="Selecciona"
                                                                name="commissions"
                                                                onChange={(e) => {
                                                                    validation.handleChange(e);
                                                                    const selectedValue = e.target.value;
                                                                    setSelectedOptions(prevState => ({
                                                                        ...prevState,
                                                                        //[index]: selectedValue,
                                                                    }));
                                                                    dispatch(onGetCommissions(selectedValue));
                                                                }}
                                                                defaultValue={validation.values.commissions || ""}
                                                                invalid={
                                                                    validation.touched.commissions && validation.errors.commissions ? true : false
                                                                }
                                                            >
                                                                <option>Selecciona comisión</option>
                                                                {
                                                                    anotherCareer && anotherCareer[validation.values.subjects] && anotherCareer[validation.values.subjects].map((data, index) => (
                                                                        <option key={index} value={JSON.stringify(data)}><strong>{data.Comision}:</strong> </option>
                                                                    ))
                                                                }
                                                            </Input>
                                                            {validation.touched.commissions && validation.errors.commissions ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.commissions}</div></FormFeedback>
                                                            ) : null}
                                                        </td>
                                                        <td>
                                                            <Input
                                                                type="select"
                                                                className="form-select"
                                                                aria-label="Selecciona"
                                                                name="turn"
                                                                onChange={validation.handleChange}
                                                                defaultValue={validation.values.turn || ""}
                                                                invalid={
                                                                    validation.touched.turn && validation.errors.turn ? true : false
                                                                }
                                                            >
                                                                <option>Selecciona horario</option>
                                                                {
                                                                    commissions && commissions.length > 0 ?

                                                                        commissions.map((data, index) => (
                                                                            <option key={index} value={data}><strong>{data.Dia} - {data.modulo}</strong> </option>
                                                                        ))
                                                                        :
                                                                        <option value={0}>No hay comisiones disponibles</option>
                                                                }
                                                            </Input>

                                                            {validation.touched.turn && validation.errors.turn ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.turn}</div></FormFeedback>
                                                            ) : null}
                                                        </td>

                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                        <Col className="mt-3" sm="12">
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

export default withRouter(AcademicExceptionsAnotherCareer);
