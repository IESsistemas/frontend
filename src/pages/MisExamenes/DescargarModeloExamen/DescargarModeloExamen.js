import React, { useState, useEffect } from "react";
import { Col, Container, Row, Badge, Table, Modal, AccordionItem, Collapse, Accordion, Card, CardBody, Alert } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { getExamModel as onGetExamModel, getDownloadExam as onGetDownloadExam } from '../../../store/actions';
import { format } from 'date-fns';

const InscripcionExamenMateria = () => {
    document.title = "IES - Descargar Modelo de Examen";

    const dispatch = useDispatch()

    const { exams, file } = useSelector((state) => ({
        exams: state.Exams.exams,
        file: state.Exams.file
    }));

    useEffect(() => {
        dispatch(onGetExamModel())
    }, [dispatch, file]);

    
    const download = (file) => {
        dispatch(onGetDownloadExam(file));
      };
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <h3>DESCARGAR MODELO EXÁMEN</h3>
                    <Row className="mt-3 justify-content-center">
                        <Col md={10} sm={12} className='mb-3' >
                            <Alert color="info" role="alert">
                                Deberás enviar el exámen resuelto al email del docente con copia a <a href="mailto:secretariacademica.ies21@gmail.com">secretariacademica.ies21@gmail.com</a>. <br />
                                En el Asunto del correo deberas completarlo con tu dni y el nombre de la materia
                            </Alert>
                            {
                                exams && exams.length > 0 ?

                                    <div className="table-responsive">
                                        <Table className="table-borderless align-middle mb-0 ies-tableanalitico mt-4">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Asignatura</th>
                                                    <th scope="col">Inicio examen escrito</th>
                                                    <th scope="col">Fin examen escrito</th>
                                                    <th scope="col">Inicio examen oral</th>
                                                    <th scope="col">Archivo</th>
                                                    <th scope="col">Email</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    exams && exams.length > 0 && exams.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                {item.Materia}
                                                            </td>
                                                            <td>
                                                                {format(new Date(item.escritodesde), 'yyyy-MM-dd')} - {item.Hora_Examen}
                                                            </td>
                                                            <td>
                                                                {format(new Date(item.escritohasta), 'yyyy-MM-dd')} - {item.Hora_Examen}
                                                            </td>
                                                            <td>
                                                                {format(new Date(item.oral), 'yyyy-MM-dd')} - {item.Hora_Examen}
                                                            </td>
                                                            <td className="text-center">
                                                               <button onClick={() => download(item.ARCHIVO)} className="btn">
                                                                    <i className="ies-bico ri-file-2-fill ies-lk"></i>
                                                                </button> 
                                                            </td>
                                                            <td>
                                                                {item.E_Mail}
                                                            </td>
                                                        </tr>

                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                    </div>

                                    :
                                    <Alert color="danger" role="alert" className="mt-4">
                                        No existen exámenes para descargar aún.
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
