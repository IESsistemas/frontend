import React from "react";
import { Col, Container, Row, Card, CardHeader, CardBody } from "reactstrap";
import { Link } from 'react-router-dom';
import avatar8 from "../../assets/images/users/avatar-10.jpg";
import { useSelector } from 'react-redux';


const Directive = () => {
  document.title ="IES - Home";
  //const career = JSON.parse(localStorage.getItem('careerSelected'))
  const { carrerSelected } = useSelector(state => ({
    carrerSelected: state.Login.carrerSelected
  }));
  var arrayDir = [];

  if(!carrerSelected){
    window.location.href = "/ies/carrer";
  }

  if(carrerSelected.director.length){
    arrayDir = [...carrerSelected.director]; 
  }else{
    arrayDir = [carrerSelected.director]; 
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
            <h4>DIRECTORES DE CARRERA</h4>
            <br/>
            <Row>
                {
                    arrayDir.map((item, i) => (
                        <Col xl={4} key={item.num_doc}>
                            <Card>
                                <CardHeader>
                                    <h6 className="card-title mb-0">Director de Publicidad</h6>
                                </CardHeader>
                                <CardBody className="p-4 text-center">
                                    <div className="mx-auto avatar-md mb-3">
                                        <img src={avatar8} alt="" className="img-fluid rounded-circle" />
                                    </div>
                                    <h5 className="card-title mb-1 capitalize">{item.apellidos.toLowerCase()}, {item.nombres.toLowerCase()}</h5>
                                    <p className="text-muted mb-0">{item.e_mail}</p>
                                </CardBody>
                                <div className="card-footer text-center">
                                    <ul className="list-inline mb-0 ies-fs24">
                                        {/*<li className="list-inline-item">
                                            <Link to="#" className="lh-1 align-middle link-secondary"><i className="ri-facebook-fill"></i></Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="#" className="lh-1 align-middle link-primary"><i className="ri-linkedin-fill"></i></Link>
                                        </li>*/}
                                        {item.Nro_TE ? (
                                          <>
                                            {/*<li className="list-inline-item">
                                              <a href={"https://wa.me/"+(item.Nro_TE ? item.Nro_TE:"+54351123123123")} target="_blank"><i className="ri-whatsapp-line ies-greentx"></i></a>
                                            </li>*/}
                                            <p>{item.Nro_TE}</p>
                                          </>
                                        ) : ""}
                                        
                                    </ul>
                                </div>
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

export default Directive;
