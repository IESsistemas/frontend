import React, { useState, useEffect } from "react";
import { Col, Container, Row, Badge, Table, Modal } from "reactstrap";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { reqPostAcademicInfo } from "../../../store/actions";

const DashboardEcommerce = () => {
  document.title ="IES - Home";

  //const career = JSON.parse(localStorage.getItem('careerSelected'))
    const { carrerSelected, alldata, academic } = useSelector(state => {
        return {
        carrerSelected: state.Login.carrerSelected,
        alldata: state.Login.userData,
        academic: state.MisMaterias.academic
    }});

    const [modal_center, setmodal_center] = useState(false);
    const [tribunalValue, settribunalValue] = useState([]);

    function tog_center(tribunal) {
        if(tribunal) settribunalValue(tribunal)
        setmodal_center(!modal_center);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if(carrerSelected){
            dispatch(reqPostAcademicInfo({"idCareer": carrerSelected.ID_CARRERA}));
        }
    }, []);

    useEffect(() => {
    }, [academic]);

    const formatNumberArg = (num) => {
        num = parseFloat(Number(num));
        let n = num.toLocaleString('es-AR');
        return n.indexOf(',')!= -1 ? (
            n.split(',')[1].length == 1 ? (n+"0"):n
        ):(n+",00");
    }

    const fdate = (date)=>{
        //format date string to dd/mm/yyyy
        let d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();
        if (month.length < 2){
            month = '0' + month;
        } 
        if (day.length < 2){
            day = '0' + day;
        }
    
        return [day, month, year].join('/');
    }

    const totalPreinsc = ()=>{
        let valormat = 0;
        for (let i = 0; i < academic.materiasPreinscriptas.length; i++) {
            valormat += academic.materiasPreinscriptas[i].Valor_Materia;
        }
        


        let valorMatri = 0;
        for (let i = 0; i < academic.materiasPreinscriptas.length; i++) {
            valorMatri += academic.materiasPreinscriptas[i].valor_matricula;
            break;
        }
        switch (academic.materiasPreinscriptas.length) {
            case 0:
                valorMatri = (0);
                break;
            case 1:
                valorMatri = (valorMatri*0.25);
                break;
            case 2:
                valorMatri = (valorMatri*0.5);
                break;
            default:
                valorMatri = (valorMatri);
                break;
        }

        return formatNumberArg(valorMatri + valormat);
    }

    const getValorMat = () => {
        //formatNumberArg(el.valor_matricula/2)
        let acum = 0;
        for (let i = 0; i < academic.materiasPreinscriptas.length; i++) {
            acum += academic.materiasPreinscriptas[i].Valor_Materia;
        }
        return formatNumberArg(acum);
    }

    const getMatricula = () => {
        let acum = 0;
        for (let i = 0; i < academic.materiasPreinscriptas.length; i++) {
            acum += academic.materiasPreinscriptas[i].valor_matricula;
            break;
        }
        switch (academic.materiasPreinscriptas.length) {
            case 0:
                return formatNumberArg(0);
                break;
            case 1:
                return formatNumberArg(acum*0.25);
                break;
            case 2:
                return formatNumberArg(acum*0.5);
                break;
            default:
                return formatNumberArg(acum);
                break;
        }
    }

    const showTable = (array)=>{
        return array ?  ( array.length ? true : false ): false
    }

    return (
    <React.Fragment>

    <Modal
        isOpen={modal_center}
        toggle={() => {
            tog_center();
        }}
        centered
    >
        <div className="ies-spacebtw">
            <br/>
            <h5>Tribunal</h5><br/>
            {
                tribunalValue.map(el => (
                    <>
                        <i className="ri-user-line"></i> <span>{el.split('-')[0]}-<span className="ies-lk">{el.split('-')[1]}</span></span><br/><br/>
                    </>
                ))
            }
            <br/>
        </div>
    </Modal>
      <div className="page-content">
        <Container fluid>
            {academic ? (
                <>
                    <h4>ANALÍTICO</h4>
                        <div className="ies-mycarrerNav">
                            <div>
                                <div alt="" className="avatar-lg img-thumbnail rounded-circle ies-avatarcircleico ies-aliceblue ies-color ies-iconmycarrermenucarrer">
                                    <i className="ri-bookmark-3-fill ies-avataricon ies-orangecolor"></i>
                                </div>
                            </div>
                            <div className="ies-nexicomycarrer ies-conttextmycarrer"><br/>
                                <h4 style={{color:"white"}}>{alldata ? (alldata.data ? alldata.data.apellidos:""):""}, {alldata? (alldata.data ? alldata.data.nombres:""):""}</h4>
                                <p><i className=" bx bxs-graduation"></i> {carrerSelected ? carrerSelected.DESCRIPCION : ""} <span className="ies-pipe">|</span> 
                                <i className="bx bxs-folder-open"></i> Analítico-resolución: {carrerSelected ? carrerSelected.RESOLUCION : ""} 
                                <span className="ies-pipe">|</span><Badge className="ies-orangecolorbg capitalize" pill> {carrerSelected ? carrerSelected.MODALIDAD.toLowerCase() : ""} </Badge></p>
                                <p>{academic.datosBeca ? (
                                    academic.datosBeca.porcentaje > 0? (
                                        "Beca "+academic.datosBeca.porcentaje+"% para el Periodo "+academic.datosBeca.semestre+"/"+academic.datosBeca.anio
                                    ):""
                                ):""}</p>
                            </div>
                            <div className="ies-nexicomycarrer ies-conttextmycarrer">
                            </div>
                        </div>
                </>
            ): ""}

            {
                academic ? (
                    <>
                        {showTable(academic.materiasEnCurso) ? (
                            <>
                                <br/><br/><br/>
                                <h4>Asignaturas en curso</h4><br/>
                                <div className="ies-shadow table-responsive">
                                    <Table className="table-borderless align-middle table-nowrap mb-0 ies-tableanalitico ">
                                        <thead>
                                            <tr>
                                                <th scope="col">Semestre</th>
                                                <th scope="col">Asignatura</th>
                                                <th scope="col">Fecha cursado</th>
                                                <th scope="col">Modalidad</th>
                                                <th scope="col">Nota 1</th>
                                                <th scope="col">Nota 2</th>
                                                <th scope="col">Nota 3</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {academic.materiasEnCurso ? (academic.materiasEnCurso.map(el => (
                                                    <tr key={el.materia}>
                                                        <td>
                                                            {el.cuatrimestre}
                                                        </td>
                                                        <td>
                                                            {el.materia}
                                                        </td>
                                                        <td>
                                                            {el.fechaCursadoMateria}
                                                        </td>
                                                        <td>
                                                            {el.idModalidad}
                                                        </td>
                                                        <td>
                                                            {el.nota1 ? el.nota1 : '-'}
                                                        </td>
                                                        <td>
                                                            {el.nota2 ? el.nota2 : '-'}
                                                        </td>
                                                        <td>
                                                            {el.nota3 ? el.nota3 : '-'}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) :""}
                                        </tbody>
                                    </Table>
                                    <div className="ies-analitico-botTable">
                                        <div className="ies-spacebtw">
                                        {academic.materiasLibres ? (
                                            <>
                                                <span className="ies-bold">TOTAL EN CURSO:</span> {academic.materiasEnCurso.length+" asignatura"+(academic.materiasEnCurso.length>1?"s":"")}
                                            </>
                                        ):""}
                                            
                                        </div>
                                    </div>
                                </div>
                            </>
                        ):""}

                        {showTable(academic.materiasRendidas) ? (
                            <>
                                <br/><br/>
                                <h4>Asignaturas rendidas</h4><br/>
                                <div className="ies-shadow table-responsive">
                                    <Table className="table-borderless align-middle table-nowrap mb-0 ies-tableanalitico ">
                                        <thead>
                                            <tr>
                                                <th scope="col">Semestre</th>
                                                <th scope="col">Asignatura</th>
                                                <th scope="col">Fecha</th>
                                                <th scope="col" className="text-center">Calificación</th>
                                                <th scope="col">Condición</th>
                                                <th scope="col">Tribunal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {academic.materiasRendidas ?  (
                                                academic.materiasRendidas.map(el => (
                                                    <tr key={el.materia.id}>
                                                        <td>
                                                            {el.cuatrimestre}
                                                        </td>
                                                        <td>
                                                            {el.materia.nombre}
                                                        </td>
                                                        <td>
                                                            {el.fecha ? (fdate(el.fecha.fechaExamen)+" "+el.fecha.horaExamen): ""}
                                                        </td>
                                                        <td className="text-center">
                                                            {el.calificacionMateria ? el.calificacionMateria : 0}
                                                        </td>
                                                        <td>
                                                            {el.condicionMateria}
                                                        </td>
                                                        <td>
                                                            <button onClick={()=>tog_center(el.tribunal)} className="btn">

                                                            <i className="ies-bico ri-team-line ies-lk" ></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                                ) : ""}
                                        </tbody>
                                    </Table>
                                    <div className="ies-analitico-botTable">
                                        {
                                            academic.totales ? (
                                            <>
                                                <div className="ies-spacebtw">
                                                    <span className="ies-bold">PROMEDIO SIN APLAZOS:</span> {formatNumberArg(academic.totales.promedioSinAplazos)}
                                                </div>
                                                <div className="ies-spacebtw">
                                                    <span className="ies-bold">PROMEDIO CON APLAZOS:</span> {formatNumberArg(academic.totales.promedioConAplazos)}
                                                </div>
                                                <div className="ies-spacebtw">
                                                    <span className="ies-bold">TOTAL EQUIVALENTES:</span> {academic.totales.totalEquivaliencias}
                                                </div>
                                                <div className="ies-spacebtw">
                                                    <span className="ies-bold">TOTAL APLAZOS:</span> {academic.totales.totalAplazos}
                                                </div>
                                                <div className="ies-spacebtw">
                                                    <span className="ies-bold">TOTAL APROBADAS:</span> {academic.totales.aprobadas}
                                                </div>
                                            </>):""
                                        }
                                        
                                    </div>
                                </div>
                            </>
                        ):""}
                        

                        {showTable(academic.equivalencias) ? (
                            <>
                                <br/><br/><br/>
                                <h4>Equivalencias</h4><br/>
                                <div className="ies-shadow table-responsive">
                                    <Table className="table-borderless align-middle table-nowrap mb-0 ies-tableanalitico">
                                        <thead>
                                            <tr>
                                                <th scope="col">Semestre</th>
                                                <th scope="col">Asignatura</th>
                                                <th scope="col">Establecimiento</th>
                                                <th scope="col">Año</th>
                                                {/*<th scope="col">Inicio de cursado</th>
                                                <th scope="col">Fin de cursado</th>*/}
                                                <th scope="col">Calificación</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {academic.equivalencias ? (academic.equivalencias.map(el => (
                                                    <tr key={el.ID_MATERIA}>
                                                        <td>
                                                            {el.SEMESTRE}
                                                        </td>
                                                        <td>
                                                            {el.MATERIA}
                                                        </td>
                                                        <td>
                                                            {el.ESTABLECIMIENTO}
                                                        </td>
                                                        <td>
                                                            {el["AÑO"]}
                                                        </td>
                                                        <td>
                                                            {formatNumberArg(el.CALIFICACION ? el.CALIFICACION:0)}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) :""}
                                        </tbody>
                                    </Table>
                                </div>
                            </>
                        ):""}
                        
                        
                        {showTable(academic.materiasRegularizadas) ? (
                            <>
                                <br/><br/><br/>
                                <h4>Asignaturas regularizadas</h4><br/>

                                <div className="ies-shadow table-responsive">
                                    <Table className="table-borderless align-middle table-nowrap mb-0 ies-tableanalitico">
                                        <thead>
                                            <tr>
                                                <th scope="col">Semestre</th>
                                                <th scope="col">Asignatura</th>
                                                <th scope="col">Fin de cursado</th>
                                                <th scope="col">Ctro. Ext.</th>
                                                <th scope="col">1° I.E</th>
                                                <th scope="col">2° I.E</th>
                                                <th scope="col">T.P</th>
                                                <th scope="col">Recuperatorio</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {academic.materiasRegularizadas ?
                                                academic.materiasRegularizadas.map(el => (
                                                    <tr key={el.materia}>
                                                        <td>
                                                            {el.SEMESTRE}
                                                        </td>
                                                        <td>
                                                            {el.MATERIA}
                                                        </td>
                                                        <td>
                                                            {el.FECHA_REGULARIDAD}
                                                        </td>
                                                        <td>
                                                            {el.ID_CTROEXT}
                                                        </td>
                                                        <td>
                                                            {el.NOTA1 ? el.NOTA1:"-"}
                                                        </td>
                                                        <td>
                                                            {el.NOTA2 ? el.NOTA2:"-"}
                                                        </td>
                                                        <td>
                                                            {el.NOTA3 ? el.NOTA3:"-"}
                                                        </td>
                                                        <td>
                                                            {el.RECUP ? el.RECUP:"-"}
                                                        </td>
                                                    </tr>
                                                ))
                                            :""}
                                        </tbody>
                                    </Table>
                                    <div className="ies-analitico-botTable">
                                        <div className="ies-spacebtw">
                                            {academic.materiasRegularizadas ? (
                                                <>
                                                    <span className="ies-bold">TOTAL REGULARIZADAS:</span> {academic.materiasRegularizadas.length+" asignatura"+(academic.materiasRegularizadas.length>1?"s":"")}
                                                </>
                                            ):""}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ):""}
                        

                        {showTable(academic.materiasLibres) ? (
                            <>
                                <br/><br/><br/>
                                <h4>Asignaturas libres</h4><br/>
                                <div className="ies-shadow table-responsive">
                                    <Table className="table-borderless align-middle table-nowrap mb-0 ies-tableanalitico">
                                        <thead>
                                            <tr>
                                                <th scope="col">Semana</th>
                                                <th scope="col">Asignatura</th>
                                                <th scope="col">Fin de cursado</th>
                                                <th scope="col">Estado</th>
                                                <th scope="col">Ctro. Ext.</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {academic.materiasLibres ? (academic.materiasLibres.map(el => (
                                                    <tr key={el.MATERIA}>
                                                        <td>
                                                            {el.CUATRIMESTRE}
                                                        </td>
                                                        <td>
                                                            {el.MATERIA}
                                                        </td>
                                                        <td>
                                                            {el.FECHA_REGULARIDAD}
                                                        </td>
                                                        <td>
                                                            {el.estado_materia ? el.estado_materia:'-'}
                                                        </td>
                                                        <td>
                                                            {el.ID_CTROEXT}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) :""}
                                        </tbody>
                                    </Table>
                                    <div className="ies-analitico-botTable">
                                        <div className="ies-spacebtw">
                                        {academic.materiasLibres ? (
                                            <>
                                                <span className="ies-bold">TOTAL LIBRES:</span> {academic.materiasLibres.length+" asignatura"+(academic.materiasLibres.length>1?"s":"")}
                                            </>
                                        ):""}
                                            
                                        </div>
                                    </div>
                                </div>
                            </>
                        ):""}

                        {showTable(academic.materiasPreinscriptas) ? (
                            <>
                                <br/><br/><br/>
                                <h4>Asignaturas preinscriptas</h4><br/>
                                <div className="ies-shadow table-responsive">
                                    <Table className="table-borderless align-middle table-nowrap mb-0 ies-tableanalitico">
                                        <thead>
                                            <tr>
                                                <th scope="col">Semestre</th>
                                                <th scope="col">Asignatura</th>
                                                <th scope="col">Ctro. Ext.</th>
                                                <th scope="col">Modalidad</th>
                                                {/*<th scope="col">Inicio de cursado</th>
                                                <th scope="col">Fin de cursado</th>*/}
                                                <th scope="col">Valor</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {academic.materiasPreinscriptas ? (academic.materiasPreinscriptas.map(el => (
                                                    <tr key={el.Id_Materia}>
                                                        <td>
                                                            {el.Cuatrimestre}
                                                        </td>
                                                        <td>
                                                            {el.Materia}
                                                        </td>
                                                        <td>
                                                            {el.ID_CTROEXT}
                                                        </td>
                                                        <td>
                                                            {el.Modalidad}
                                                        </td>
                                                        <td>
                                                            ${formatNumberArg(el.Valor_Materia)}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) :""}
                                        </tbody>
                                    </Table>
                                    <div className="ies-analitico-botTable">
                                        <div className="ies-spacebtw">
                                            <span className="ies-bold">TOTAL A PAGAR:</span> $ {totalPreinsc()}
                                        </div>
                                        <div className="ies-spacebtw">
                                            <span className="ies-bold">VALOR MATERIAS:</span> $ {getValorMat()}
                                        </div>
                                        {/*<div className="ies-spacebtw">
                                            <span className="ies-bold">VALOR DE EQUIVALENCIAS:</span> $ 0,00
                                            </div>*/}
                                        <div className="ies-spacebtw">
                                            <span className="ies-bold">VALOR DE MATRICULA:</span> $ {getMatricula()}
                                        </div>
                                        <div className="ies-spacebtw">
                                            <span className="ies-bold">TOTAL PREINCRIPTAS:</span> {academic.materiasPreinscriptas.length} asignaturas
                                        </div>
                                    </div>
                                </div>
                            </>
                        ):""}
                    </>
                ):""
            }
            
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
