import React from "react";
import { Alert, Button, Card, CardBody, Col, Container, Form, Input, Label, Row } from "reactstrap";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {regulation} from '../../store/regulation/actions'
import withRouter from '../../Components/Common/withRouter';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const Regulation = (props) => {
  document.title = "IES - Reglamento";
  const dispatch = useDispatch()
  const { user } = useSelector(state => ({
    user: state.Login.userData.data
  }))

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      conditions: false,
    },
    validationSchema: Yup.object().shape({
      conditions: Yup.boolean().oneOf([true], 'You must accept the Terms & Conditions'),
    }),
    onSubmit: (values) => {
      dispatch(regulation(values, props.router.navigate));
    }
  });

  const notify = () => toast("Wow so easy!");

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="4" md="4" sm="6">
              <h4>REGLAMENTO</h4>
            </Col>
            {validation.touched.conditions && validation.errors.conditions && (
              <Col md="6" sm="6" >
                <Alert color="danger" role="alert">
                  Debes seleccionar <strong>“Declaro bajo juramento haber leído...”</strong> para continuar
                </Alert>
              </Col>
            )}
          </Row>
          <Card>
            <CardBody>
              {
                user &&
                (
                  <div className="mt-3 d-flex ">
                    <h5 className="mb-0 me-3">{user.apellidos}, {user.nombres}</h5>
                    <p className="text-muted">{user.email}</p>
                  </div>
                )
              }

              <div className="mt-5">
                <a href="/RAI.pdf" target="_blank" className="btn btn-outline-info ies_mr10 mt-20">Descargar reglamento</a>
              </div>

              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
                className="needs-validation mt-4" action="#">
              <div className="d-flex align-items-md-center justify-content-md-between flex-md-row flex-column " >
                <div className="d-flex">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    name="conditions"
                    style={{minWidth: '14px'}}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.conditions}
                    invalid={validation.touched.conditions && !!validation.errors.conditions}
                  />

                  <span htmlFor="area" className="form-label ms-2 mb-0" style={{fontSize: '13px'}}>Declaro bajo juramento haber leído y comprender las normas académicas y administrativas del Colegio Universitario IES 21. Acepto sin condiciones las obligaciones que surgen de las mencionadas normas, a mi cargo, y me comprometo a respetar todas y cada una de las mismas, consintiendo que, ante el incumplimiento de alguna de ellas, deba ser sancionado por la autoridad de la Institución correspondiente.</span>

                </div>
                <div className="text-end">
                  <Button className="btn btn-success mt-md-0 mt-3" type="submit">Continuar</Button>
                </div>

              </div>
            </Form>

          </CardBody>
        </Card>

        <ToastContainer />


      </Container>
    </div>
    </React.Fragment >
  );
};

export default withRouter(Regulation);
