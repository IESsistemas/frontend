import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardFooter, Col, Container, FormFeedback, Input, Label, Form, Modal, ModalBody, ModalHeader, OffcanvasBody, Row, Table } from 'reactstrap';
import { postPaymentButton as onPostPaymentButton } from '../../../store/actions';
import { useFormik } from 'formik';
import * as Yup from "yup";
import withRouter from '../../../Components/Common/withRouter';

const PaymentButton = (props) => {
    document.title = "IES - Boleta de pago";
    const dispatch = useDispatch()
    const voucher = true

    //const career = JSON.parse(localStorage.getItem('careerSelected'))

    const { user, career, error, result} = useSelector((state) => ({
        user: state.Login.userData.data,
        error: state.AcademicSchedule.errorMsg,
        result: state.PaymentButton.result,
        career: state.Login.carrerSelected,
    }));


    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            amount: 0,
        },
        validationSchema: Yup.object().shape({
            amount: Yup.number().required('Por favor, completar este campo.'),
        }),
        onSubmit: (values) => {
            dispatch(onPostPaymentButton(values, props.router.navigate))
        }
    });
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <h4>PAGOS EXCLUSIVOS CLIENTES BANCO MACRO</h4>

                    <Row>
                        <Col xs="12">

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
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-4" >
                        <Col sm="7" xs="12">
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
                                        <Row>
                                            <Col sm="6" xs="12" className="mb-3">
                                                <Label htmlFor="lastName" className="form-label">Importe a pagar</Label>
                                                <Input
                                                    type="number"
                                                    className="form-control"
                                                    aria-label="Escribir información"
                                                    name="amount"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.amount || ""}
                                                    invalid={
                                                        validation.touched.amount && validation.errors.amount ? true : false
                                                    }
                                                    placeholder='$000.00'
                                                />
                                                {validation.touched.amount && validation.errors.amount ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.amount}</div></FormFeedback>
                                                ) : null}
                                            </Col>

                                        </Row>
                                    </CardBody>
                                    <CardFooter>
                                        <Row>
                                            <Col className='text-end'>
                                                <Button color='primary' type='submit'>Ir a pagar</Button>
                                            </Col>
                                        </Row>
                                    </CardFooter>
                                 </Form> 

                            </Card>
                        </Col>

                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="7" xs="12">
                            <Alert color="info">
                                Al ingresar el valor a pagar y hacer click en el botón, te redireccionaremos al botón de pago de Macro para que puedas finalizar tu transacción.
                            </Alert>
                        </Col>
                    </Row>


                </Container>
            </div>
        </React.Fragment>
    );
}
export default withRouter(PaymentButton);