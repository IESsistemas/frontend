import React from "react";
import { Col, Container, Row } from "reactstrap";
import { Link } from 'react-router-dom';

const DashboardEcommerce = () => {
  document.title ="IES - Home";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
            <h4>Home</h4>
            <div className="card">
            <br/><br/><br/><br/>
            <div>
              <Link to="/ies/regulation"><button className="btn btn-success">Reglamento</button></Link>
              <Link to="/ies/surveys"><button className="btn btn-success">Encuestas</button></Link>
            </div>
            <br/><br/>
            </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
