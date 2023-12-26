import React, { useEffect } from "react";
import { Container, Alert, Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Card, OffcanvasBody, Row, UncontrolledDropdown } from "reactstrap";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getSurvey as onGetSurvey } from '../../store/actions';

const SurveysType = () => {
    document.title = "IES - Encuesta Alumno";
    const { id } = useParams();

    const dispatch = useDispatch();

    const { token, survey } = useSelector(state => ({
        token: state.Login.userData.user,
        survey: state.Survey.survey
    }))
    useEffect(() => {
        dispatch(onGetSurvey(token))
        const alert = survey.filter(item => item.obligatoria === 'S')

    }, [dispatch]);

    const allSurvey = survey.filter(item => item.ID_ENCUESTA === Number(id))



    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <h4 className="mb-4">{allSurvey[0].nom_encuesta}</h4>

                    {
                        alert === []  &&
                        <Alert color="info" className="mb-4">
                            <Link to={'/ies/carrer'}><b>Click aquí</b></Link> para ingresar en la plataforma sin responder las encuestas.
                        </Alert>
                    }

                    <p className="mb-2 text-muted">Seleccione una opción para comenzar a responder.</p>
                    <Row>
                        {
                          allSurvey && allSurvey.map((item, index) => (
                                <Col lg={4}  sm={6} key={index}>
                                    <Card className="card-body mb-0 h-100">
                                        <div className="d-flex mb-4 align-items-center">
                                            <div className="flex-shrink-0">
                                                <div alt="" className="avatar-sm img-thumbnail rounded-circle d-flex justify-content-center align-items-center" >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32" className="ies-color"><path fill="currentColor" d="m16 7.78l-.313.095l-12.5 4.188L.345 13L2 13.53v8.75c-.597.347-1 .98-1 1.72a2 2 0 1 0 4 0c0-.74-.403-1.373-1-1.72v-8.06l2 .655V20c0 .82.5 1.5 1.094 1.97c.594.467 1.332.797 2.218 1.093c1.774.59 4.112.937 6.688.937c2.576 0 4.914-.346 6.688-.938c.886-.295 1.624-.625 2.218-1.093C25.5 21.5 26 20.82 26 20v-5.125l2.813-.938L31.655 13l-2.843-.938l-12.5-4.187L16 7.78zm0 2.095L25.375 13L16 16.125L6.625 13L16 9.875zm-8 5.688l7.688 2.562l.312.094l.313-.095L24 15.562V20c0 .01.004.126-.313.375c-.316.25-.883.565-1.625.813C20.58 21.681 18.395 22 16 22c-2.395 0-4.58-.318-6.063-.813c-.74-.247-1.308-.563-1.624-.812C7.995 20.125 8 20.01 8 20v-4.438z" /></svg>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 ms-2">
                                                <h5 className="card-title mb-1">{item.nombre ? item.nombre : item.nombremod}</h5>
                                                <span className="text-muted mb-0">Pendiente</span> - <span className="text-muted">{item.obligatoria === 'S' ? 'Obligatoria' : 'No obligatoria'}</span> 
                                            </div>
                                        </div>
                                        <Link to={`/ies/survey-questions/${item.ID_ENCUESTA}/${item.Id_Materia}`} className="btn btn-primary btn-sm ies-blue">Responder</Link>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    );
};

export default SurveysType;
