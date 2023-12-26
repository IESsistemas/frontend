import React, { useState } from "react";
import { Col, Container, Button, Modal, Row, CardBody, Card } from "reactstrap";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { cancelInterview as onCancelInterview } from "../../store/actions"
import { format, addHours } from 'date-fns';

const DoaInterviews = (data) => {
  document.title = "IES - Reglamento";

  const dispatch = useDispatch()

  const cancelInterview = (data) => {
    dispatch(onCancelInterview(data))
  }


  // const dateObject = toDate(data.fecha);

  //const formattedDate = format(data.fecha, 'dd-MM-yyyy');

  return (
    <React.Fragment>

      <Row>
        {
          data &&
          data.interview.map((item, index) => {
            const date = new Date(item.fecha)
            const formattedDate = format( addHours(date, 3) , "dd-MM-yyyy")
            return (
              <Col md="3" xs="12" key={index}>
                <Card>
                  <CardBody className="ies-hcardmycarrer">
                    <div style={{ display: "flex" }}>
                      <div alt="" className="avatar-lg img-thumbnail ies-avatarcircleico ies-aliceblue ies-color ies-iconmycarrermenu rounded-circle mx-auto ies-avatarcircleico ies-doaselect" >
                        <i className="bx bx-user-circle ies-iconyoenies"></i>
                      </div>
                      <div className="ies-carddoacont">
                        <p className="card-title mb-2 ies-textgray">
                          {item.tipo_entrevista === 1 ? 'Entrevista de ingreso' : item.tipo_entrevista === 2 ? 'Entrevista de asesoramiento' : item.tipo_entrevista === 3 && 'Entrevista de beca'}
                        </p>
                        <p className="ies-textsimple">Pendiente</p>
                      </div>
                    </div>
                    <br />
                    <p className="card-title mb-2 ies-textgray">{item.apellidos}, {item.nombres}</p>
                    <p className="ies-textsimple">{item.hora} hs - {formattedDate}</p><br />
                    <Button color="success" style={{ width: "100%" }} onClick={() => cancelInterview(item)}> Cancelar </Button>
                  </CardBody>
                </Card>
              </Col>
            )
          })

        }






      </Row>
    </React.Fragment>
  );
};

export default DoaInterviews;
