import React, { useState, useEffect } from "react";
import { Col, Container, Row, Card, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getScholarshipData as onGetScholarshipData } from "../../../store/actions";
import logo from "../../../assets/images/ieslogo.jpg";


const ScholarshipPrint = () => {
    document.title = "IES - Solicitud de Becas";

    const dispatch = useDispatch()

    //const career = JSON.parse(localStorage.getItem('careerSelected'))
    
    //console.log('sss', career)
    const { user, scholarship, career } = useSelector((state) => ({
        user: state.Login.userData.data,
        career: state.Login.carrerSelected,
        error: state.AcademicSchedule.errorMsg,
        scholarship: state.ScholarshipApplication
    }));

    useEffect(() => {
        if (career && career.ID_CARRERA) {
            dispatch(onGetScholarshipData(career.ID_CARRERA))
        }
    }, [dispatch, career]);

    const handlePrint = () => {
        window.print();
    };


    return (
        <React.Fragment>

            <div className="page-content mt-3">
                <Container fluid>
                    <Row className="justify-content-center">

                        <Col lg="9" xs="12">
                            <Card>
                                <CardBody>
                                    <table className="table table-borderless">
                                        <tbody>
                                            <tr>
                                                <td colSpan="12"  style={{ textAlign: 'right' }}>
                                                    <button className="btn btn-sm btn-success" onClick={handlePrint}>Imprimir</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="12" className="text-center">
                                                    <img src={logo} className=" m-auto mt-2 mb-4" alt="logo" />
                                                    <h4>IES Siglo 21 COLEGIO UNIVERSITARIO</h4>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="4" className="text-center mt-4">
                                                    <h5>SOLICITUD DE BECA</h5>
                                                    {/* <h5>Fecha: {scholarship.data.actualDate[0] && scholarship.data.actualDate[0].fecha}</h5> */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" className="text-center">
                                                    <p><strong>Alumno:</strong> {user.apellidos} {user.nombres}</p>
                                                    <p><strong>Modalidad:</strong> {career ? career.MODALIDAD : ''}</p>
                                                    <p><strong>Carrera:</strong> {career ? career.DESCRIPCION : ''}</p>
                                                </td>
                                                <td colSpan="2" className="text-center">
                                                    <p><strong>DNI:</strong> {user.dni}</p>
                                                    <p><strong>Centro de Extensión:</strong></p>
                                                    <p><strong>Cuatrimestre:</strong> {career ? career.semestre : ''}</p>
                                                </td>
                                            </tr>
                                            <tr >
                                                <td colSpan="4" className="text-center mt-4">
                                                    <h5 className="mb-0 mt-3">Historial de Becas</h5>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" className="text-center">
                                                    <p><strong>¿Obtuvo Becas anteriormente?:</strong> {scholarship.data.scolarshipHistory && scholarship.data.scolarshipHistory.obtuvoBecas}</p>
                                                </td>
                                                <td colSpan="2" className="text-center">
                                                    <p><strong>Cantidad:</strong> {scholarship.data.scolarshipHistory && scholarship.data.scolarshipHistory.cantidad}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="4" className="text-center mt-4">
                                                    <h5 className="mb-0 mt-3">Materias Último Semestre Cursado</h5>
                                                </td>
                                            </tr>
                                            <tr className="text-center">
                                                <th scope="col">Semestre</th>
                                                <th scope="col">Año</th>
                                                <th scope="col">Asignatura</th>
                                                <th scope="col">Condición</th>
                                            </tr>
                                            {
                                                scholarship.data.lastSubjectsOnCurse && scholarship.data.lastSubjectsOnCurse.map((item, index) => (
                                                    <tr key={index} className="text-center">
                                                        <td>{item.SEM}</td>
                                                        <td>{item.YEAR}</td>
                                                        <td>{item.MATERIA}</td>
                                                        <td>{item.CONDITION}</td>
                                                    </tr>
                                                ))
                                            }
                                            <tr>
                                                <td colSpan="4" className="text-center mt-3">
                                                    <h6 className="mb-0 mt-5">Escribir el Nombre de la empresa u Organización, y si es Titular o Familiar Directo: <strong>{scholarship.company}</strong></h6>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="4" className="text-center mt-3">
                                                <p className="mb-0 mt-5">Promedio: ..................</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="4" className="text-center mt-3">
                                                <p className="mb-0 mt-4">Resolución</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" className="text-center mt-3">
                                                    <h6 className="mb-0 mt-5">DOA</h6>
                                                </td>
                                                <td colSpan="2" className="text-center mt-3">
                                                    <h6 className="mb-0 mt-5">Director Gral.</h6>
                                                </td>
                                            </tr>
                                            <tr className="mb-5">
                                                <td colSpan="2" className="text-center mt-3">
                                                    <h6 className="mb-5 mt-5">Firma / Fecha</h6>
                                                </td>
                                                <td colSpan="2" className="text-center mt-3">
                                                    <h6 className="mb-5 mt-5">Firma / Fecha</h6>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </CardBody>


                            </Card>

                        </Col>
                    </Row>




                </Container>
            </div>
        </React.Fragment>
    );
};
export default ScholarshipPrint;

