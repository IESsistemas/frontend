import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AccordionItem, Collapse, Accordion, Card, Col, Container, Row, CardBody, } from 'reactstrap';
import classnames from "classnames";
import macroPayment from '../../../assets/images/IES/macro-payment.png'
import { getLibrary as onGetLibrary } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

const VirtualLibrary = () => {
    document.title = "IES - Libreria virtual";

    const [borderColIndices, setBorderColIndices] = useState([]);

    const toggleBorderCol = (index) => {
        if (borderColIndices.includes(index)) {
            setBorderColIndices(borderColIndices.filter(idx => idx !== index));
        } else {
            setBorderColIndices([...borderColIndices, index]);
        }
    };

    const dispatch = useDispatch()

    //const career = JSON.parse(localStorage.getItem('careerSelected'))
    
    const { library, error, carrer } = useSelector((state) => ({
        library: state.VirtualLibrary.library,
        error: state.VirtualLibrary.errorMsg,
        carrer: state.Login.carrerSelected
    }));

    useEffect(() => {
        dispatch(onGetLibrary(carrer.ID_CARRERA))
    }, [dispatch]);


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <h4>BIBLIOTECA VIRTUAL</h4>


                    <Row className='justify-content-center mt-3'>
                        <Col md={9} className='mb-3' >
                            { library.map((item, index) => (
                                <Accordion key={index} className="custom-accordionwithicon custom-accordion-border accordion-border-box accordion-success mt-2" id="accordionBordered">
                                <AccordionItem>
                                    <h2 className="accordion-header" id={`accordionborderedExample${index}`}>
                                        <button
                                            className={classnames("accordion-button fw-semibold", { collapsed: !borderColIndices.includes(index) })} type="button" onClick={() => toggleBorderCol(index)} style={{ cursor: "pointer" }} >
                                            {item.NOMBRE_MAT}
                                        </button>
                                    </h2>
                                    <Collapse isOpen={borderColIndices.includes(index)} className="accordion-collapse" id={`accor_borderedExamplecollapse${index}`} >
                                        <div className="accordion-body">
                                            <a href={item.WEBMOVILES} target="_blank" >Ver material de estudio.</a>
                                        </div>
                                    </Collapse>
                                </AccordionItem>
                            </Accordion>

                            ))}
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}
export default VirtualLibrary