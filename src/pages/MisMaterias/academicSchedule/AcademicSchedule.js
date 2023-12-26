import React, { useState, useEffect } from "react";
import { Col, Container, Row, Badge, Table, Modal, Accordion, AccordionItem, Collapse } from "reactstrap";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { getSchedule as onGetSchedule } from "../../../store/actions";

const AcademicSchedule = () => {
    document.title = "IES - Cronograma Académico";

    const dispatch = useDispatch()

    const { schedule, error, } = useSelector((state) => ({
        schedule: state.AcademicSchedule.schedule,
        error: state.AcademicSchedule.errorMsg
    }));

    useEffect(() => {
        dispatch(onGetSchedule())
    }, [dispatch]);

    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xs="12" className="mb-3">
                            <h4>CRONOGRAMA ACADÉMICO</h4>
                        </Col>
                        <Col lg="5" md="7" xs="12">

                            <div className="ies-mycarrerNav d-flex align-items-center" style={{ minHeight: '0px', flexFlow: 'inherit' }}>
                                <div> <i className="las la-calendar" style={{ fontSize: '36px' }}></i> </div>
                                <div className="ms-2 ies-conttextmycarrer">
                                    {
                                        schedule &&
                                        <>
                                            <h5 className="text-white mb-0">{schedule.title?.Parrafo1}</h5>
                                        </>
                                    }
                                </div>

                            </div>
                        </Col>
                    </Row>


                    {schedule &&
                        <Row>
                            <Col xs="12" className="text-center mt-4 d-flex flex-column">
                                <h3>{schedule.bloque1?.Parrafo2}</h3>
                                <h5>{schedule.bloque1?.Parrafo3}</h5>
                            </Col>
                            <Col xs="12" className="text-center mt-4 d-flex flex-column">
                                <div className="mt-3">
                                    <h3>{schedule.bloque2?.Parrafo4}</h3>
                                    <ul className="list-unstyled text-muted vstack gap-3 ff-secondary">
                                        <li>
                                            <div className="d-flex" >
                                                <div className="flex-grow-1">
                                                    <p className="mb-2" style={{ fontSize: '15px' }}><b>{schedule.bloque2?.Parrafo5}</b></p>
                                                    <p style={{ fontSize: '15px' }}>
                                                        <b>{schedule.bloque2?.Parrafo6}</b> {schedule.bloque2?.Parrafo6_1}
                                                    </p>
                                                    <p style={{ fontSize: '15px' }}>
                                                        <b>{schedule.bloque2?.Parrafo7}</b> {schedule.bloque2?.Parrafo7_1}
                                                    </p>
                                                    <p style={{ fontSize: '15px' }}>
                                                        <b>{schedule.bloque2?.Parrafo8}</b> {schedule.bloque2?.Parrafo8_1}
                                                    </p>
                                                    <p style={{ fontSize: '15px' }}>
                                                        <b>{schedule.bloque2?.Parrafo9}</b> {schedule.bloque2?.Parrafo9_1}
                                                    </p>

                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mt-4">
                                    <h3>{schedule.bloque3?.Parrafo10}</h3>
                                    <p className="list-unstyled text-muted vstack gap-3 ff-secondary"> <b>{schedule.bloque3?.Parrafo11}</b> </p>
                                    <ul className="list-unstyled text-muted vstack gap-3 ff-secondary">
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-grow-1">
                                                    <p className="mb-2" style={{ fontSize: '15px' }}><b>{schedule.bloque3?.Parrafo12}</b></p>

                                                    <p style={{ fontSize: '15px' }}>
                                                        <b>{schedule.bloque3?.Parrafo13}</b> {schedule.bloque3?.Parrafo13_1}
                                                    </p>
                                                    <p style={{ fontSize: '15px' }}>
                                                        <b>{schedule.bloque3?.Parrafo14}</b> {schedule.bloque3?.Parrafo14_1}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-grow-1">
                                                    <p style={{ fontSize: '15px' }}><b>{schedule.bloque3?.Parrafo15}</b></p>
                                                    <p style={{ fontSize: '15px' }}>
                                                        <b>{schedule.bloque3?.Parrafo16}</b> {schedule.bloque3?.Parrafo16_1}
                                                    </p>
                                                    <p style={{ fontSize: '15px' }}>
                                                        <b>{schedule.bloque3?.Parrafo17}</b> {schedule.bloque3?.Parrafo17_1}
                                                    </p>

                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-grow-1">
                                                    <p style={{ fontSize: '15px' }}><b>{schedule.bloque3?.Parrafo18}</b></p>
                                                    <p style={{ fontSize: '15px' }}>
                                                        <b>{schedule.bloque3?.Parrafo19}</b> {schedule.bloque3?.Parrafo19_1}
                                                    </p>
                                                    <p style={{ fontSize: '15px' }}>
                                                        <b>{schedule.bloque3?.Parrafo20}</b> {schedule.bloque3?.Parrafo20_1}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-4">
                                    <h3>{schedule.bloque4?.Parrafo21}</h3>
                                    <ul className="list-unstyled text-muted vstack gap-3 ff-secondary">
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-grow-1">
                                                    <p style={{ fontSize: '15px' }}>{schedule.bloque4?.Parrafo22}</p>

                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-4">
                                    <h5>{schedule.bloque5?.Parrafo25}</h5>
                                    <ul className="list-unstyled text-muted vstack gap-3 ff-secondary">
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-grow-1">
                                                    <p style={{ fontSize: '15px' }}>
                                                        {schedule.bloque5?.Parrafo26}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Col>

                        </Row>
                    }



                </Container>
            </div>
        </React.Fragment>
    );
};

export default AcademicSchedule;
