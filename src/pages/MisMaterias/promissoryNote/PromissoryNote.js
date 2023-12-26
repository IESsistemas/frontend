import React, { useState, useEffect } from "react";
import { Col, Container, Row, Badge, Table, Modal, Alert, CardFooter, Card, Input, CardHeader, CardBody, Label, Button, ModalBody, ModalHeader, FormFeedback, Form } from "reactstrap";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getPromissoryNote as onGetPromissoryNote, postPromissoryNote as onPostPromissoryNote, getPaymentMethod as onGetPaymentMethod } from '../../../store/actions';
import * as Yup from "yup";
import withRouter from '../../../Components/Common/withRouter';
import { useFormik } from "formik";

const PromissoryNote = (props) => {
    document.title = "IES - Generación e impresión de pagarés";
    const dispatch = useDispatch()


    const [isModalOpen, setIsModalOpen] = useState(false);

    /*  function tog_center() {
         setmodal_center(!modal_center);
     } */

     //const career = JSON.parse(localStorage.getItem('careerSelected'))

    const { user, error, carrer, promissoryNote, creditCard, percentage } = useSelector((state) => ({
        user: state.Login.userData.data,
        error: state.AcademicSchedule.errorMsg,
        promissoryNote: state.PromissoryNote.promissoryNote,
        percentage: state.PaymentMethod.method.promissoryNotes,
        carrer: state.Login.carrerSelected,
    }));

    useEffect(() => {
        if (carrer && carrer.ID_CARRERA) {
            dispatch(onGetPromissoryNote(carrer.ID_CARRERA))
        }
        dispatch(onGetPaymentMethod())
    }, [dispatch]);

    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            lastName: user ? `${user.apellidos}` : '',
            name: user ? `${user.nombres}` : '',
            applicantDni: user ? `${user.dni}` : '',
            phone: '',
            address: '',
            location: '',
            promissoryNoteQuantity: '',

        },
        validationSchema: Yup.object().shape({
            lastName: Yup.string().required('Por favor, completar este campo.'),
            name: Yup.string().required('Por favor, completar este campo.'),
            applicantDni: Yup.string().required('Por favor, completar este campo.'),
            phone: Yup.string().required('Por favor, completar este campo.'),
            address: Yup.string().required('Por favor, completar este campo.'),
            location: Yup.string().required('Por favor, completar este campo.'),
            promissoryNoteQuantity: Yup.string().required('Por favor, completar este campo.'),
        }),
        onSubmit: () => {
            setIsModalOpen(true)
        }
    });

    let sumaValor = 0;

    for (const elemento of promissoryNote) {
        let valor = 0 
        valor += elemento.Valor;



        sumaValor += valor;
    }

    return (
        <React.Fragment>
            <Modal
                isOpen={isModalOpen}
                toggle={() => setIsModalOpen(false)}
                centered
            >
                <ModalHeader toggle={() => setIsModalOpen(false)}></ModalHeader>
                <ModalBody className="text-center">
                    <p> Se generarán {validation.values.promissoryNoteQuantity} pagarés para abonar asignaturas </p>
                    <button
                        className="btn btn-success mt-4"
                        onClick={() => {
                            dispatch(onPostPromissoryNote(validation.values, props.router.navigate));
                            setIsModalOpen(false);
                        }}
                    >
                        Aceptar
                    </button>
                </ModalBody>
            </Modal>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col md={4} xs={12}>
                            <h4>GENERACIÓN E IMPRESIÓN DE PAGARÉS</h4><br />
                        </Col>

                        <Col md={6} xs={12}>
                            <Alert className="alert alert-info">
                                Para generar pagarés de las asignaturas preinscriptas a la modalidad Presencial concurrir personalmente a Rondeau 165.
                            </Alert>
                        </Col>

                    </Row>
                    {
                        promissoryNote && promissoryNote.length > 0 ?
                            <>


                                <Row className="justify-content-center ">
                                    <Col md="10" xs="12" className='mt-3'>
                                        <Card className="ies-shadow1">
                                            <Table className="align-middle table-nowrap mb-0 ies-tablelegajo">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Asignatura</th>
                                                        <th scope="col">Extensión</th>
                                                        <th scope="col">Modalidad</th>
                                                        <th scope="col">Puntos</th>
                                                        <th scope="col">Valor</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ backgroundColor: "white" }}>
                                                    {
                                                        promissoryNote && promissoryNote.length && promissoryNote.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.MATERIA}</td>
                                                                <td>{item.CTRO_EXT}</td>
                                                                <td>{item.MODALIDAD}</td>
                                                                <td>{item.Puntos}</td>
                                                                <td>${(item.Valor).toFixed(2)}</td>
                                                            </tr>

                                                        ))
                                                    }
                                                </tbody>
                                            </Table>
                                        </Card>

                                        <Card className="mt-4">
                                            <CardHeader>
                                                <p className="mb-0">Verifique sus datos y seleccione el certificado a solicitar</p>
                                            </CardHeader>
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                className="needs-validation" action="#">
                                                <CardBody>

                                                    <Row>
                                                        <Col md="4" sm="6" xs="12" className="mb-3">
                                                            <Label htmlFor="lastName" className="form-label">Apellido</Label>
                                                            <Input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Escribir información"
                                                                name="lastName"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.lastName || ""}
                                                                invalid={
                                                                    validation.touched.lastName && validation.errors.lastName ? true : false
                                                                }
                                                                disabled
                                                            />
                                                            {validation.touched.lastName && validation.errors.lastName ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.lastName}</div></FormFeedback>
                                                            ) : null}
                                                        </Col>
                                                        <Col md="4" sm="6" xs="12" className="mb-3">
                                                            <Label htmlFor="name" className="form-label">Nombre</Label>
                                                            <Input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Escribir información"
                                                                name="name"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.name || ""}
                                                                invalid={
                                                                    validation.touched.name && validation.errors.name ? true : false
                                                                }
                                                                disabled
                                                            />
                                                            {validation.touched.name && validation.errors.name ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.name}</div></FormFeedback>
                                                            ) : null}
                                                        </Col>
                                                        <Col md="4" sm="6" xs="12" className="mb-3">
                                                            <Label htmlFor="applicantDni" className="form-label">DNI</Label>
                                                            <Input
                                                                type="number"
                                                                className="form-control"
                                                                aria-label="Escribir información"
                                                                name="applicantDni"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.applicantDni || ""}
                                                                invalid={
                                                                    validation.touched.applicantDni && validation.errors.applicantDni ? true : false
                                                                }
                                                                disabled
                                                            />
                                                            {validation.touched.applicantDni && validation.errors.applicantDni ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.applicantDni}</div></FormFeedback>
                                                            ) : null}
                                                        </Col>
                                                        <Col md="4" sm="6" xs="12" className="mb-3">
                                                            <Label htmlFor="phone" className="form-label">Teléfono</Label>
                                                            <Input
                                                                type="number"
                                                                className="form-control"
                                                                aria-label="Escribir información"
                                                                name="phone"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.phone || ""}
                                                                invalid={
                                                                    validation.touched.phone && validation.errors.phone ? true : false
                                                                }
                                                            />
                                                            {validation.touched.phone && validation.errors.phone ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.phone}</div></FormFeedback>
                                                            ) : null}
                                                        </Col>

                                                        <Col md="4" sm="6" xs="12" className="mb-3">
                                                            <Label htmlFor="address" className="form-label">Domicilio</Label>
                                                            <Input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Escribir información"
                                                                name="address"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.address || ""}
                                                                invalid={
                                                                    validation.touched.address && validation.errors.address ? true : false
                                                                }
                                                            />
                                                            {validation.touched.address && validation.errors.address ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.address}</div></FormFeedback>
                                                            ) : null}
                                                        </Col>
                                                        <Col md="4" sm="6" xs="12" className="mb-3">
                                                            <Label htmlFor="location" className="form-label">Localidad</Label>
                                                            <Input
                                                                type="text"
                                                                className="form-control"
                                                                aria-label="Escribir información"
                                                                name="location"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.location || ""}
                                                                invalid={
                                                                    validation.touched.location && validation.errors.location ? true : false
                                                                }
                                                            />
                                                            {validation.touched.location && validation.errors.location ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.location}</div></FormFeedback>
                                                            ) : null}
                                                        </Col>
                                                        <Col md="4" sm="6" xs="12" className="mb-3">
                                                            <Label htmlFor="promissoryNoteQuantity" className="form-label">Pagarés a generar</Label>
                                                            <Input
                                                                type="select"
                                                                className="form-control"
                                                                aria-label="Escribir información"
                                                                name="promissoryNoteQuantity"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.promissoryNoteQuantity || ""}
                                                                invalid={
                                                                    validation.touched.promissoryNoteQuantity && validation.errors.promissoryNoteQuantity ? true : false
                                                                }
                                                            >
                                                                <option >Selecciona una opción</option>
                                                                <option value={1}>1 pagaré</option>
                                                                <option value={2}>2 pagarés</option>
                                                                <option value={3}>3 pagarés</option>
                                                                <option value={4}>4 pagarés</option>
                                                                <option value={5}>5 pagarés</option>
                                                                <option value={6}>6 pagarés</option>

                                                            </Input>

                                                            {validation.touched.promissoryNoteQuantity && validation.errors.promissoryNoteQuantity ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.promissoryNoteQuantity}</div></FormFeedback>
                                                            ) : null}
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                                <CardFooter>

                                                    <Row className="aling-item-center">
                                                        <Col className="m-auto" md={6} xs={12}>
                                                            <p className="text-primary"> <b>Monto a abonar: </b>
                                                                ${sumaValor.toFixed(2)}
                                                            </p>
                                                        </Col>
                                                        <Col md={6} xs={12}>
                                                            <div className="text-end">
                                                                <Link to="/ies/yoenies"><button color="info" className="btn btn-outline-info ies_mr10">Cancelar</button></Link>
                                                                <button className="btn btn-success" type="submit">Generar</button>
                                                            </div>
                                                        </Col>
                                                    </Row>


                                                </CardFooter>
                                            </Form>
                                        </Card>

                                        <Alert className="alert alert-info mt-4">
                                            Los pagarés se generarán sobre el total de las asignaturas + {percentage && percentage.surcharge}% de recargo.
                                            El valor no incluye matrícula ni derecho de exámen.
                                        </Alert>
                                    </Col>
                                </Row>
                            </>
                            :
                            <Row className="justify-content-center">
                                <Col md="10" xs="12" className='mt-3'>
                                    <Alert className="alert alert-danger">
                                        ¡Aún no tienes asignaturas preinscriptas!
                                    </Alert>

                                </Col>
                            </Row>

                    }

                </Container>

            </div>
        </React.Fragment>
    );
};

export default withRouter(PromissoryNote);