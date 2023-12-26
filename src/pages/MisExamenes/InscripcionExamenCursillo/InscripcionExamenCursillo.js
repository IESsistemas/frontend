import React, { useState, useEffect } from "react";
import { Col, Container, Row, Input, Table, Modal, AccordionItem, Collapse, Accordion, Card, CardBody, Alert, Form } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getCourseRegistrationInfo as onGetCourseRegistrationInfo } from '../../../store/actions';
import classnames from "classnames";
import { format } from "date-fns";
import { useFormik } from "formik";
import * as Yup from "yup";

const InscripcionExamenMateria = () => {
    document.title = "IES - Inscripcion Examen Cursillo";

    const [valorTotalSeleccionado, setValorTotalSeleccionado] = useState(0);
    //const career = JSON.parse(localStorage.getItem('careerSelected'))

    const { career, alldata, academic, materiasInscriptas, materiasAInscribir, saldoActual } = useSelector(state => {
        return {
            career: state.Login.carrerSelected,
            alldata: state.Login.userData,
            academic: state.MisMaterias.academic,
            materiasInscriptas: state.CourseRegistration.courseInfo.materiasInscriptas,
            materiasAInscribir: state.CourseRegistration.courseInfo.materiasAInscribir,
            saldoActual: state.CourseRegistration.courseInfo.saldoWeb
        }
    });

    const [col1, setcol1] = useState(false);
    const [col2, setcol2] = useState(false);

    const t_col1 = () => {
        setcol1(!col1);
    };

    const t_col2 = () => {
        setcol2(!col2);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        if (career && career.ID_CARRERA) {
            dispatch(onGetCourseRegistrationInfo(career.ID_CARRERA))
        }

    }, [dispatch]);


    const formatNumberArg = (num) => {
        num = parseFloat(num.toFixed(2));
        let n = num.toLocaleString('es-AR');
        return n.indexOf(',') !== -1 ? (
            n.split(',')[1].length === 1 ? (n + "0") : n
        ) : (n + ",00");
    }

    const fdate = (date) => {
        //format date string to dd/mm/yyyy
        let d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [day, month, year].join('/');
    }

    const [modal_center, setmodal_center] = useState(false);

    function tog_center(tribunal) {
        //if(tribunal) settribunalValue(tribunal)
        setmodal_center(!modal_center);
    }

    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            check: {},
            date: {},
        },
        validationSchema: Yup.object().shape({
            check: Yup.object(),
            date: Yup.object(),
        }),
        onSubmit: (values) => {

        }
    });

    return (
        <React.Fragment>
            <Modal
                isOpen={modal_center}
                toggle={() => {
                    tog_center();
                }}
                centered
            >
                <div className="ies-spacebtw">
                    <br />
                    <h5>Inscripción a exámen final cursillo</h5><br />
                    <p><span style={{ fontWeight: 'bold' }}>Asignatura:</span> Introducción a la matemática I</p><br />
                    <p><span style={{ fontWeight: 'bold' }}>Día y horario:</span> 22/06/2023 a las 11:00am</p><br />
                    <p><span style={{ fontWeight: 'bold' }}>Mesa de exámen:</span> Mañana A</p>
                    <br />
                    <div className="ies_tar">
                        <button color="info" className="btn btn-outline-info ies_mr10" onClick={() => {
                            tog_center();
                        }}>Cancelar</button>
                        <button className="btn btn-success" >Confirmar</button>
                    </div><br />
                </div>
            </Modal>
            <div className="page-content">
                <Container fluid>
                    <h3>INSCRIPCIÓN EXÁMENES FINAL CURSILLO</h3>
                    <Row className="mt-3 justify-content-center">





                        {
                            materiasAInscribir && materiasAInscribir.length > 0 ?
                                <>
                                    <Col lg={10} md={12} sm={12} className='mb-3' >
                                        <Accordion id="default-accordion-example" className="custom-accordionwithicon custom-accordion-border accordion-border-box accordion-success ">
                                            <AccordionItem>
                                                <h2 className="accordion-header" id="headingOne">
                                                    <button
                                                        className={classnames("accordion-button fw-semibold", { collapsed: !col1 })} type="button" onClick={t_col1} style={{ cursor: "pointer" }} >
                                                        Requisitos
                                                    </button>
                                                </h2>

                                                <Collapse isOpen={col1} className="accordion-collapse" id="collapseOne" >
                                                    <div className="accordion-body">
                                                        <ul>
                                                            <li>
                                                                Asistir con documentación identificatoria, ya sea DNI, Libreta de estudiante, pasaporte o algún otro documento identificatorio. De caso contrario podría decidirse la no continuidad de su exámen.
                                                            </li>
                                                            <li>
                                                                El valor del derecho de exámen deberá estar acreditado antes de la inscripción al exámen.
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </Collapse>
                                            </AccordionItem><br />
                                            <AccordionItem>
                                                <h2 className="accordion-header" id="headingTwo">
                                                    <button
                                                        className={classnames("accordion-button fw-semibold", { collapsed: !col2 })} type="button" onClick={t_col2} style={{ cursor: "pointer" }} >
                                                        Plazos
                                                    </button>
                                                </h2>

                                                <Collapse isOpen={col2} className="accordion-collapse" >
                                                    <div className="accordion-body">
                                                        <ul>
                                                            <li>
                                                                Puedes inscribirte al exámen final hasta 24 hs ántes de la hora del exámen. (Hora de Córdoba, Argentina)
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </Collapse>
                                            </AccordionItem><br />
                                        </Accordion>

                                    </Col>
                                    <Col lg={10} md={12} sm={12} className='mb-3' >
                                        <Card>
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                className="needs-validation" action="#">
                                                <div className="table-responsive">
                                                    <Table className="table-borderless align-middle mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col"></th>
                                                                <th scope="col">Cuatrimestre</th>
                                                                <th scope="col">Asignatura</th>
                                                                <th scope="col">Centro de extensión</th>
                                                                <th scope="col">Mesa de exámen</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {
                                                                materiasAInscribir && materiasAInscribir.length > 0 && materiasAInscribir.map((item, index) => (

                                                                    <tr key={index}>
                                                                        <td>
                                                                            <div className="form-check" style={{ marginLeft: "10px" }}>
                                                                                <Input
                                                                                    type="checkbox"
                                                                                    className="form-check-input"
                                                                                    name="check"
                                                                                    onChange={(e) => {
                                                                                        const isChecked = e.target.checked;
                                                                                        if (isChecked) {
                                                                                            // Agregar el elemento a la lista de elementos seleccionados en 'values.check'
                                                                                            validation.setFieldValue('check', [...validation.values.check, item]);
                                                                                            // Sumar el valor del elemento seleccionado al valor total
                                                                                            let totalValue = valorTotalSeleccionado;
                                                                                            if (item.mesasExamen && item.mesasExamen.length > 0) {
                                                                                                totalValue += item.mesasExamen.reduce((acc, mesa) => acc + mesa.Valor_Cupon, 0);
                                                                                            }
                                                                                            setValorTotalSeleccionado(totalValue);
                                                                                        } else {
                                                                                            // Remover el elemento de la lista de elementos seleccionados en 'values.check'
                                                                                            validation.setFieldValue('check', validation.values.check.filter(el => el !== item));
                                                                                            // Restar el valor del elemento deseleccionado del valor total
                                                                                            let totalValue = valorTotalSeleccionado;
                                                                                            if (item.mesasExamen && item.mesasExamen.length > 0) {
                                                                                                totalValue -= item.mesasExamen.reduce((acc, mesa) => acc + mesa.Valor_Cupon, 0);
                                                                                            }
                                                                                            setValorTotalSeleccionado(totalValue);
                                                                                        }
                                                                                    }}
                                                                                    onBlur={validation.handleBlur}
                                                                                    checked={validation.values.check.includes(item)}
                                                                                    disabled={item.mesasExamen.length <= 0}
                                                                                    invalid={validation.touched.check && !!validation.errors.check}
                                                                                />
                                                                            </div>
                                                                        </td>

                                                                        <td>
                                                                            {item.CUATRIMESTRE}
                                                                        </td>
                                                                        <td>
                                                                            {item.NOMBRE}
                                                                        </td>
                                                                        <td>
                                                                            {item.ID_MODALIDAD}
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.mesasExamen.length <= 0 ?
                                                                                    <small className="text-danger">Se venció el plazo de 24 hs. reloj para inscribirse en este examen o el turno no corresponde a su modalidad. Consultar con Depto. de Ingreso</small>
                                                                                    :
                                                                                    <Input
                                                                                        type="select"
                                                                                        className="form-select"
                                                                                        aria-label="Selecciona un tipo"
                                                                                        name={`date.${index}`} // Utiliza el índice en el nombre del campo
                                                                                        onChange={validation.handleChange}
                                                                                        onBlur={validation.handleBlur}
                                                                                        value={validation.values.date[index] || ""}
                                                                                        invalid={
                                                                                            validation.touched.date && validation.touched.date[index] && validation.errors.date ? true : false
                                                                                        }
                                                                                    >
                                                                                        <option value=''>Seleccionar</option>
                                                                                        ´{item.mesasExamen.map((item, index) => (
                                                                                            <option value={JSON.stringify(item)} key={index} ><b>{item.Mesa}:</b> {format(new Date(item.Fecha_Examen), 'dd-MM-yyyy')} a las {item.Hora_Examen} - {item.PROFESOR}</option>
                                                                                        ))


                                                                                        }

                                                                                    </Input>

                                                                            }


                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }

                                                        </tbody>
                                                    </Table>
                                                </div>

                                                <div className="ies-analitico-botTable ies-tableinscmat">
                                                    <div className="ies-spacebtw">
                                                        <div className="ies_tar">
                                                            <span style={{ float: "left", position: "relative", top: "10px" }}>
                                                                <span className="ies-bold">Total derechos de exámen: </span> ${valorTotalSeleccionado}
                                                            </span>
                                                            <span style={{ float: "left", position: "relative", top: "10px", marginLeft: "20px" }}>
                                                                <span className="ies-bold">Saldo de cuenta: </span>${(saldoActual).toFixed(2)}
                                                            </span>
                                                            <button color="info" className="btn btn-outline-info ies_mr10">Cancelar</button>
                                                            {/* <button className="btn btn-success" onClick={() => {
                                                                tog_center();
                                                            }}>Inscribirme</button> */}
                                                            <button className="btn btn-success" type="submit">Inscribirme</button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </Form>
                                        </Card>
                                    </Col>
                                </>
                                :
                                <Col lg={10} md={12} sm={12}>
                                <Alert color="danger" role="alert">
                                    No existen mesas de exámenes disponibles
                                </Alert>
                                </Col>
                                
                        }






                        <Col md={8} className='mb-3' >
                            <h4>
                                Asignaturas inscriptas a rendir
                            </h4><br />
                            {
                                materiasInscriptas && materiasInscriptas.length > 0 ?

                                    <Table className="table-borderless align-middle table-nowrap mb-0 ies-tableanalitico">
                                        <thead>
                                            <tr>
                                                <th scope="col">Asignatura</th>
                                                <th scope="col">Centro de extensión</th>
                                                <th scope="col">Fecha</th>
                                                <th scope="col">Hora</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                materiasInscriptas && materiasInscriptas.length > 0 && materiasInscriptas.map((item, index) => (

                                                    <tr key={index}>
                                                        <td>
                                                            {item.MATERIA}
                                                        </td>
                                                        <td>
                                                            {item.ID_CTRO_UBICA}
                                                        </td>
                                                        <td>
                                                            {item.FECHA_EXAMEN}
                                                        </td>
                                                        <td>
                                                            {item.HORA_EXAMEN}
                                                        </td>
                                                    </tr>

                                                ))
                                            }

                                        </tbody>
                                    </Table>
                                    :
                                    <Alert color="danger" role="alert">
                                        No existen asignaturas inscriptas a rendir.
                                    </Alert>
                            }

                        </Col>
                    </Row>
                    <br /><br /><br />
                    
                </Container>
            </div>
        </React.Fragment>
    );
};

export default InscripcionExamenMateria;
