import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, Col, Container, Input, Label, Modal, ModalBody, ModalHeader, OffcanvasBody, Row, Table } from 'reactstrap';

import logo from "../../../assets/images/ieslogo.jpg";
import rapipago from "../../../assets/images/rapipago.jpg";
import pagofacil from "../../../assets/images/pagofacil.jpg";
import ticket_1 from "../../../assets/images/ticket_1.jpg";
import ticket_2 from "../../../assets/images/ticket_2.jpg";
import { useSelector } from 'react-redux';
import Barcode from 'react-barcode';
const VoucherPrint = () => {
    document.title = "IES - Boleta de pago";

    const [amount, setAmount] = useState(localStorage.getItem("amount"));

    const { student, barcode, user} = useSelector((state) => ({
        student: state.Rapipago.data.studentData,
        barcode: state.Rapipago.barcode.code,
        user: state.Login.userData.data
    }));

    const handlePrint = () => {
        window.print();
    };


    return (
        <React.Fragment>
            <Container fluid>
{/*                 {
                    student && barcode ? */}

                        <Row className="justify-content-center ">
                            <Col md="8" xs="12" className='mt-3'>
                                <div className="text-end">
                                    <Button color='info' className='me-2' onClick={handlePrint}>Imprimir</Button>
                                </div>
                                <Col md="12" className='mt-2'>
                                    <Card>
                                        <CardBody>
                                            <table className="table table-borderless">
                                                <tbody>
                                                    <tr className='border'>
                                                        <td colSpan="6" className="text-center">
                                                            <img src={logo} className=" m-auto mt-2 mb-2" alt="logo" />
                                                        </td>
                                                        <td colSpan="6" className="text-center" style={{ 'margin-top': '15px' }}>
                                                            <h5>IES Siglo 21 COLEGIO UNIVERSITARIO</h5>
                                                            <p className='mb-0'>Buenos Aires 563 - Tel./Fax: (0351)</p>
                                                            <p className='mb-0'>421-1717 - Córdoba</p>
                                                            <p className='mb-0'>I.V.A. EXENTO - C.U.I.T: 30-60225979-6</p>
                                                        </td>
                                                    </tr>
                                                    <tr className='border'>
                                                        {
                                                            student ?
                                                            <td colSpan="12" className="my-4">
                                                                <p className='mb-0'><b>Nombre del alumno:</b>{student.APELLIDOS ? student.APELLIDOS : user.apellidos}, {student.NOMBRES ? student.NOMBRES : user.nombres}</p>
                                                                <p className='mb-0'><b>DNI:</b> {student.Num_Doc ? student.Num_Doc : user.dni}</p>
                                                                <p className='mb-0'><b>IMPORTE</b> $ {amount}</p>
                                                            </td>
                                                            :
                                                            <td colSpan="12" className="my-4">
                                                                <p className='mb-0'><b>Nombre del alumno:</b>{user.apellidos}, {user.nombres}</p>
                                                                <p className='mb-0'><b>DNI:</b> {user.dni}</p>
                                                                <p className='mb-0'><b>IMPORTE</b> $ {amount}</p>
                                                            </td>
                                                        }
                                                    </tr>
                                                    <tr className='border'>
                                                        <td colSpan="12" className="text-center">
                                                            <p className='mb-0 mt-3'>Podés pagar esta boleta en cualquiera de las sucursales de RAPIPAGO o PAGO FÁCIL.</p>

                                                            <tr className='d-flex justify-content-center'>
                                                                <td colSpan="6">
                                                                    <img src={rapipago} className="" alt="rapipago" width="135px" />
                                                                </td>
                                                                <td colSpan="6">
                                                                    <img src={pagofacil} className=" m-auto mt-2 mb-2" alt="pagofacil" height="50px" />
                                                                </td>
                                                            </tr>
                                                            <p className='mb-3'>Verificar los datos y completar el monto a pagar (*)</p>
                                                        </td>
                                                    </tr>
                                                    <tr className='border'>

                                                        <td colSpan="12" className="text-center">

                                                            <Barcode value={barcode} />



                                                            <p className='mb-0 mt-3'>Debido a inconvenientes con los pagos realizados en Pago Fácil, te recordamos que SIEMPRE DEBERÁS VERIFICAR LA IMPUTACIÓN DEL PAGO.</p>

                                                            <tr className='d-flex justify-content-center'>
                                                                <td colSpan="6">
                                                                    <img src={ticket_1} className="" alt="ticket_1" width="100%" />
                                                                </td>
                                                                <td colSpan="6">
                                                                    <img src={ticket_2} className=" m-auto mt-2 mb-2" alt="ticket_2" width="100%" />
                                                                </td>
                                                            </tr>
                                                            <p className='mb-0'>(*) El monto abonado se imputará a la cancelación de los conceptos adeudados en la cuenta, según corresponda.</p>
                                                            <p className='mb-3'>Si se abona un monto superior al necesario, el sobrante quedará depositado en la cuenta para ser utilizado en el futuro.</p>

                                                            <p className='mb-3'>Si se abona un monto inferior al requerido para cancelar un concepto adeudado, los fondos quedarán depositados en la cuenta, pero la transacción no se completará hasta que no se realice un nuevo depósito.</p>

                                                            <p className='mb-0'>Ante cualquier duda respecto al importe que debe abonarse, comunicarlo al Dto. de Administración</p>
                                                            <p className='mb-0'>Tel: 3516363726 (whatsapp)</p>
                                                            <p className='mb-0'>valbertini@ies21.edu.ar</p>
                                                            <p className='mb-0'>Muchas Gracias.</p>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </CardBody>
                                    </Card>

                                </Col>
                            </Col>
                        </Row>
{/*                         :
                        <Alert color="danger">
                            Ocurrio un error. Por favor, vuelve a generar tu boleta de pago.
                        </Alert>
                } */}
            </Container>
        </React.Fragment>
    );
}
export default VoucherPrint