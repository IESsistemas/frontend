import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, FormFeedback, Modal, Alert, CardFooter, Card, Input, CardHeader, CardBody, Label, Button, ModalBody, ModalHeader, Collapse, Accordion, AccordionItem } from "reactstrap";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
/* import { getPromissoryNote as onGetPromissoryNote } from '../../../store/actions'; */
import classnames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getPaymentMethod as onGetPaymentMethod, postCreditCard as onPostCreditCard, getPaymentsPending as onGetPaymentsPending, getRejectedCard as onGetRejectedCard } from '../../../store/actions';
import withRouter from '../../../Components/Common/withRouter';
import { format } from 'date-fns';
const CreditCard = (props) => {
    document.title = "IES - Generación e impresión de pagarés";
    const dispatch = useDispatch()

    const pending = true
    const refused = false


    const { user, error, carrer, creditCardSuccess, creditCard, paymentPending, rejectedCard } = useSelector((state) => ({
        user: state.Login.userData.data,
        error: state.AcademicSchedule.errorMsg,
        creditCard: state.PaymentMethod.method.creditCards,
        creditCardSuccess: state.CreditCard.success,
        carrer: state.Login.carrerSelected,
        paymentPending: state.CreditCard.paymentPending,
        rejectedCard: state.CreditCard.rejectedCard
    }));

    useEffect(() => {
        dispatch(onGetPaymentMethod())
        dispatch(onGetPaymentsPending())
        dispatch(onGetRejectedCard())
    }, [dispatch]);

    const [col1, setcol1] = useState(true);
    const [col2, setcol2] = useState(false);


    const t_col1 = () => {
        setcol1(!col1);
    };

    const t_col2 = () => {
        setcol2(!col2);
    };


    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            cardholder: '',
            phoneNumber: '',
            idCard: '',
            numberCard: '',
            cardExpiration: '',
            verificationCode: '',
            paymentAmount: '',
            installments: ''
        },
        validationSchema: Yup.object().shape({
            cardholder: Yup.string().required('Por favor, completar este campo.'),
            phoneNumber: Yup.string().max(12, 'Debe tener máximo 12 caracteres').required('Por favor, completar este campo.'),
            idCard: Yup.string().required('Por favor, completar este campo.'),
            numberCard: Yup.string().max(16, 'Debe tener máximo 16 caracteres').required('Por favor, completar este campo.'),
            cardExpiration: Yup.string().max(5, 'Debe tener máximo 5 caracteres').required('Por favor, completar este campo.'),
            verificationCode: Yup.string().max(3, 'Debe tener máximo 3 caracteres').required('Por favor, completar este campo.'),
            paymentAmount: Yup.string().required('Por favor, completar este campo.'),
            installments: Yup.string().required('Por favor, completar este campo.'),


        }),
        onSubmit: (values) => {
            //tog_center()
            dispatch(onPostCreditCard(values, props.router.navigate));

        }
    });


    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xs={12}>
                            <h4>PAGO CON TARJETA DE CRÉDITO</h4><br />
                        </Col>


                    </Row>

                    <Row className="justify-content-center ">
                        <Col md={10} xs={12}>
                            {
                                creditCardSuccess ?
                                    <Alert className="alert alert-green">
                                        <b>¡Felicidades!</b> Tu información de pago se ha enviado exitosamente.
                                    </Alert>
                                    :
                                    <Alert className="alert alert-info">
                                        Información para realizar pagos con Tarjeta de Crédito

                                        <ul>
                                            <li>
                                                Los Sitios Seguros con certificados SSL utilizan la más alta tecnología en comunicaciones seguras y SSl de 256 bits. Esto permite que la transacción entre Servidor de IES y el Navegador de su PC (IE,Firefox) se haga por un canal seguro de manera que la información intercambiada no pueda ser interseptada ni leída.
                                            </li>
                                            <li>
                                                Deberá aparecer en la barra de estado de su navegador, un candado que significa una transacción segura.
                                            </li>
                                        </ul>


                                    </Alert>
                            }
                        </Col>
                        <Col md="10" xs="12" >
                            <Card className="">
                                <CardHeader>
                                    <p className="mb-0">Complete los datos del formulario y nosotros procesaremos el pago.</p>
                                </CardHeader>
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
                                            <Col md="4" sm="6" xs="12" className="mb-3">
                                                <Label htmlFor="apellido" className="form-label">Alumno</Label>
                                                <Input
                                                    type="input"
                                                    className="form-control"
                                                    aria-label="Escribir información"
                                                    name="alumno"
                                                    value={user ? `${user.apellidos} ${user.nombres} ` : ''}
                                                    disabled
                                                />

                                            </Col>
                                            <Col md="4" sm="6" xs="12" className="mb-3">
                                                <Label htmlFor="nombre" className="form-label">DNI</Label>
                                                <Input
                                                    type="input"
                                                    className="form-control"
                                                    aria-label="Escribir información"
                                                    name="dni"
                                                    value={user ? `${user.dni}` : ''}

                                                    disabled
                                                />
                                            </Col>
                                            <Col md="4" sm="6" xs="12" className="mb-3">
                                                <Label htmlFor="cardholder" className="form-label">Nombre y apellido del titular</Label>
                                                <Input
                                                    type="input"
                                                    className="form-control"
                                                    aria-label="Escribir información"
                                                    name="cardholder"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.cardholder || ""}
                                                    invalid={
                                                        validation.touched.cardholder && validation.errors.cardholder ? true : false
                                                    }
                                                />
                                                {validation.touched.cardholder && validation.errors.cardholder ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.cardholder}</div></FormFeedback>
                                                ) : null}
                                            </Col>
                                            <Col md="4" sm="6" xs="12" className="mb-3">
                                                <Label htmlFor="phoneNumber" className="form-label">Teléfono del titular</Label>
                                                <Input
                                                    type="number"
                                                    className="form-control"
                                                    aria-label="Escribir información"
                                                    name="phoneNumber"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.phoneNumber || ""}
                                                    invalid={
                                                        validation.touched.phoneNumber && validation.errors.phoneNumber ? true : false
                                                    }
                                                />
                                                {validation.touched.phoneNumber && validation.errors.phoneNumber ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.phoneNumber}</div></FormFeedback>
                                                ) : null}
                                            </Col>

                                            <Col md="4" sm="6" xs="12" className="mb-3">
                                                <Label htmlFor="idCard" className="form-label">Tarjeta</Label>
                                                <Input
                                                    type="select"
                                                    className="form-control"
                                                    aria-label="Escribir información"
                                                    name="idCard"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.idCard || ""}
                                                    invalid={
                                                        validation.touched.idCard && validation.errors.idCard ? true : false
                                                    }
                                                >
                                                    <option>Selecciona una opción</option>
                                                    {creditCard && creditCard.length > 0 ? (
                                                        creditCard.map((creditCard, index) => (
                                                            <option key={index} value={Number(creditCard.id)}>
                                                                <span>
                                                                    {creditCard.card}:
                                                                    {
                                                                        creditCard.card === 'NARANJA' ?
                                                                            ` Plan Z o 6 pagos (${creditCard.surcharge}% de interés).`
                                                                            :
                                                                            ` Hasta 6 pagos (${creditCard.surcharge}% de interés).`
                                                                    }
                                                                </span>
                                                            </option>
                                                        ))
                                                    ) : ""}
                                                </Input>
                                                {validation.touched.idCard && validation.errors.idCard ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.idCard}</div></FormFeedback>
                                                ) : null}
                                            </Col>
                                            <Col md="4" sm="6" xs="12" className="mb-3">
                                                <Label htmlFor="numberCard" className="form-label">N° de tarjeta</Label>
                                                <Input
                                                    type="number"
                                                    className="form-control"
                                                    aria-label="Escribir información"
                                                    name="numberCard"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.numberCard || ""}
                                                    invalid={
                                                        validation.touched.numberCard && validation.errors.numberCard ? true : false
                                                    }
                                                />
                                                {validation.touched.numberCard && validation.errors.numberCard ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.numberCard}</div></FormFeedback>
                                                ) : null}
                                            </Col>
                                            <Col md="3" sm="6">
                                                <Label htmlFor="cardExpiration" className="form-label">Vto.</Label>
                                                <Input
                                                    type="number"
                                                    className="form-control"
                                                    aria-label="Escribir información"
                                                    name="cardExpiration"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.cardExpiration || ""}
                                                    invalid={
                                                        validation.touched.cardExpiration && validation.errors.cardExpiration ? true : false
                                                    }
                                                />
                                                {validation.touched.cardExpiration && validation.errors.cardExpiration ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.cardExpiration}</div></FormFeedback>
                                                ) : null}
                                            </Col>
                                            <Col md="3" sm="6">
                                                <Label htmlFor="verificationCode" className="form-label">Código de seguridad</Label>
                                                <Input
                                                    type="number"
                                                    className="form-control"
                                                    aria-label="Escribir información"
                                                    name="verificationCode"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.verificationCode || ""}
                                                    invalid={
                                                        validation.touched.verificationCode && validation.errors.verificationCode ? true : false
                                                    }
                                                />
                                                {validation.touched.verificationCode && validation.errors.verificationCode ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.verificationCode}</div></FormFeedback>
                                                ) : null}
                                            </Col>
                                            <Col md="3" sm="6">
                                                <Label htmlFor="paymentAmount" className="form-label">Monto a abonar</Label>
                                                <Input
                                                    type="number"
                                                    className="form-control"
                                                    aria-label="Escribir información"
                                                    name="paymentAmount"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.paymentAmount || ""}
                                                    invalid={
                                                        validation.touched.paymentAmount && validation.errors.paymentAmount ? true : false
                                                    }
                                                />
                                                {validation.touched.paymentAmount && validation.errors.paymentAmount ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.paymentAmount}</div></FormFeedback>
                                                ) : null}
                                            </Col>
                                            <Col md="3" sm="6">
                                                <Label htmlFor="installments" className="form-label">Cantidad de cuotas</Label>
                                                <Input
                                                    type="select"
                                                    className="form-control"
                                                    aria-label="Escribir información"
                                                    name="installments"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.installments || ""}
                                                    invalid={
                                                        validation.touched.installments && validation.errors.installments ? true : false
                                                    }
                                                >
                                                    <option>Selecciona una opción</option>
                                                    {
                                                        validation.values.idCard === '2' ?
                                                            <>
                                                                <option value={1}>1 Cuota</option>
                                                                <option value={2}>5 Cuotas</option>
                                                                <option value={6}>6 Cuotas</option>
                                                                <option value={0}>Plan Z</option>
                                                            </>
                                                            :
                                                            <>
                                                                <option value={1}>1 Cuota</option>
                                                                <option value={2}>2 Cuotas</option>
                                                                <option value={3}>3 Cuotas</option>
                                                                <option value={4}>4 Cuotas</option>
                                                                <option value={5}>5 Cuotas</option>
                                                                <option value={6}>6 Cuotas</option>
                                                            </>
                                                    }

                                                </Input>

                                                {validation.touched.installments && validation.errors.installments ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.installments}</div></FormFeedback>
                                                ) : null}
                                            </Col>

                                        </Row>
                                    </CardBody>
                                    <CardFooter>
                                        <Row className="aling-item-center">
                                            <Col md={6} xs={12}>
                                                <p className="text-primary"> <b>Monto a abonar: </b>
                                                    ${validation.values.paymentAmount}
                                                </p>
                                            </Col>
                                            <Col md={6} xs={12}>
                                                <div className="text-end">
                                                    <Link to="/ies/yoenies"><button color="info" className="btn btn-outline-info ies_mr10">Cancelar</button></Link>
                                                    <button className="btn btn-success" type="submit">Enviar </button>
                                                </div>
                                            </Col>
                                        </Row>


                                    </CardFooter>
                                </Form>
                            </Card>


                        </Col>
                        <Col md="10" xs="12">
                            <Accordion className="custom-accordionwithicon custom-accordion-border accordion-border-box accordion-success mt-2" id="default-accordion-example">
                                <AccordionItem>
                                    <h2 className="accordion-header" id="headingOne">
                                        <button
                                            className={classnames("accordion-button fw-semibold", { collapsed: !col1 })} type="button" onClick={t_col1} style={{ cursor: "pointer" }} >
                                            Pagos pendientes de procesar
                                        </button>
                                    </h2>

                                    <Collapse isOpen={col1} className="accordion-collapse" id="collapseOne" >
                                        <div className="accordion-body">
                                            {
                                                paymentPending && paymentPending.length > 0 ?

                                                    paymentPending.map((item, index) => (
                                                        <p key={index}>
                                                           - ${`${item.Importe} enviado el día  ${format(new Date(item.FechaCarga), 'dd-MM-yyyy')
                                                                }.`}
                                                        </p>
                                                    ))
                                                    :
                                                    <p>No posee pagos pendientes de procesar.</p>
                                            }

                                        </div>
                                    </Collapse>
                                </AccordionItem>
                                <AccordionItem>
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button
                                            className={classnames("accordion-button fw-semibold", { collapsed: !col2 })} type="button" onClick={t_col2} style={{ cursor: "pointer" }} >
                                            Pagos rechazados
                                        </button>
                                    </h2>

                                    <Collapse isOpen={col2} className="accordion-collapse" >
                                        <div className="accordion-body">
                                            {
                                                rejectedCard && rejectedCard.length > 0 ?
                                                    rejectedCard.map((item, index) => {
                                                        <p key={index}>
                                                            ${`${item.Importe} enviado el día  ${format(new Date(item.FechaCarga), 'dd-MM-yyyy')
                                                                }.`}
                                                        </p>
                                                    })
                                                    :
                                                    <p>No posee pagos rechazados.</p>
                                            }
                                        </div>
                                    </Collapse>
                                </AccordionItem>

                            </Accordion>
                        </Col>
                        <Col xs={12}>

                        </Col>
                    </Row>
                </Container>

            </div>
        </React.Fragment>
    );
};

export default withRouter(CreditCard);
