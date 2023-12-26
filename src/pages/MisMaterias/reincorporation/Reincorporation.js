import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Alert, Button, Card, Col, Container, Form, Input, Label, Modal, ModalBody, ModalHeader, OffcanvasBody, Row, Table } from 'reactstrap';
import { getReincorporation as onGetReincorporation, reincorporation as onReincorporation } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
const Reincorporation = () => {
    document.title = "IES - Reincorporación";

    const dispatch = useDispatch()

    //const career = JSON.parse(localStorage.getItem('careerSelected'))

    const { reincorporation, error,carrer  } = useSelector((state) => ({
        reincorporation: state.Reincorporation.reincorporation,
        error: state.VirtualLibrary.errorMsg,
        carrer: state.Login.carrerSelected
    }));

    useEffect(() => {
        if (carrer  && carrer.ID_CARRERA) {
            dispatch(onGetReincorporation(carrer.ID_CARRERA))
        }
    }, [dispatch, carrer]);

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const openModalNewReincorporation = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setModalOpen(false);
    };

    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            observation: '',
            certificate: false,
            selectedItemData: null,
        },

        onSubmit: (values) => {

            const selectedItemData = values.selectedItemData;
            const data = {
                idCarrera: String(carrer.ID_CARRERA),
                idMateria: String(selectedItemData.ID_MATERIA),
                semestre: String(selectedItemData.SEMESTRE),
                year: String(selectedItemData.AÑO),
                presentaCertificado: values.certificate ? 'SI' : 'NO',
                observaciones: values.observation
            }


            dispatch(onReincorporation(data));

            validation.resetForm();
        }
    });



    return (
        <React.Fragment>
            <Container fluid className='mt-5'>
                <h4>SOLICITUD DE REINCORPORACIONES</h4>
                <Row>
                    <Col>
                        <strong className='text-muted'>Consideraciones para Procedimiento de Reincorporación</strong>
                        <ol className='text-muted'>
                            <li>
                                El alumno que pierde su regularidad por inasistencia a clases puede recuperarla cumplimentando el procedimiento de REINCORPORACION, para lo cual deberá formalizar la solicitud correspondiente a cada materia a través de esta página. Al ser correctamente enviada le figurará en el estado PENDIENTE DE APROBACION.
                            </li>
                            <li>
                                Esta solicitud deberá ser aprobada por el docente a cargo de la materia. De ser así, se modificará el estado a APROBADA, en cuyo caso el alumno deberá abonar el arancel correspondiente y comunicarse con Administración para realizar la facturación del mismo (*)
                            </li>
                            <li>
                                Una vez facturado, pasar por bedelía para cargar el porcentaje de asistencia otorgado.
                            </li>
                        </ol>
                        <p className='text-muted'>
                            (*) en caso de tener certificados para justificar inasistencias dirijase al DOA (Departamento Orientación Alumnos)
                        </p>
                    </Col>
                </Row>
                {reincorporation && reincorporation.length > 0 ?
                    <>
                        <Row className="justify-content-center mt-3">
                            <Col md="8">
                                <Card className="ies-shadow1">
                                    <div className='table-responsive'>
                                        <Table className="align-middle table-nowrap mb-0 ies-tablelegajo">
                                            <thead className="table-light">
                                                <tr>
                                                    <th scope="col">Materias para solicitar reincorporación</th>
                                                </tr>
                                            </thead>
                                            <tbody style={{ backgroundColor: "white" }}>
                                                {
                                                    reincorporation && reincorporation.length > 0 && reincorporation.map((item, index) => (

                                                        <tr key={index}>
                                                            <td><button className="btn" disabled={item.ESTADO_ACTUAL === 'Pendiente de Aprobación'} onClick={() => openModalNewReincorporation(item)} style={{ border: 'none', }}> {item.MATERIA} | {item.SEMESTRE} | {item.AÑO}</button></td>
                                                        </tr>


                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card>
                            </Col>

                            <Col md="8">
                                <Card className="ies-shadow1">
                                    <div className='table-responsive'>
                                        <Table className="align-middle table-nowrap mb-0 ies-tablelegajo">
                                            <thead className="table-light">
                                                <tr>
                                                    <th scope="col">Reincorporaciónes solicitadas</th>
                                                    <th scope="col">Certificado</th>
                                                    <th scope="col">Estado</th>
                                                    <th scope="col">Observación</th>
                                                </tr>
                                            </thead>
                                            <tbody style={{ backgroundColor: "white" }}>
                                                {
                                                    reincorporation && reincorporation.map((item, index) => (

                                                        <tr key={index}>
                                                            {item.SOLICITADA &&
                                                                <>
                                                                    <td>{item.MATERIA} | {item.SEMESTRE} | {item.AÑO}</td>
                                                                    <td>{item.PRESENTA_CERTIFICADO === 'S' ? 'SI' : item.PRESENTA_CERTIFICADO === 'N' ? 'NO' : item.PRESENTA_CERTIFICADO === null && 'N/A'}</td>
                                                                    <td><span className='text-primary'>{item.ESTADO_ACTUAL}</span></td>
                                                                    <td>{item.OBSERVACION}</td>
                                                                </>
                                                            }
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
                    <Row className="justify-content-center mt-3">
                        <Col md={8}>
                            <Alert color="danger">
                                Aún no existe reincorporaciones para solicitar.
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
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            validation.setFieldValue('selectedItemData', selectedItem);
                            validation.handleSubmit();
                            closeModal()
                            return false;
                        }}
                        className="needs-validation" action="#"
                    >
                        <div className="mb-3">
                            <Label htmlFor="observation" className="form-label">Observaciones</Label>
                            <Input
                                type="text"
                                className="form-control"
                                aria-label="Escriba una observacióm"
                                name="observation"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.observation}
                            >
                            </Input>
                        </div>

                        <div className="mb-3">
                            <Input
                                className="form-check-input"
                                type="checkbox"
                                id="auth-remember-check"
                                name='certificate'
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.certificate}
                            />
                            <Label htmlFor="certificate" className="form-label ms-2">Presento certificado</Label>
                        </div>

                        <div className='text-end'>
                            <Button color='outline-info' className='me-2' onClick={() => closeModal()} type='button'>Cerrar</Button>
                            <Button color="info" type='submit'>Solicitar</Button>
                        </div>
                    </Form>



                </ModalBody>
            </Modal>

        </React.Fragment>
    );
}
export default Reincorporation