import React, { useState, useEffect } from "react";
import { Alert, OffcanvasBody, Col, Container, Row, Label, Table, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Link } from 'react-router-dom';
import { color } from "echarts";
import { useSelector, useDispatch } from "react-redux";
import { reqGetAccountStatment } from "../../store/actions";

const EstadoCuenta = () => {
    document.title = "IES - Yo en IES";
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const dispatch = useDispatch();

    //const career = JSON.parse(localStorage.getItem('careerSelected'))

    const { saldo, movimientos, vencimientos, carrerSelected, cupon } = useSelector(state => ({
        saldo: state.Yoenies.saldo,
        movimientos: state.Yoenies.movimientos,
        vencimientos: state.Yoenies.vencimientos,
        cupon: state.Yoenies.cupon,
        carrerSelected: state.Login.carrerSelected,

    }));

    if (!carrerSelected) {
        window.location.href = "/ies/carrer";
    }

    useEffect(() => {
        if (saldo == null) {
            dispatch(reqGetAccountStatment());
        }
    }, []);

    const fdate = (date) => {
        //format date string to dd/mm/yyyy
        let d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [day, month, year].join('/');
    }

    const formatNumberArg = (num) => {
        num = parseFloat(num.toFixed(2));
        let n = num.toLocaleString('es-AR');
        return n.indexOf(',') != -1 ? n : (n + ",00");
    }

    const noImp = () => {
        window.generic.showModal("No implementado", "Lo sentimos, de momento no se puede acceder a esta función.");
    }


    const closeModal = () => {
        setModalOpen(false);
    };

    const getInfoBoleta = (item) => {
        //dispatch(reqGetAccountStatment());
        setSelectedItem(item);
        setModalOpen(true);
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <h4>ESTADO DE MI CUENTA</h4>
                    <br />
                    <Row>

                        <Col md={3} >
                            <OffcanvasBody className="profile-offcanvas p-0 ies-tableanalitico">
                                <div className="team-cover">
                                    <div className="img-fluid ies-mh140 ies-blue"></div>
                                </div>
                                <div className="p-3">
                                    <div className="team-settings">
                                        <Row>
                                            <Col>
                                                <div className="bookmark-icon flex-shrink-0 me-2">
                                                    <Label htmlFor="favourite13" className="btn-star">

                                                    </Label>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className="p-3 text-center">
                                    <div alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto ies-avatarcircleico">
                                        <i className="ri-money-dollar-circle-line ies-avataricon"></i>
                                    </div>
                                    <div className="mt-3">
                                        <h5 className="fs-15">MI CUENTA</h5>
                                        <br />
                                        <h5 className="fs-15">$ {formatNumberArg(saldo ? saldo : 0)}</h5>
                                        <p>Saldo actual</p>
                                        {
                                            cupon == 0 ? "" : <>
                                                <hr />
                                                <p>Derechos examen no facturados: $ {formatNumberArg(cupon ? cupon : 0)}</p>
                                            </>
                                        }

                                    </div>
                                </div>
                            </OffcanvasBody>

                        </Col>
                        <Col md={9} className="mt-md-0 mt-3">

                            {vencimientos.length === 0 ? (
                                <Alert color="danger">
                                    No existen pagarés generados.
                                </Alert>
                            ) : (
                                <div className="card" style={{ minHeight: '200px' }}>
                                    <div className="ies-spacesec">
                                        <h5>Vencimiento de pagarés</h5>
                                    </div>
                                    <hr />
                                    <div className="ies-spacesec ies-nospacetop">
                                        <div className="table-responsive">
                                            <Table className="table-borderless align-middle table-nowrap mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Pagaré</th>
                                                        <th scope="col">Fecha de emisión</th>
                                                        <th scope="col">Vencimiento</th>
                                                        <th scope="col">Importe</th>
                                                        <th scope="col">Estado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        vencimientos.map((it, index) => (
                                                            <tr key={index}>
                                                                <td className="fw-medium">{it.NUM_PAGARE}</td>
                                                                <td>{fdate(it.FECHA_EMISION)}</td>
                                                                <td>{fdate(it.FECHA_VTO)}</td>
                                                                <td>$ {formatNumberArg(it.IMPORTE)}</td>
                                                                <td>
                                                                    {it.id_estado === 1 ? (
                                                                        <span className="badge badge-soft-danger">Vencido</span>
                                                                    ) : (
                                                                        <span className="badge badge-soft-success">A vencer</span>
                                                                    )}

                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </Table><br />
                                        </div>
                                    </div>
                                </div>
                            )}



                            <div className="card" style={{ minHeight: '200px' }}>
                                <div className="ies-spacesec">
                                    <span className="ies-fright displaynone">
                                        <button className="btn btn-success ies-tm10">Ver más movimientos</button>
                                    </span>
                                    <h5>Últimos movimientos</h5>
                                </div>
                                <hr />
                                <div className="ies-spacesec ies-nospacetop">
                                    <div className="table-responsive" >
                                        <Table className="table-borderless align-middle table-nowrap mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Fecha</th>
                                                    <th scope="col">Comprobante</th>
                                                    {/*<th scope="col">Tipo de comprobante</th>*/}
                                                    <th scope="col">Importe</th>
                                                    <th scope="col">Saldo</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    movimientos.map((it, index) => (
                                                        <tr key={index}>
                                                            <td className="fw-medium">{fdate(it.fecha)}</td>
                                                            <td>
                                                                {
                                                                    it.tipo_comp == "RECIBOS" ?
                                                                        (
                                                                            <a href="#" onClick={() => getInfoBoleta(it)}>{it.descripcion}</a>
                                                                        ) :
                                                                        it.descripcion
                                                                }
                                                            </td>
                                                            {/*<td>{it.tipo_comp}</td>*/}
                                                            <td>$ {formatNumberArg((it.tipo_saldo.indexOf('D') !== -1 ? -1 : 1) * it.importe)}</td>
                                                            <td>$ {formatNumberArg(it.saldo ? it.saldo : 0)}</td>
                                                            <td>
                                                                {
                                                                    (it.tipo_comp == "RECIBOS" || it.tipo_saldo == 'A') ? "" :
                                                                        (
                                                                            <>
                                                                                <a target="_blank" href={"https://www.ies21.edu.ar/facturaelectronica/templatefacturaies.php?v1=" + it.CAE}>
                                                                                    <i className="ri-file-text-line ies-lk" ></i>
                                                                                </a>
                                                                            </>
                                                                        )
                                                                }

                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </Table><br />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <Modal isOpen={isModalOpen} toggle={closeModal} centered>
                    <ModalHeader toggle={closeModal} className='text-center'>
                        Comprobantes
                    </ModalHeader>
                    <ModalBody>

                        {
                            selectedItem &&
                            <>
                                
                                <Table className="table-borderless align-middle table-nowrap mb-0">
                                    <thead>
                                        <tr>
                                            <th>
                                            <b>RE Nº: {selectedItem.num_comp}</b>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col">Descrición</th>
                                            <th scope="col">Importe</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td>{selectedItem.descripcion}</td>
                                            <td>${selectedItem.importe}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </>
                        }


                    </ModalBody>
                </Modal>
            </div>
        </React.Fragment>
    );
};

export default EstadoCuenta;
