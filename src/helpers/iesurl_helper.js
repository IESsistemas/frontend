export const POST_LOGIN = "/students/login";

//FORGET_PASSWORD
export const POST_PASSWORD_FORGET = "/students/forgot-password";

//RESET
export const GET_HOME = "/students/home";
export const GET_CREDENTIALS = '/students/get-credential'
export const POST_CHANGEEMAIL = '/students/add-new-email-student'
export const GET_COUNTIES = "/students/get-countries";
export const GET_PROVINCES = "/students/get-provinces/#ID";
export const GET_LOCALITIES = "/students/get-localities/#ID";
export const GET_NEIGHBOURS = "/students/get-neighbours/#ID";
export const GET_PERSONALINFO = "/students/personal-info";
export const POST_ADDADDRESS = "/students/add-new-address";
export const PUT_UPDATEADDRESS = "/students/update-address";
export const DELETE_ADDRESS = "/students/delete-address";
export const POST_ADDPHONE = "/students/add-new-phone-student";
export const PUT_UPDATEPHONE = "/students/update-phone";
export const DELETE_PHONE = "/students/delete-phone";
export const GET_ACCOUNTSTATUS = "/students/account-statement";
export const POST_CERTIFICATE_REQUEST = "/students/certificate-request";
export const POST_CHANGEPASS = "/students/change-password"
export const POST_ACADEMICTRANSCRIPTS = "/students/academic-transcripts"

export const POST_CREDIT_CARD = "/students/paymentMethods/credit-card"
export const POST_PAYMENT_BUTTON = "/students/macro-bank"

export const POST_REGULATION = "/students/rai-sign"
export const POST_APPLY_INTERVIEW = "/students/apply-interview-doa/"


//SUGGESTIONS
export const POST_SUGGESTIONS = "/students/complaints-suggestions";

//SURVEYS
export const POST_ANSWERS = "/students/add-answer-survey/"
export const POST_ADD_REQUEST_SOFTWARE = "/students/send-email-request-software";

//GET
export const GET_AREAS = "/students/get-areas/M";
export const GET_FILE_DOCUMENTATION = "/students/get-documentation-file/5";
export const GET_SOFTWARE = "/students/get-request-software/"
export const GET_CHECK_INTERVIEW = '/students/check-interview-doa/'
export const GET_INTERVIEW_DOA = '/students/get-interview-doa-available/'
export const GET_SCHEDULE = '/students/get-semestral-schedule'
export const GET_SURVEY = "/students/get-surveys";
export const GET_SURVEY_QUESTIONS = "/students/get-surveys-questions/#ID";
export const GET_LIBRARY = "/students/get-virtual-library/#ID";
export const GET_ABSENCE = "/students/get-absense/#ID";
export const GET_PARTIAL = "/students/get-parcial";
export const GET_PARTIAL_CIES = "/students/v2/exams-cies/#ID";
export const GET_DOWNLOAD_PARTIAL = "/students/download-parcial/#ID";
export const GET_DOWNLOAD_PARTIAL_CIES = "/students/v2/exams-cies/download";
export const POST_UPLOAD_PARTIAL = "/students/upload-parcial/#FILE";
export const POST_UPLOAD_PARTIAL_CIES = "students/v2/exams-cies/upload/#INFO";

export const GET_INSCRIPTION_DATA = "/students/semester-inscription/#ID";
export const GET_INSCRIPTION_PAYMENT_DATA = "/students/payment-way/";

export const GET_REINCORPORATION = "/students/get-reincorporation-info/#ID";
export const POST_REINCORPORATION = "/students/apply-reincorporation/";
export const GET_PAYMENT_METHOD = "/students/paymentMethods/";
export const GET_SCHOLARSHIP_DATA = "/students/get-scolarship-data/#ID";
export const GET_ACADEMIC_EXCEPTION_CONDITIONAL = "/students/academic-exceptions/1?idCareer=#ID";
export const GET_ACADEMIC_EXCEPTION_LISTENER = "/students/academic-exceptions/2?idCareer=#ID";
export const GET_ACADEMIC_ANOTHER_CAREER_SUCCESS = "/students/academic-exceptions/3?idCareer=#ID";
export const POST_EXCEPTION = "/students/academic-exceptions/send";
export const GET_COMMISSIONS = "/students/get-commissions?#PARAMS";
export const GET_EXCEPTION_PROCESSED = "/students/academic-exceptions-processed";
export const GET_PROMISSORY_NOTE = "/students/preregistered-subjects/#ID";
export const POST_PROMISSORY_NOTE_CARD = "/students/paymentMethods/promissory-note";
export const GET_INFO_PROMISSORY_NOTE_CARD = "/students/info-pagares";

export const GET_SCHEDULE_SUBJECTS = '/students/subject-schedule/#ID'
export const GET_PAYMENTS_PENDING = "/students/payments-pending-processing";
export const GET_REJECTED_CARD = "/students/rejected-cards";

export const GET_CHECK_SERVE = "/students/health-check";
export const GET_RAPIPAGO = "/students/rapipago/3"
export const POST_BARCODE = "/students/rapipago"
export const GET_COURSE_REGISTRATION_INFO = "/students/info-inscripcion-cursillo/#ID";
export const GET_EXAM_MODEL = "/students/modelos-examen";
export const GET_DOWNLOAD_EXAM = "/students/download-modelos-examen?fileName=#FILE";

export const GET_MESSAGES = "/students/messages";
//PUT
export const PUT_CANCEL_INTERVIEW = '/students/cancel-interview-doa/'
