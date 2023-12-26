import React, { useState, useEffect } from "react";
import { Card, Button, Col, Container, Row, Badge, CardBody, Modal, Alert } from "reactstrap";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { color } from "echarts";
import yoenies from '../../assets/images/home/YO EN IES.svg'
import distancia from '../../assets/images/home/CURSADO A DISTANCIA.svg'
import examenes from '../../assets/images/home/MIS EXAMENES.svg'
import materias from '../../assets/images/home/MIS MATERIAS.svg'
import docentes from '../../assets/images/home/DOCENTES.svg'
import { getMessages as onGetMessages } from '../../store/actions';

const DashboardEcommerce = () => {
    document.title = "IES - Home";
    const dispatch = useDispatch()
    const [imgBannerN, setimgBannerN] = useState("");

    useEffect(() => {
        let novedad = localStorage.getItem('active-banner');
        if (novedad) {
            localStorage.removeItem('active-banner');
            setimgBannerN(novedad)
            tog_center()
        }
    }, []);

   // const careerSelected = JSON.parse(localStorage.getItem('careerSelected'))
    
    const { carrerSelected, alldata, messages } = useSelector(state => ({
        carrerSelected: state.Login.carrerSelected,
        alldata: state.Login.userData,
        messages: state.MyCareer.messages
    }));

    if (!carrerSelected) {
        window.location.href = "/ies/carrer";
    }

    const [modal_center, setmodal_center] = useState(false);

    function tog_center() {
        setmodal_center(!modal_center);
        setTimeout(() => {
            window.loading(false);
            setTimeout(() => { window.loading(false); }, 500);
        }, 500);
    }

    useEffect(() => {

        dispatch(onGetMessages())

    }, [dispatch]);


    return (
        <React.Fragment>
            <Modal
                isOpen={modal_center}
                toggle={() => {
                    tog_center();
                }}
                centered
            >
                <div className="ies-spacebtw" style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
                    <h4 style={{ float: 'left' }}>Novedades en IES</h4><br /><br />
                    <img src={'/banner/' + imgBannerN} className="imgBannerN" />
                    <div className="ies_tar"><br />
                        <button color="info" className="btn btn-outline-info ies_mr10" onClick={tog_center}>Cerrar</button>
                    </div>
                </div>
            </Modal>
            <div className="page-content">
                <Container fluid>

                    <div className="ies-mycarrerNav">
                        <div>
                            <div alt="" className="avatar-lg img-thumbnail rounded-circle ies-avatarcircleico ies-aliceblue ies-color ies-iconmycarrermenucarrer">
                                <i className="ri-bookmark-3-fill ies-avataricon ies-orangecolor"></i>
                            </div>
                        </div>
                        <div className="ies-nexicomycarrer ies-conttextmycarrer"><br />
                            <h4 style={{ color: "white" }}>{carrerSelected ? carrerSelected.DESCRIPCION : ""}</h4>
                            <p><i className="ri-map-pin-line"></i> Córdoba <span className="ies-pipe">|</span><Badge className="ies-orangecolorbg capitalize" pill> {carrerSelected ? carrerSelected.MODALIDAD.toLowerCase() : ""} </Badge></p>
                        </div>
                        <div className="ies-nexicomycarrer ies-conttextmycarrer">
                            {
                                alldata && alldata.home && alldata.home.careersWithDirectors && alldata.home.careersWithDirectors.length > 1
                                    ? (
                                        <Link to="/ies/carrer"><Button color="primary" className="ies-whiteelementbutton" outline ><i className="ri-arrow-left-right-line"></i> <span className="ies-texiconbutton">Seleccionar carrera</span> </Button></Link>
                                    ) : ""
                            }

                        </div>
                    </div>
                    <br />
                    <Row>
                        <Col md={8} sm={12}>
                            <Row>
                                <Col lg={4} className="mb-3">
                                    <Link to="/ies/yoenies">
                                        <Card className="mb-0 h-100">
                                            <CardBody className="ies-hcardmycarrer">
                                                <div alt="" className="avatar-lg img-thumbnail ies-avatarcircleico ies-aliceblue ies-color ies-imgmycarrer">
                                                    {/* <i className="ri-account-circle-line ies-iconyoenies"></i> */}
                                                    <img src={yoenies} className="" alt="yoEnIES" width={'100%'} height={'100%'} />
                                                </div><br />
                                                <p className="card-title mb-2 ies-textgray">Yo en IES</p>
                                                <p className="ies-textsimple">Visualiza tu credencia IES, legajo, estado de tu cuenta, RAI, solicitá software, certificados etc.</p>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                </Col>
                                <Col lg={4} className="mb-3">
                                    <Link to="/ies/materias">
                                        <Card className="mb-0 h-100">
                                            <CardBody className="ies-hcardmycarrer">
                                                <div alt="" className="avatar-lg img-thumbnail ies-avatarcircleico ies-aliceblue ies-color ies-imgmycarrer">
                                                    <img src={materias} className="" alt="yoEnIES" width={'100%'} height={'100%'} />
                                                </div><br />
                                                <p className="card-title mb-2 ies-textgray">Mis materias</p>
                                                <p className="ies-textsimple">Consultá tu analítico, calendario académico, horario de materias, inscripciones a semestres, solicitá becas, realizá encuentas, etc.</p>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                </Col>
                                <Col lg={4} className="mb-3">
                                    <Link to="/ies/examenes">
                                        <Card className="mb-0 h-100">
                                            <CardBody className="ies-hcardmycarrer">
                                                <div alt="" className="avatar-lg img-thumbnail ies-avatarcircleico ies-aliceblue ies-color ies-imgmycarrer">
                                                    <img src={examenes} className="" alt="yoEnIES" width={'100%'} height={'100%'} />
                                                </div><br />
                                                <p className="card-title mb-2 ies-textgray">Mis exámenes</p>
                                                <p className="ies-textsimple">Accedé a inscripción de examen, solicitud de mesas de exámen, descargar modelos de examen, fechas de seminario final, etc.</p>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                </Col>
                                {
                                    (carrerSelected ? (carrerSelected.DIST == "S") : false) ? (
                                        <Col lg={4} className="mb-3">
                                            <Link to="/ies/cursado-distancia">
                                                <Card className="mb-0 h-100">
                                                    <CardBody className="ies-hcardmycarrer">
                                                        <div alt="" className="avatar-lg img-thumbnail ies-avatarcircleico ies-aliceblue ies-color ies-imgmycarrer">
                                                            <img src={distancia} className="" alt="yoEnIES" width={'100%'} height={'100%'} />
                                                        </div><br />
                                                        <p className="card-title mb-2 ies-textgray">Cursando a distancia</p>
                                                        <p className="ies-textsimple">Ingresá a IES Virtual, descargá y subí exámenes, podrás consultar parciales, visualizar examenes corregidos, etc.</p>
                                                    </CardBody>
                                                </Card>
                                            </Link>
                                        </Col>
                                    ) : ""
                                }
                                <Col lg={4} className="mb-3">
                                    <Link to="/ies/directive">
                                        <Card className="mb-0 h-100">
                                            <CardBody className="ies-hcardmycarrer">
                                                <div alt="" className="avatar-lg img-thumbnail ies-avatarcircleico ies-aliceblue ies-color ies-imgmycarrer">
                                                    <img src={docentes} className="" alt="yoEnIES" width={'100%'} height={'100%'} />
                                                </div><br />
                                                <p className="card-title mb-2 ies-textgray">Director de carrera</p>
                                                <p className="ies-textsimple">Mantente conectado con tus directores de carrera accediendo a través de correo electrónico.</p>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                </Col>

                            </Row>

                        </Col>
                        <Col md={4} sm={12}>
                            {
                                messages && messages.length > 0 ?
                                    <Row>
                                        {
                                            messages.map((item, index) => (
                                                <Col sm={12} key={index}>
                                                    <Alert bsStyle="warning" style={{wordWrap: 'break-word'}}>
                                                        <div dangerouslySetInnerHTML={{ __html: item.Mensaje }} />
                                                    </Alert>
                                                </Col>
                                            ))
                                        }

                                    </Row>

                                    :

                                    <Row>
                                        <Col sm={12} >
                                            <Alert>
                                                No tienes nuevos mensajes.
                                            </Alert>
                                        </Col>

                                    </Row>
                            }
                        </Col>
                    </Row>



                </Container>
            </div>
        </React.Fragment>
    );
};

export default DashboardEcommerce;
