import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Alert, Button, Card, Col, Container, Label, Modal, ModalBody, ModalHeader, OffcanvasBody, Row, Table } from 'reactstrap';
import { getAbsence as onGetAbsence } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Reincorporation from '../reincorporation/Reincorporation';

const Absence = () => {
    document.title = "IES - Inasistencias";
    const dispatch = useDispatch()

    //const career = JSON.parse(localStorage.getItem('careerSelected'))

    const { absences, error, carrer } = useSelector((state) => ({
        absences: state.Absence.absences,
        error: state.Absence.errorMsg,
        carrer: state.Login.carrerSelected
    }));

    useEffect(() => {
        if (carrer && carrer.ID_CARRERA) {
            dispatch(onGetAbsence(carrer.ID_CARRERA))
        }
        
    }, [dispatch]);


    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const openModalWithItem = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setModalOpen(false);
    };


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <h4>CONSULTA DE INASISTENCIAS</h4>
                    {absences && absences.length > 0 ?

                        <>
                            <Row className="justify-content-center">
                                <Col md={8} >

                                    <Alert color="info">
                                        <strong>
                                            Importante
                                        </strong>
                                        <p>
                                            El plazo de entrega de la solicitud es una semana antes de la finalización de las clases.
                                        </p>
                                    </Alert>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col md="8">
                                    <Card className="ies-shadow1">
                                        <div className='table-responsive'>
                                        <Table className="align-middle table-nowrap mb-0 ies-tablelegajo">
                                            <thead className="table-light">
                                                <tr>
                                                    <th scope="col">Asignatura</th>
                                                    <th scope="col">Faltas</th>
                                                    <th scope="col">Permitidas</th>
                                                    <th scope="col">Detalle</th>
                                                </tr>
                                            </thead>
                                            <tbody style={{ backgroundColor: "white" }}>
                                                {
                                                    absences && absences.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.MATERIA}</td>
                                                            <td>{(item.FALTAS) / 2}</td>
                                                            <td>{item.PERMITIDAS}</td>
                                                            <td>

                                                                <Button className="btn btn-soft-info waves-effect waves-light btn-sm" onClick={() => openModalWithItem(item)}>
                                                                    <i className="las la-file-alt"></i>
                                                                </Button></td>

                                                        </tr>

                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </>
                        :
                        <Row className="justify-content-center">
                            <Col md={8}>
                                <Alert color="danger">
                                    No se registran inasistencias para el alumno.
                                </Alert>
                            </Col>
                        </Row>
                    }


                </Container>
                <Modal isOpen={isModalOpen} toggle={closeModal} centered>
                    <ModalHeader toggle={closeModal} className='text-center'>
                        {
                            selectedItem &&
                            selectedItem.MATERIA
                        }
                    </ModalHeader>
                    <ModalBody>
                        {
                            selectedItem && selectedItem.FECHAS_FALTAS.length > 0 ?
                            <div className='table-responsive'>
                                <Table>
                                    <thead className="">
                                        <tr>
                                            <th scope="col">Fechas</th>
                                            <th scope="col">Faltas</th>

                                        </tr>
                                    </thead>
                                    <tbody style={{ backgroundColor: "white" }}>

                                        {
                                        selectedItem.FECHAS_FALTAS.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.Fecha}</td>
                                                <td>{item.Faltas}</td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </Table>
                            </div>
                                :
                                <Alert color="danger">
                                    No se registran inasistencias.
                                </Alert>
                        }

                        <div className='text-end'>
                            <Button color='info' onClick={() => closeModal()}>Cerrar</Button>
                        </div>


                    </ModalBody>
                </Modal>

                <Reincorporation></Reincorporation>
            </div>
        </React.Fragment>
    );
}
export default Absence