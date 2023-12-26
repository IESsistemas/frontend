import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, Col, Container, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, OffcanvasBody, Row, Table } from 'reactstrap';
import { getRapipago as onGetRapipago, postBarcode as onPostBarcode } from '../../../store/actions';
import * as Yup from "yup";
import { useFormik } from "formik";
import withRouter from '../../../Components/Common/withRouter';
const GenerateVoucher = (props) => {
    document.title = "IES - Boleta de pago";
    const [checkboxValues, setCheckboxValues] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    //const [amount, setAmount] = useState(totalAmount === 0 ? '' : totalAmount);

    const dispatch = useDispatch()
    const voucher = true

    //const career = JSON.parse(localStorage.getItem('careerSelected'))

    const { user, career, error, matricula, materias } = useSelector((state) => ({
        user: state.Login.userData.data,
        error: state.AcademicSchedule.errorMsg,
        career: state.Login.carrerSelected,
        matricula: state.Rapipago.data.valorMatricula,
        materias: state.Rapipago.data.materiasPreinscriptas,
    }));

    useEffect(() => {
        dispatch(onGetRapipago())
    }, [dispatch]);

    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            amount: totalAmount === 0 ? 0 : totalAmount,
        },
        validationSchema: Yup.object().shape({
            amount: Yup.string().required('Por favor, completar este campo.'),
        }),
        onSubmit: (values) => {
            localStorage.setItem("amount", values.amount.toFixed(2));
            if (values !== '0') {
              dispatch(onPostBarcode(values, props.router.navigate));
            }

        }
    });

    const handleCheckboxChange = (index) => {
        const updatedCheckboxValues = { ...checkboxValues };
        updatedCheckboxValues[index] = !updatedCheckboxValues[index];
        setCheckboxValues(updatedCheckboxValues);

        // Calcular la suma total
        let newTotalAmount = 0;
        materias.forEach((item, i) => {
            if (updatedCheckboxValues[i]) {
                newTotalAmount +=
                    parseFloat(item.Valor_Materia) +
                    parseFloat(item.valor_matricula) +
                    parseFloat(item.Valor_Cupon);

                    validation.values.amount = totalAmount.toFixed(2);
            }
        });
        if (updatedCheckboxValues.matricula) {
            newTotalAmount += parseFloat(matricula);
        }
        setTotalAmount(newTotalAmount);
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <h4>GENERAR BOLETA DE RAPIPAGO O PAGOFÁCIL</h4>

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



                    <Row className="justify-content-center">
                        <Col md="10" xs="12" className=' mt-3'>
                            <Alert color="info">
                                Verificar los datos y completar el monto a pagar (*)
                            </Alert></Col>
                        <Col md="10" xs="12" className='mt-3'>
                            {
                                materias &&
                                <Card className="ies-shadow1">
                                    <Table className="align-middle table-nowrap mb-0 ies-tablelegajo">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th scope="col">Asignatura</th>
                                                <th scope="col">Extensión</th>
                                                <th scope="col">Modalidad</th>
                                                <th scope="col">Puntos</th>
                                                <th scope="col">Valor</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{ backgroundColor: "white" }}>
                                            {
                                                materias && materias.length > 0 && materias.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <Input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                onChange={() => handleCheckboxChange(index)}
                                                                checked={checkboxValues[index] || false}
                                                            />
                                                        </td>
                                                        <td>{item.Materia}</td>
                                                        <td>{item.Ctro_Ext}</td>
                                                        <td>{item.Modalidad}</td>
                                                        <td>{item.Puntos}</td>
                                                        <td>${parseFloat(item.Valor_Materia) + parseFloat(item.valor_matricula) + parseFloat(item.Valor_Cupon)}</td>
                                                    </tr>

                                                ))
                                            }

                                            <tr>
                                                <td>
                                                    <Input
                                                        type="checkbox"
                                                        onChange={() =>
                                                            handleCheckboxChange("matricula")
                                                        }
                                                        checked={checkboxValues.matricula || false}
                                                    />
                                                </td>
                                                <td>Valor de matrícula</td>
                                                <td>N/A</td>
                                                <td>N/A</td>
                                                <td>N/A</td>
                                                <td>${matricula}</td>
                                            </tr>


                                        </tbody>
                                    </Table>
                                    <CardBody>
                                        <Row className='text-end'>
                                            <Col>
                                                <p className='text-info'>Monto a abonar: ${totalAmount}</p>
                                            </Col>
                                        </Row>

                                    </CardBody>
                                </Card>
                            }

                        </Col>
                        <Col md="10" xs="12" >
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    validation.handleSubmit();
                                    return false;
                                }}
                                className="needs-validation"
                                action="#"
                            >
                                <Row className='align-items-end'>

                                    <Col sm="6" xs="12" className="mb-3">
                                        <Label htmlFor="amount" className="form-label">Otro importe a pagar:</Label>
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
                                        />
                                        {validation.touched.amount && validation.errors.amount ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.amount}</div></FormFeedback>
                                        ) : null}
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <div className="text-end mb-3">
                                            <button className="btn btn-success" type="submit">Generar</button>
                                        </div>
                                    </Col>

                                </Row>
                            </Form>

                        </Col>
                        <Col md="10" xs="12" className=''>
                            <Alert color="danger">
                                IMPRIMIR UNA BOLETA PARA CADA PAGO QUE REALICE, NO FOTOCOPIE LA MISMA
                            </Alert>

                            <Alert color="info">
                                <ul className='ps-3'>
                                    <li>
                                        El monto abonado se imputará a la cancelación de los conceptos adeudados en la cuenta, según corresponda.
                                    </li>
                                    <li>
                                        Si se abona un monto superior al necesario, el sobrante quedará depositado en la cuenta para ser utilizado en el futuro.
                                    </li>
                                    <li>
                                        Si se abona un monto inferior al requerido para cancelar un concepto adeudado, los fondos quedarán depositados en la cuenta, pero la transacción no se completará hasta que no se realice un nuevo depósito.

                                    </li>
                                </ul>

                                <p className='mb-0'>Ante cualquier duda respecto al importe que debe abonarse, comunicarlo al Dto. de Administración</p>
                                <p className='mb-0'>Tel: 3516363726 (whatsapp)</p>
                                <p className='mb-0'>valbertini@ies21.edu.ar</p>
                                <p className='mb-0'>Muchas Gracias.</p>

                            </Alert>
                        </Col>
                    </Row>



                </Container>
            </div>
        </React.Fragment>
    );
}
export default withRouter(GenerateVoucher);
