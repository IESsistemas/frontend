import React, { useState, useEffect } from "react";
import { Col, Container, Row, Card, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getScholarshipData as onGetScholarshipData } from "../../../store/actions";
import logo from "../../../assets/images/ieslogo.jpg";
import { format } from 'date-fns';

const AcademicExceptionPrint = () => {
    document.title = "IES - Solicitud de Becas";
    const [filteredSubject, setFilteredSubject] = useState({});


    
    const { user, career, scholarship, dataFrint, print } = useSelector((state) => ({
        user: state.Login.userData.data,
        career: state.Login.carrerSelected,
        error: state.AcademicSchedule.errorMsg,
        scholarship: state.ScholarshipApplication,
        print: state.AcademicExceptions.exceptionProcessed.print
    }));


    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd/MM/yyyy hh:mm:ss a');

    useEffect(() => {
        const subjectFromLocalStorage = localStorage.getItem('subject');
        if (subjectFromLocalStorage) {
            const filteredSubjectData = Array(print).filter(
                (item) => item.exceptionData.subject === subjectFromLocalStorage

            );

            if (filteredSubjectData) {
                setFilteredSubject(filteredSubjectData[0]);
            }
        }
    }, []);
    const handlePrint = () => {
        window.print();
    };


    return (
        <React.Fragment>

            <div className="mt-3">
                <Container fluid>
                    <Row className="justify-content-center">
                        {
                            filteredSubject && filteredSubject.exceptionData &&
                            <Col lg="9" xs="12">
                                <Card>
                                    <CardBody>
                                        <table className="table table-borderless">
                                            <tbody>
                                                <tr>
                                                    <td colSpan="12" style={{ textAlign: 'right' }}>
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
                                                    <td colSpan="12" className="text-center mt-4">
                                                        <h5>EXCEPCIÓN ACADÉMICA PARA CURSAR EN OTRA CARRERA</h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="1" className="text-center">
                                                        <p><strong>Alumno:</strong> {user.apellidos}, {user.nombres}</p>
                                                        <p><strong>Email:</strong> {user.email}</p>

                                                    </td>
                                                    <td colSpan="2" className="text-center">
                                                        <p><strong>DNI:</strong> {user.dni}</p>
                                                        <p><strong>Telefono:</strong> {user.telefono}</p>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td colSpan="1" className="text-center">
                                                        <p><strong>Carrera:</strong> {filteredSubject.careerName}</p>
                                                        <p><strong>Fecha:</strong> {formattedDate}</p>

                                                    </td>
                                                    <td colSpan="2" className="text-center">
                                                        <p><strong>Modalidad:</strong> {filteredSubject.idModalidad === 'P' ? 'Presencial' : 'Distancia'}</p>
                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td colSpan="4" className="text-center mt-4">
                                                        <p className="mb-0">La presente autorización permite al alumno regularizar una materia en otra carrera</p>
                                                        <p><b>Toda modificación de la presente, deberá ser notificada en Bedelia.</b></p>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td colSpan="10" style={{'margin-top': '30px'}}>
                                                        <table style={{'width': '100%', 'table-layout': 'auto'}}>
                                                            <thead>
                                                                <tr className="text-center">
                                                                    <th scope="col">Asignatura </th>
                                                                    <th scope="col">Carrera</th>
                                                                    <th scope="col">Comisión</th>
                                                                    <th scope="col">Turno</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    Array(filteredSubject.exceptionData).map((item, index) =>

                                                                        <tr className="text-center" key={index}>
                                                                            <td>{item.subject}</td>
                                                                            <td>{item.originCareer}</td>
                                                                            <td>{item.commission}</td>
                                                                            <td>{item.turn}</td>
                                                                        </tr>
                                                                    )

                                                                }
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>

                                               
                                                <tr>
                                                    <td colSpan="12" className="text-center mt-3">

                                                        <h6 className="mb-5 mt-5">Con autorizacón de: {filteredSubject.exceptionData.exceptionName} el día {filteredSubject.exceptionData.authorizationDate}</h6>


                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="12" className="text-center mt-5">
                                                        <p className="mb-0">_____________________________</p>
                                                        <p>Firma del Alumno</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </CardBody>


                                </Card>

                            </Col>
                        }

                    </Row>




                </Container>
            </div>
        </React.Fragment>
    );
};
export default AcademicExceptionPrint;

