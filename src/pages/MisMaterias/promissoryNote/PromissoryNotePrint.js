import React, { useState, useEffect } from "react";
import { Col, Container, Row, Badge, Table, Modal, Alert, CardFooter, Card, Input, CardHeader, CardBody, Label, Button, ModalBody, ModalHeader } from "reactstrap";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { reqPostInscriptionInfo } from "../../../store/actions";
import { getInfoPromissoryNote as onGetInfoPromissoryNote } from '../../../store/actions';
const PromissoryNotePrint = () => {
    document.title = "IES - Generación e impresión de pagarés";
    const dispatch = useDispatch()

    const { user, error, infoPromissoryNote } = useSelector((state) => ({
        user: state.Login.userData.data,
        error: state.AcademicSchedule.errorMsg,
        infoPromissoryNote: state.PromissoryNote.infoPromissoryNote
    }));

    useEffect(() => {
        dispatch(onGetInfoPromissoryNote())
    }, [dispatch]);

    const handlePrint = () => {
        window.print();
    };
    return (
        <React.Fragment>
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col lg={12} className="text-end mb-2">
                            <button color="info" className="btn btn-sm btn-outline-info ies_mr10">Modificar</button>
                            <button className="btn btn-sm btn-success" onClick={handlePrint}>Generar</button>
                        </Col>

                        <Col lg="9" md="12">
                            {
                                infoPromissoryNote && infoPromissoryNote.length > 0 &&

                                infoPromissoryNote.map((item, index) => (
                                    <Card key={index} className="border border-dark">
                                        <CardBody>
                                            <table className="table table-borderless">
                                                <tbody>
                                                    <tr >
                                                        <td colSpan="2" className="mt-4 pb-1">
                                                            <p className="mb-0"><strong>Nro. Pagaré:</strong> {item.ID_CUOTA}</p>
                                                        </td>
                                                        <td colSpan="2" className="mt-4 pb-1">
                                                            <p className="mb-0"><strong>Vto:</strong> {item.VTO_CUOTA}</p>
                                                        </td>
                                                    </tr>
                                                    <tr >
                                                        <td colSpan="2" className="">
                                                            <p className="mb-0"><strong>Centro Extensión:</strong> </p>
                                                        </td>
                                                        <td colSpan="2" className="">
                                                            <p className="mb-0"><strong>DNI:</strong> {item.DNI}</p>
                                                        </td>
                                                    </tr>
                                                    <tr className="mt-3" >
                                                        <td colSpan="4" className="mt-4">
                                                            <h5 className="mb-0 mt-3"><strong>Alumno:</strong> {item.ALUMNITO}</h5>
                                                        </td>
                                                    </tr>
                                                    <tr className="mt-4" >
                                                        <td colSpan="4" className="text-end mt-4">
                                                            <p className="mb-0 mt-3"><strong>Nro. Pagaré:</strong> {item.ID_CUOTA}</p>
                                                        </td>
                                                    </tr>
                                                    <tr className="mt-4" >
                                                        <td colSpan="4">
                                                            <p className="mb-0 mt-3"><strong>Córdoba {item.FECHAGENERA_CUOTA}</strong> </p>
                                                            <p className="mb-0 mt-3">Pagaré el día Lunes 10 de julio de 2023 sin protesto (Art. 50 D Ley 5965/63) a PERSFECTIVAS SA o a su orden la cantidas de pesos <strong>{item.TOTENLETRAS}</strong></p>
                                                        </td>
                                                    </tr>
                                                    <tr className="mt-4" >
                                                        <td colSpan="4" className="text-end mt-4">
                                                            <h6 className="mb-0 mt-3"><strong>Importe</strong> ${item.DEBE} </h6>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="12" className="">
                                                            <p><strong>Nombre:</strong> {item.ALUMNITO} </p>
                                                            <p><strong>DNI:</strong> {item.DNI}</p>
                                                            <p><strong>Calle:</strong></p>
                                                            <p><strong>Localidad:</strong> </p>
                                                            <p><strong>Teléfono:</strong> </p>
                                                        </td>
                                                    </tr>

                                                    <tr className="my-5" >
                                                        <td colSpan="4" className="my-5">
                                                            <p className="mb-0 mt-3"><strong>FIRMA</strong>  </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </CardBody>
                                    </Card>

                                ))


                            }


                        </Col>
                    </Row>
                </Container>
        </React.Fragment>
    );
};

export default PromissoryNotePrint;
