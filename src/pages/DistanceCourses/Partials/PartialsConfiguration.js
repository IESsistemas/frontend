import { Col, Container, Row, Alert, Card, CardHeader, CardBody, Form } from "reactstrap";
import { useEffect, useState } from "react";
import { getPartial as onGetPartial, getDownloadPartial as onGetDownloadPartial, getUploadPartial as onGetUploadPartial } from '../../../store/actions';
import { useDispatch, useSelector } from "react-redux";
import { parseISO, addMinutes, format } from 'date-fns';
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';

const PartialsConfiguration = () => {
    document.title = "IES - Subir y bajar parciales";
    const alert = false
    const statusExam = 'iniciado'

    const [modal_center, setmodal_center] = useState(false);
    function tog_center() {
        setmodal_center(!modal_center);
    }

    const dispatch = useDispatch()

    const { partials, error } = useSelector((state) => ({
        partials: state.Partials.partials,
        error: state.Partials.errorMsg,
    }));

    useEffect(() => {

        dispatch(onGetPartial())


    }, [dispatch]);

    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            examenFile: null,
        },

        onSubmit: (values) => {
            //console.log(values)
            //dispatch(onReincorporation(data));
            // dispatch(onGetUploadPartial(values.examenFile))
        }
    });

    const handleFileChange = (e) => {
        validation.setFieldValue("examenFile", e.currentTarget.files[0]);
        console.log('file---->', e.currentTarget.files[0])
        dispatch(onGetUploadPartial(e.currentTarget.files[0].name))
        window.location.reload();
    };




    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg="4" md="4" sm="6">
                            <h4>BAJAR Y SUBIR PARCIALES</h4>
                        </Col>

                        {
                            partials && partials.length > 0 &&
                            <Col sm="12" className="text-end" >
                                <a className="btn btn-ghost-success" href="../../../assets/file/Instructivo Para Sistema.pdf" download>
                                    <i className="ri-file-text-line me-1 align-bottom"></i>
                                    Ver instructivo
                                </a>
                            </Col>
                        }


                        {
                            partials && partials.length > 0 ? partials.map((item, index) => {

                                const fechaBajado = addMinutes(parseISO(item.fecha_bajado), 180)
                                const ahora = new Date();
                                const horaMaxima = new Date(fechaBajado.getTime() + 180 * 60000)
                                const minutosRestantes = (horaMaxima - ahora) / (1000 * 60)

                                /* const minutosRestantes = Math.max(0, differenceInMinutes(addMinutes(fechaBajado, 180), ahora));  */

                                return (

                                    <Col lg="12" key={index}>

                                        <Row className="mt-3">
                                            <Col>
                                                <p>
                                                    1° evaluación parcial de {item.descripcion}
                                                </p>
                                                <p>
                                                    Estado:  <span className="text-dark">{item.fecha_bajado !== null ? 'BAJADO' : item.fecha_bajado !== null && item.fecha_subido !== null ? 'BAJADO Y SUBIDO' : 'PENDIENTE'}</span>
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Card className="mt-2">
                                                    <CardHeader>
                                                        <p>Descargar exámen</p>

                                                    </CardHeader>
                                                    <CardBody>
                                                        <p className="text-muted  ">Recuerde que el tiempo disponible para realizar el parcial es <b>{minutosRestantes.toFixed(0)} minutos</b>.</p>

                                                        {
                                                            item.fecha_subido === null ?

                                                                <button

                                                                    className="btn btn-outline-success border border-success border-dashed mx-auto mb-1 text-center w-100 py-3 mt-4"
                                                                    onClick={() => {
                                                                        dispatch(onGetDownloadPartial(item.nombre_archivo))
                                                                        window.location.reload();
                                                                    }}
                                                                >
                                                                    <i className="ri-download-2-line align-bottom me-1"></i> Descargar consigna del exámen
                                                                </button>
                                                                :
                                                                <p className="text-muted  ">Fecha Subido: <b>{format(addMinutes(parseISO(item.fecha_subido), 180), 'dd-MM-yyyy HH:mm')}</b>.</p>
                                                        }


                                                    </CardBody>


                                                </Card>
                                            </Col>
                                            {
                                                item.fecha_subido === null &&
                                                <Col>
                                                    <Card className="mt-2">
                                                        <CardHeader>

                                                            <p>Subir exámen</p>

                                                        </CardHeader>
                                                        <CardBody>
                                                            <p className="text-muted  ">Al subir el exámen no debe superar los 5MB de tamaño.</p>
                                                            <Form
                                                                onSubmit={(e) => {
                                                                    e.preventDefault();
                                                                    validation.handleSubmit();
                                                                    dispatch(onGetPartial())
                                                                    return false;
                                                                }}
                                                                className="needs-validation"
                                                                action="#"
                                                            >
                                                                <div className="position-relative">
                                                                    <label

                                                                        style={item.fecha_subido !== null ? { cursor: 'no-drop' } : {}}
                                                                        className='btn btn-outline-success border border-success border-dashed mb-1 text-center w-100 py-3 mt-4 cursor-pointer'
                                                                        htmlFor="examenFileInput"
                                                                    >
                                                                        <i className="ri-upload-2-line me-1"></i> Subir exámen resuelto
                                                                    </label>
                                                                    <input
                                                                        disabled={item.fecha_subido !== null}
                                                                        className="position-absolute w-100 h-100 top-0 opacity-0 start-0 "
                                                                        type="file"
                                                                        name="examenFile"
                                                                        onChange={handleFileChange}
                                                                    />
                                                                </div>
                                                            </Form>
                                                        </CardBody>


                                                    </Card>
                                                </Col>
                                            }

                                        </Row>

                                    </Col>
                                )

                            })
                                :
                                <Row>
                                    <Col sm="12" >
                                        <Alert className="alert-danger" role="alert">
                                            No existen parciales a realizar.
                                        </Alert>
                                    </Col>
                                </Row>
                        }


                    </Row>






                </Container>
                <ToastContainer/>
            </div>
        </>
    )
}

export default PartialsConfiguration