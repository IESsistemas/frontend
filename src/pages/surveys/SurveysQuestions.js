import React, { useEffect, useState } from 'react'
import { getSurveyQuestions as onGetSurveyQuestions, getSurvey as onGetSurvey, sendAnswers as onSendAnswers } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import { json, useParams, useNavigate  } from 'react-router-dom';
import withRouter from '../../Components/Common/withRouter';


const SurveysQuestions = (props) => {
  document.title = "IES - Encuesta";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, materia } = useParams();

  const { token, survey, questions } = useSelector(state => ({
    token: state.Login.userData.user,
    questions: state.Survey.questions?.[0]?.questions || [],
    survey: state.Survey.survey

  }))

  var idQuestLoad = true;

  const allSurvey = survey.filter(item => item.ID_ENCUESTA === Number(id))

  useEffect(() => {
    dispatch(onGetSurveyQuestions(id, token))
    dispatch(onGetSurvey(token))
    if(idQuestLoad){
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          if(idQuestLoad){
            window.loading(true);
          }
        }, 100+i*100);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      if(questions.length > 0)idQuestLoad = false;
    } catch (error) {console.log(error)}
  }, [questions]);


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];

  const [currentTextareaAnswer, setCurrentTextareaAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [allowNext, setAllowNext] = useState(false);

  useEffect(() => {
    const hasSelectedAnswer = !!answers[currentQuestionIndex];
    setAllowNext(hasSelectedAnswer);
  }, [answers, currentQuestionIndex]);


  const handleAnswerChange = (event) => {
    const { value, type, checked } = event.target;

    if (type === 'radio') {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestionIndex]: value,
      }));
    } else if (type === 'checkbox') {
      setAnswers((prevAnswers) => {
        const updatedAnswers = { ...prevAnswers };
        const currentAnswers = updatedAnswers[currentQuestionIndex] || [];

        if (checked) {
          // Add the answer if it's checked and not already in the array
          updatedAnswers[currentQuestionIndex] = [...currentAnswers, value];
        } else {
          // Remove the answer if it's unchecked
          updatedAnswers[currentQuestionIndex] = currentAnswers.filter(
            (answer) => answer !== value
          );
        }
        return updatedAnswers;
      });
    } else if (type === 'textarea') {

      const response = {
        id_encuesta: currentQuestion.id_encuesta,
        id_grupopreg: currentQuestion.id_grupopreg,
        id_pregunta: currentQuestion.id_pregunta,
        id_respuesta: null,
        descripcion: value,
        orden: 1
      }
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestionIndex]: response,
      }));

    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };
  const handleBackQuestion = () => {
    if (currentQuestionIndex < questions.length > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };


  const sendSurvey = () => {

    const formattedAnswers = Object.values(answers).map(item => {

      if (typeof item === 'string') {
        return JSON.parse(item)
      }
      if (Array.isArray(item)) {
        return item.map(data => JSON.parse(data))
      }

      return item
    }).flat()


    const surveyInformation = survey.filter(item => item.Id_Materia === Number(materia))

    const addAnswers = {
      idEncuesta: surveyInformation[0].ID_ENCUESTA,
      idCtroExt: surveyInformation[0].Id_CtroExt,
      idModalidad: surveyInformation[0].Id_modalidad,
      idCarrera: surveyInformation[0].Id_Carrera,
      idMateria: surveyInformation[0].Id_Materia,
      idComision: surveyInformation[0].Id_comision,
      answers: formattedAnswers
    }

    dispatch(onSendAnswers(addAnswers, props.router.navigate))
  }



  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
        <h4 className="mb-4">{allSurvey[0].nom_encuesta}</h4>
          <p>Preguntas sobre el desempeño del profesor y la dinámica de la clase.</p>
          <br />
          {
            currentQuestion &&
            <div className="card ies-cardlimit">
              <br />
              <div>

                <button
                  className="rounded-circle ies-avatarcircleico ies-aliceblue ies-fright ies-nextprev ies-spmrgm4"
                  onClick={handleNextQuestion} disabled={!allowNext}
                >
                  <p className="ies-tr20">{">"}</p>
                </button>
                {
                  currentQuestionIndex > 0 &&
                 
                  <button
                    className="rounded-circle ies-avatarcircleico ies-aliceblue ies-fright ies-nextprev ies-spmrgm4"
                    onClick={handleBackQuestion}
                  >
                    <p className="ies-tr20">{"<"}</p>
                  </button>
                }


                {
                  currentQuestion && <h4 className="ies-quest">{currentQuestion.descripcion}</h4>
                }


              </div>
              <hr />
              <div>
                <div className="progress animated-progress">
                  <div
                    className="progress-bar bg-primary ies-green"
                    role="progressbar"
                    style={{ width: `${((currentQuestionIndex + 1) / (questions ? questions.length : 100)) * 100}%` }}
                    aria-valuenow={currentQuestionIndex + 1}
                    aria-valuemin="0"
                    aria-valuemax={(questions ? questions.length : 100)}
                  ></div>
                </div>
              </div>
              <br /><br />
              <div>

                {
                  currentQuestion && currentQuestion.tipo === 'U' &&
                  currentQuestion.answers.map(answer => (
                    <div className="form-check mb-2" key={answer.orden}>
                      <input
                        className="form-check-input"
                        type="radio"
                        id={`formCheck${answer.id_respuesta}`}
                        name={currentQuestionIndex}
                        value={JSON.stringify(answer)}
                        checked={answers[currentQuestionIndex] === JSON.stringify(answer)} // Verificar si esta es la respuesta seleccionada
                        onChange={handleAnswerChange}
                      />
                      <label className="form-check-label" htmlFor={`formCheck${answer.id_respuesta}`}>
                        {answer.descripcion}
                      </label>
                    </div>
                  ))
                }
                {
                  currentQuestion && currentQuestion.tipo === 'M' &&
                  currentQuestion.answers.map((answer) => (
                    <div className="form-check mb-2" key={answer.orden}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`formCheck${answer.id_respuesta}`}
                        name={currentQuestionIndex}
                        value={JSON.stringify(answer)}
                        //checked={answers[currentQuestionIndex]} 
                        checked={answers[currentQuestionIndex] && answers[currentQuestionIndex].includes(JSON.stringify(answer))}
                        onChange={handleAnswerChange}
                      />
                      <label className="form-check-label" htmlFor={`formCheck${answer.id_respuesta}`}>
                        {answer.descripcion}
                      </label>
                    </div>
                  ))
                }
                {
                  currentQuestion && currentQuestion.tipo === 'T' &&
                  (
                    <textarea
                      className="form-control"
                      id={`formCheck${currentQuestionIndex}`}
                      rows="3"
                      placeholder="Escriba su mensaje..."
                      value={answers[currentQuestionIndex]?.descripcion || ''} // Obtener el valor almacenado en el array
                      onChange={handleAnswerChange}
                    />
                  )
                }
              </div>

              <div className="mt-4 text-center">
                <div><br />
                  <div className="ies_tar">
                    <button color="info" className="btn btn-outline-info ies_mr10" onClick={() => navigate(-1)}>Cancelar</button>

                    <button className="btn btn-success" disabled={currentQuestionIndex < questions.length - 1} onClick={sendSurvey}>Finalizar</button>

                  </div>
                </div>
              </div>
            </div>
          }

        </Container>
      </div>
    </React.Fragment>
  );
}
export default withRouter(SurveysQuestions);