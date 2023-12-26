import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AccordionItem, Collapse, Accordion, Card, Col, Container, Row, CardBody, } from 'reactstrap';
import classnames from "classnames";
import macroPayment from '../../../assets/images/IES/macro-payment.png'
import { getPaymentMethod as onGetPaymentMethod } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

const PaymentMethods = () => {
    document.title = "IES - Formas de pago";
    const dispatch = useDispatch()

    const { creditCards, promissoryNotes, paycheck, error } = useSelector((state) => ({
        creditCards: state.PaymentMethod.method.creditCards,
        promissoryNotes: state.PaymentMethod.method.promissoryNotes,
        paycheck: state.PaymentMethod.method.paycheck,
        error: state.VirtualLibrary.errorMsg,
    }));

    useEffect(() => {
        dispatch(onGetPaymentMethod())
    }, [dispatch]);

    const [borderCol1, setborderCol1] = useState(true);
    const [borderCol2, setborderCol2] = useState(true);

    const t_borderCol1 = () => {
        setborderCol1(!borderCol1);

    };

    const t_borderCol2 = () => {
        setborderCol2(!borderCol2);

    };


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <h4>FORMAS DE PAGO</h4>


                    <Row>
                        <Col xs={12} className='mb-2'>
                            <p className='text-muted'>
                                Formas y medios de pago para los aranceles de las asignaturas del semestre
                            </p>
                        </Col>
                        <Col md={8} className='mb-3' >
                            <Accordion className="custom-accordionwithicon custom-accordion-border accordion-border-box accordion-success" id="accordionBordered">
                                <AccordionItem>
                                    <h2 className="accordion-header" id="accordionborderedExample1">
                                        <button
                                            className={classnames("accordion-button fw-semibold", { collapsed: !borderCol1 })} type="button" onClick={t_borderCol1} style={{ cursor: "pointer" }} >
                                            Contado
                                        </button>
                                    </h2>
                                    <Collapse isOpen={borderCol1} className="accordion-collapse" id="accor_borderedExamplecollapse1" >
                                        <div className="accordion-body">
                                            <ul className='mb-0'>
                                                <li>Aboná en Rapipago o Pago fácil ya sea en sucursales físicas o de forma online.</li>

                                                <li>Pagosmiscuentas.com</li>
                                                <li>Cheque al dia a nombre de PERSPECTIVAS S.A.</li>
                                                <li>
                                                    Transferencia bancaria
                                                    <ul>
                                                        <li>BANCO MACRO | CBU 2850301930000000371446 | Cuenta Nº 3-301-0000003714-4</li>
                                                        <li>BANCO DE CÓRDOBA | CBU 0200900501000005377517 | Cuenta Corriente 5-3775/1</li>
                                                        <li>BANCO DE LA NACIÓN ARGENTINA | CBU 0110213220021300617082 | Cuenta Corriente 21300617/08</li>
                                                    </ul>
                                                </li>









                                            </ul>
                                        </div>
                                    </Collapse>
                                </AccordionItem>
                                <AccordionItem>
                                    <h2 className="accordion-header" id="accordionborderedExample2">
                                        <button
                                            className={classnames("accordion-button fw-semibold", { collapsed: !borderCol2 })} type="button" onClick={t_borderCol2} style={{ cursor: "pointer" }} >
                                            Financiado
                                        </button>
                                    </h2>
                                    <Collapse isOpen={borderCol2} className="accordion-collapse" id="accor_borderedExamplecollapse2" >
                                        <div className="accordion-body">
                                            <div className='mb-3'>
                                                {
                                                    paycheck &&
                                                    <p>{paycheck.description} de pago diferido a nombre de PERSPECTIVAS S.A. Hasta 6 pagos  ({paycheck.surcharge}% de interés).</p>
                                                }
                                            </div>


                                            <div>
                                                <p>TARJETA DE CRÉDITO (1 cuota sin interés)</p>

                                                <ul>
                                                    {
                                                        creditCards && creditCards.length > 0 &&
                                                        creditCards.map((item, index) => (
                                                            <>

                                                                {item.card === 'NARANJA' ?
                                                                    <li><strong>{item.card} X:</strong> Plan Z o 6 pagos ({item.surcharge}% de interés).</li>
                                                                    :
                                                                    <li key={index}><strong>{item.card}:</strong> Hasta 6 pagos ({item.surcharge}% de interés).</li>
                                                                }
                                                            </>
                                                        ))
                                                    }


                                                </ul>
                                            </div>

                                            <div>
                                                {
                                                    promissoryNotes &&
                                                    <p>{promissoryNotes.description} (Hasta 6 pagos con {promissoryNotes.surcharge}% de interés).</p>
                                                }
                                                <p><strong>Requisitos:</strong></p>
                                                <ul>
                                                    <li>Presentar el DNI, original y fotocopia.</li>
                                                    <li>Presentar los últimos dos recibos de sueldo, originales y fotocopias.</li>
                                                    <li>En caso de ser Monotributista, deberá presentar los últimos 2 pagos del Monotributo, originales y fotocopias.</li>
                                                    <li>Para el caso de ser Responsable Inscripto, deberá presentar la última DDJJ.</li>
                                                    <li>Firma certificada Banco, Policía, Escribano o Juez de Paz.</li>
                                                </ul>
                                            </div>


                                            <div>
                                                <p>Sujeto a Verificación de Riesgo Crediticio.</p>
                                            </div>



                                        </div>
                                    </Collapse>
                                </AccordionItem>
                            </Accordion>
                        </Col>
                        <Col md={4} >

                            <Row>
                                <Col xs={12}>
                                    <Link to={'/ies/materias/boton-de-pago'}>
                                        <Card>
                                            <CardBody>
                                                <div alt="" className="mb-3">
                                                    <img src={macroPayment} alt="payment" style={{ width: '30%' }} />
                                                </div>
                                                <p className="card-title mb-2 ies-textgray">Macro click de pagos</p>
                                                <p className="ies-textsimple mb-3">
                                                    Pagar online tus asignaturas con Debin y Tarjetas de Crédito y Débito de cualquier Banco y de casi todas las marcas.
                                                </p>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                </Col>
                                <Col xs={12}>
                                    <Link to={'/ies/materias/generar-boleta-pago'}>
                                        <Card>
                                            <CardBody>
                                                <div alt="" className="mb-3 avatar-sm img-thumbnail ies-aliceblue ies-color d-flex align-items-center justify-content-around" style={{ width: '60px', height: '60px', border: 'none' }}>
                                                    <i className="las la-file-invoice" style={{ fontSize: '30px' }}></i>
                                                </div>
                                                <p className="card-title mb-2 ies-textgray">Rapi pago - Pago fácil</p>
                                                <p className="ies-textsimple mb-3">
                                                    Seleccioná las asignaturas preinscriptas y descargá tu boleta para abonar por Rapi Pago o Pago Fácil.
                                                </p>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                </Col>
                                <Col xs={12}>
                                    <Link to={'/ies/materias/pagare'}>
                                        <Card>
                                            <CardBody>
                                                <div alt="" className="mb-3 avatar-sm img-thumbnail ies-aliceblue ies-color d-flex align-items-center justify-content-around" style={{ width: '60px', height: '60px', border: 'none' }}>
                                                    <i className="las la-file-invoice" style={{ fontSize: '30px' }}></i>
                                                </div>
                                                <p className="card-title mb-2 ies-textgray">Pagaré</p>
                                                <p className="ies-textsimple mb-3">
                                                    Financiá tus asignaturas en hasta 6 cuotas a pagar mes a mes.
                                                </p>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                </Col>
                                <Col xs={12}>
                                    <Link to={'/ies/materias/tarjeta-credito'}>
                                        <Card>
                                            <CardBody >
                                                <div alt="" className="mb-3 avatar-sm img-thumbnail ies-aliceblue ies-color d-flex align-items-center justify-content-around" style={{ width: '60px', height: '60px', border: 'none' }}>
                                                    <i className="las la-credit-card" style={{ fontSize: '30px' }}></i>
                                                </div>
                                                <p className="card-title mb-2 ies-textgray">Tarjeta de crédito</p>
                                                <p className="ies-textsimple mb-3">
                                                    Ingrese sus datos y nosotros nos encargamos de procesar el pago.
                                                </p>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </Container>



            </div>
        </React.Fragment>
    );
}
export default PaymentMethods