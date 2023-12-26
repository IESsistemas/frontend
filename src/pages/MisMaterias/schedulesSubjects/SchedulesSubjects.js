import React, { useState, useEffect } from "react";
import { Alert, Card, CardBody, Col, Container, Row } from "reactstrap";
import withRouter from '../../../Components/Common/withRouter';
import { getSchedulesSubjects as onGetSchedulesSubjects } from '../../../store/actions';
import { useDispatch, useSelector } from "react-redux";
import './schedulesSubjects.css'

const ScholarshipApplication = (props) => {
    document.title = "IES - Horarios de materias";

    const dispatch = useDispatch()
    
    //const career = JSON.parse(localStorage.getItem('careerSelected'))
    
    const { scheduleSubjects, career } = useSelector((state) => ({
        scheduleSubjects: state.SchedulesSubjects.schedules,
        career: state.Login.carrerSelected
    }));

    useEffect(() => {

        if (career && career.ID_CARRERA) {
            dispatch(onGetSchedulesSubjects(career.ID_CARRERA))
        }

    }, [dispatch]);

    const daysOfWeek = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg="3" md="4" sm="6">
                            <h4>CALENDARIO DE CLASES</h4>
                        </Col>
                        <Col md="6" sm="6" >
                            {scheduleSubjects && Object.keys(scheduleSubjects).length > 0 ?
                                <Alert color="info" role="alert">
                                    Horarios de materias presenciales y semipresenciales en Córdoba. Sujetos a modificaciones.
                                </Alert>
                                :
                                <Alert color="info" role="alert">
                                    Aún no está disponible el calendario de clases,
                                </Alert>
                            }




                        </Col>
                    </Row>
                    {
                        scheduleSubjects && Object.keys(scheduleSubjects).length > 0 &&
                        <Row>
                            <Col>

                                <Card>
                                    <CardBody>
                                        <div className="text-center">
                                        <h5>CALENDARIO</h5>
                                        </div>

                                        <div className="table-responsive mt-3">
                                            <table className="table table-bordered table-nowrap mb-0">
                                                <thead className="table-light">

                                                    <tr>
                                                        {daysOfWeek.map(day => (
                                                            <th key={day}>{day}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        {daysOfWeek.map(columnDay => (
                                                            <td key={columnDay}>
                                                                {scheduleSubjects[columnDay] ? (
                                                                    scheduleSubjects[columnDay].map((schedule) => {
                                                                        const name = schedule.NOMBRE_MAT.split('-');
                                                                        return (
                                                                            <div className="card-schedules mb-2" key={schedule.NOMBRE_MAT}>
                                                                                {name.map((linea, index) => (
                                                                                    <div key={index}>{linea}</div>
                                                                                ))}
                                                                                <div className="mt-2">
                                                                                    <span className="badge-schedules">{schedule.HORA_COMIENZO} a {schedule.HORA_FIN}</span>
                                                                                </div>

                                                                            </div>
                                                                        )
                                                                    })
                                                                ) : null}
                                                            </td>
                                                        ))}
                                                    </tr>

                                                   

                                                </tbody>
                                            </table>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                    }


                </Container>
            </div >
        </React.Fragment >
    );
};

export default withRouter(ScholarshipApplication);
