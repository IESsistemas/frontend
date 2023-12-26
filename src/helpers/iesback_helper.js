import { APIClient } from "./api_helper";
import * as url from "./iesurl_helper";

const api = new APIClient();

const getToken = ()=>{
    try {
        return JSON.parse(sessionStorage.getItem("authUser"));
    } catch (error) {
        return "";
    }
}

export const postLogin = (data) => api.requestPostNoAuth(url.POST_LOGIN, data);

export const postForgetPwd = (data) => api.requestPostNoAuth(url.POST_PASSWORD_FORGET, data);

export const getHome = (token) => api.requestGetAuth(url.GET_HOME, token);
export const getCredentials = (token) => api.requestGetAuth(url.GET_CREDENTIALS, token);

//SUGGESTS
export const sendSuggestions = (data) => api.requestPostNoAuth(`${url.POST_SUGGESTIONS}`, data);

//ANSWERS
export const sendAnswers = (data) => api.requestPostAuth(`${url.POST_ANSWERS}`, getToken(), data);


//GET
export const getAreas = () => api.requestGetNoAuth(url.GET_AREAS)    
export const getFileDocumentation = (token) => api.requestGetAuth(url.GET_FILE_DOCUMENTATION, token)
export const getSurveys = () => api.requestGetAuth(url.GET_SURVEY, getToken())
export const getSurveysQuestions = (id, token) =>  api.requestGetAuth(url.GET_SURVEY_QUESTIONS.replace("#ID", id), token)

export const getSoftware = () => api.requestGetAuth(url.GET_SOFTWARE, getToken())   
export const getCheckInterview = (token) => api.requestGetAuth(url.GET_CHECK_INTERVIEW, getToken()) 
export const getInterviewDoa = (token) => api.requestGetAuth(url.GET_INTERVIEW_DOA, getToken())   


export const postChangeEmail = (data) => api.requestPostAuth(url.POST_CHANGEEMAIL, getToken(), data);

export const getCounties = () => api.requestGetNoAuth(url.GET_COUNTIES);
export const getProvinces = (id) => api.requestGetNoAuth(url.GET_PROVINCES.replace("#ID", id));
export const getLocalities = (id) => api.requestGetNoAuth(url.GET_LOCALITIES.replace("#ID", id));
export const getNeighbours = (id) => api.requestGetNoAuth(url.GET_NEIGHBOURS.replace("#ID", id));

export const getPersonalInfo = () => api.requestGetAuth(url.GET_PERSONALINFO, getToken());

export const postAddAddress = (data) => api.requestPostAuth(url.POST_ADDADDRESS, getToken(), data);
export const putUpdateAddress = (data) => api.requestPutAuth(url.PUT_UPDATEADDRESS, getToken(), data);
export const deleteAddress = (data) => api.requestDeleteAuth(url.DELETE_ADDRESS, getToken(), data);

export const addRequestSoftware = (data) => api.requestPostAuth(url.POST_ADD_REQUEST_SOFTWARE, getToken(), data);
export const postAddPhone = (data) => api.requestPostAuth(url.POST_ADDPHONE, getToken(), data);
export const putUpdatePhone = (data) => api.requestPutAuth(url.PUT_UPDATEPHONE, getToken(), data);
export const deletePhone = (data) => api.requestDeleteAuth(url.DELETE_PHONE, getToken(), data);

export const getAccountStatus = () => api.requestGetAuth(url.GET_ACCOUNTSTATUS, getToken());

export const postCertificateRequest = (data) => api.requestPostAuth(url.POST_CERTIFICATE_REQUEST, getToken(), data);
export const postChangePassRequest = (data) => api.requestPostAuth(url.POST_CHANGEPASS, getToken(), data);
//regulation
export const postRai = (data) => api.requestPostAuth(url.POST_REGULATION, getToken(), data);

//DOA
export const postApplyInterview = (data) => api.requestPostAuth(url.POST_APPLY_INTERVIEW, getToken(), data);
export const putCancelInterview = (data) => api.requestPutAuth(url.PUT_CANCEL_INTERVIEW, getToken(), data);

//MIS MATERIAS - ANALITICO
export const postGetAcademicTranscript = (data) => api.requestPostAuth(url.POST_ACADEMICTRANSCRIPTS, getToken(), data);
export const getSchedule = () => api.requestGetAuth(url.GET_SCHEDULE, getToken());
export const getVirtualLibrary = (id) => api.requestGetAuth(url.GET_LIBRARY.replace("#ID", id), getToken())
export const getAbsence = (id) => api.requestGetAuth(url.GET_ABSENCE.replace("#ID", id), getToken())
export const getPartial = () => api.requestGetAuth(url.GET_PARTIAL, getToken())
export const getPartialCies = (id) => api.requestGetAuth(url.GET_PARTIAL_CIES.replace("#ID", id), getToken())
export const getPartialDownload = (id) => api.requestGetAuth(url.GET_DOWNLOAD_PARTIAL.replace("#ID", id), getToken())
export const postPartialCiesDownload = (data) => api.requestPostAuth(url.GET_DOWNLOAD_PARTIAL_CIES, getToken(), data)
export const postPartialUpload = (file) => api.requestPostAuth(url.POST_UPLOAD_PARTIAL.replace("#FILE", file), getToken());
export const postPartialUploadCies = (info, data) => api.requestPostAuth(url.POST_UPLOAD_PARTIAL_CIES.replace("#INFO", info), getToken(), data);   ///
export const getReincorporation = (id) => api.requestGetAuth(url.GET_REINCORPORATION.replace("#ID", id), getToken())
export const sendReincorporation = (data) => api.requestPostAuth(url.POST_REINCORPORATION, getToken(), data)
export const getScholarshipData = (id) => api.requestGetAuth(url.GET_SCHOLARSHIP_DATA.replace("#ID", id), getToken())
export const getAcademicExceptionConditional = (id) => api.requestPostAuth(url.GET_ACADEMIC_EXCEPTION_CONDITIONAL.replace("#ID", id), getToken())
export const getAcademicExceptionListener = (id) => api.requestPostAuth(url.GET_ACADEMIC_EXCEPTION_LISTENER.replace("#ID", id), getToken())
export const getAcademicAnotherCareer = (id) => api.requestPostAuth(url.GET_ACADEMIC_ANOTHER_CAREER_SUCCESS.replace("#ID", id), getToken())
export const postExceptionAcademic = (data) => api.requestPostAuth(url.POST_EXCEPTION, getToken(), data)
export const getCommission = (params) => api.requestGetAuth(url.GET_COMMISSIONS.replace("#PARAMS", params), getToken())
export const getExceptionProcessed = () => api.requestGetAuth(url.GET_EXCEPTION_PROCESSED, getToken())

export const getPromissoryNote = (id) => api.requestGetAuth(url.GET_PROMISSORY_NOTE.replace("#ID", id), getToken())
export const postPromissoryNote = (data) => api.requestPostAuth(url.POST_PROMISSORY_NOTE_CARD, getToken(), data);
export const getInfoPromissoryNote = () => api.requestGetAuth(url.GET_INFO_PROMISSORY_NOTE_CARD, getToken());
export const getScheduleSubjects = (id) => api.requestPostAuth(url.GET_SCHEDULE_SUBJECTS.replace("#ID", id), getToken());
export const getInscritionData = (id) => api.requestGetAuth(url.GET_INSCRIPTION_DATA.replace("#ID", id), getToken());
export const getInscritionPaymentData = () => api.requestGetAuth(url.GET_INSCRIPTION_PAYMENT_DATA, getToken());
export const getPaymentsPending = () => api.requestGetAuth(url.GET_PAYMENTS_PENDING, getToken())
export const getRejectedCard = () => api.requestGetAuth(url.GET_REJECTED_CARD, getToken())

export const getCheckServer = () => api.requestGetAuth(url.GET_CHECK_SERVE, getToken())
export const getRapipago = () => api.requestGetAuth(url.GET_RAPIPAGO, getToken())
export const postBarcode = () => api.requestPostAuth(url.POST_BARCODE, getToken())

export const getCourseRegistrationInfo = (id) => api.requestGetAuth(url.GET_COURSE_REGISTRATION_INFO.replace("#ID", id), getToken())
export const getExamModels = () => api.requestGetAuth(url.GET_EXAM_MODEL, getToken())
export const getDownloadExam = (file) => api.requestGetAuth(url.GET_DOWNLOAD_EXAM.replace("#FILE", file), getToken())


export const getMessages = () => api.requestGetAuth(url.GET_MESSAGES, getToken())
export const postCreditCard = (data) => api.requestPostAuth(url.POST_CREDIT_CARD, getToken(), data);
export const getPaymentMethod = () => api.requestGetAuth(url.GET_PAYMENT_METHOD, getToken())
export const postPaymentButton = (data) => api.requestPostAuth(url.POST_PAYMENT_BUTTON, getToken(), data);
