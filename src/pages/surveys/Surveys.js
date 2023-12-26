import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Card, Col, Container, Label, OffcanvasBody, Row } from 'reactstrap';
import { getSurvey as onGetSurvey } from '../../store/actions';

const Surveys = () => {
    document.title = "IES - Encuentas";

    const dispatch = useDispatch();
    const { token, survey } = useSelector(state => ({
        token: state.Login.userData.user,
        survey: state.Survey.survey
    }))

    useEffect(() => {
        dispatch(onGetSurvey())

    }, [dispatch]);

    const typeSurveys = [];
    const encounteredIDs = [];
    
    survey.forEach(obj => {
        const { ID_ENCUESTA } = obj;
        if (!encounteredIDs.includes(ID_ENCUESTA)) {
            encounteredIDs.push(ID_ENCUESTA);
            typeSurveys.push(obj);
        }
    });

    if(!(survey.length > 0) ) {
        //console.log('deberia redirecionar')
       // window.location.href = "/ies/carrer";
    }
    
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <h4>ENCUESTAS</h4>
                    {survey && survey.length > 0 ?
                        <>
                            <p className="text-muted">Seleccione la encuesta a realizar</p>
                            <Row>
                                {
                                    typeSurveys && typeSurveys.map((item, index) => (
                                        <Col md={3} sm={4} key={index} className='mb-mt-0 mt-3'>

                                            <Card className='mb-0 h-100'>
                                                <OffcanvasBody className="profile-offcanvas p-0">
                                                    <div className="team-cover">
                                                        <div className="img-fluid ies-mh140 ies-blue"></div>
                                                    </div>
                                                    <div className="p-3">
                                                        <div className="team-settings">
                                                            <Row>
                                                                <Col>
                                                                    <div className="bookmark-icon flex-shrink-0 me-2">
                                                                        <Label htmlFor="favourite13" className="btn-star">
                                                                            <svg width="20" height="20">
                                                                                {/* <use xlink:href="#icon-star"/> */}
                                                                            </svg>
                                                                        </Label>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                    <div className="p-3 text-center">
                                                        <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico">
                                                            <i className="ri-user-fill ies-avataricon"></i>
                                                        </div>
                                                        <div className="mt-3">
                                                            <h5 className="fs-15"><Link to="#" className="link-primary">{item.nom_encuesta}</Link></h5>
                                                            <p className="text-muted">{item.obligatoria === 'S' ? 'Obligatoria' : 'No obligatoria'}</p> 
                                                        </div>
                                                    </div>
                                                </OffcanvasBody>
                                                <div className="offcanvas-footer p-3 hstack gap-3 text-center position-relative">
                                                    <Link to={`/ies/surveys-type/${item.ID_ENCUESTA}`} className="btn btn-primary w-100 ies-blue">Ver encuestas</Link>
                                                </div>
                                            </Card>

                                        </Col>
                                    ))
                                }

                            </Row>
                        </>
                        :
                        <Alert color="danger">
                            No existe encuestas pendientes. <Link className='text-danger' to={'/ies/carrer'}>Haz click para seguir navegando.</Link>
                        </Alert>
                    }


                </Container>
            </div>
        </React.Fragment>
    );
}
export default Surveys