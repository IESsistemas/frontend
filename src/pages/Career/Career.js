import React, {useEffect} from "react";
import { Card, CardBody, Col, Container, Row, Progress } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setCareer } from "../../store/actions";

const Carrer = (props) => {
  document.title ="IES - Home";
  const dispatch = useDispatch();
  const history = useNavigate();

  const { alldata } = useSelector(state => ({
    alldata: state.Login.userData
    
  }));

  const getDirName = (item) => {
    try {
        return item.director.nombres+" "+item.director.apellidos;
      } catch (error) {return ""}
  }

  const acceder = (item)=>{
    //localStorage.setItem('careerSelected', JSON.stringify(item))
    dispatch(setCareer(item));
    history("/ies/mycarrer");
  }

    useEffect(() => {
        try {
        if(alldata.home.careersWithDirectors.length === 1){
            acceder(alldata.home.careersWithDirectors[0])
        }
        } catch (error) {console.log(error)}
    }, []);

    useEffect(() => {
        try {
        if(alldata.home.careersWithDirectors.length === 1){
            acceder(alldata.home.careersWithDirectors[0])
        }
        } catch (error) {console.log(error)}
    }, [alldata]);

  
  
  const stand = (text) =>{
    text = text.toLowerCase();
    text = text.replace(/á/gi,"a");
    text = text.replace(/é/gi,"e");
    text = text.replace(/í/gi,"i");
    text = text.replace(/ó/gi,"o");
    text = text.replace(/ú/gi,"u");
    return text.toUpperCase();
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
            {
                (alldata && alldata.home && alldata.home.careersWithDirectors) ? (<>
                    <h4>SELECCIONE SU CARRERA</h4>
                </>):""
            }
            
            <br/>
            <Row>
                {
                    (alldata && alldata.home && alldata.home.careersWithDirectors) ?
                    (
                        alldata.home.careersWithDirectors.map((item, i) => {
                            return (
                                <Col md={6} lg={3} key={item.ID_CARRERA}>
                                    <Card>
                                        <img className="card-img-top img-fluid" src={"/carrer/"+stand(item.DESCRIPCION)+".jpg"} alt="Card cap" />
                                        <CardBody style={{paddingBottom: "0px"}}>
                                            <h4 className="card-title mb-2">{item.DESCRIPCION}</h4>
                                            <p className="card-text">Dir. {getDirName(item)}</p><br/>
                                            <Row>
                                                {/*<Col sm={9}>  
                                                    <div className="mb-4" style={{paddingTop: "8px"}}>
                                                        <h5 className="fs-13">Avanzada: 40%</h5>
                                                        <Progress color="primary" value={40} className="progress-sm" />
                                                        <br/>
                                                    </div>
                                                </Col>*/}
                                                <Col sm={12}>  
                                                <div className="btn btn-primary ies-fright ies_mgrb10" onClick={()=>{acceder(item)}}>Acceder</div>
                                                </Col>
                                            </Row>  
                                        </CardBody>
                                    </Card>
                                </Col>
                            );
                        })
                    )
                    : ""
                }
                {/*<Col lg={3}>
                    <Card>
                        <img className="card-img-top img-fluid" src="/static/media/img-1.53d0bcae9922629289e7.jpg" alt="Card cap" />
                        <CardBody style={{paddingBottom: "0px"}}>
                            <h4 className="card-title mb-2">Diseño e impresión 3D</h4>
                            <p className="card-text">Dir. Nombre y Apellido</p><br/>
                            <Row>
                                <Col sm={9}>  
                                    <div className="mb-4" style={{paddingTop: "8px"}}>
                                        <h5 className="fs-13">Avanzada: 40%</h5>
                                        <Progress color="primary" value={40} className="progress-sm" />
                                    </div>
                                </Col>
                                <Col sm={3}>  
                                    <Link to="/ies/yoenies" className="btn btn-primary">Acceder</Link>
                                </Col>
                            </Row>  
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={3}>
                    <Card>
                        <img className="card-img-top img-fluid" src="/static/media/img-2.ff87bf028c7481626ed8.jpg" alt="Card cap" />
                        <CardBody style={{paddingBottom: "0px"}}>
                            <h4 className="card-title mb-2">Publicidad</h4>
                            <p className="card-text">Dir. Arias, Rolando Gabriel</p><br/>
                            <Row>
                                <Col sm={9}>  
                                    <div className="mb-4" style={{paddingTop: "8px"}}>
                                        <h5 className="fs-13">Avanzada: 60%</h5>
                                        <Progress color="primary" value={60} className="progress-sm" />
                                    </div>
                                </Col>
                                <Col sm={3}>  
                                    <Link to="/ies/yoenies" className="btn btn-primary">Acceder</Link>
                                </Col>
                            </Row>  
                        </CardBody>
                    </Card>
                </Col>*/}
            </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Carrer;
