//ies
import suggestions from './Suggestions/saga'
import fileDocumentation from './fileDocumentation/saga'
import survey from "./survey/saga"
import software from './software/saga'
import regulation from './regulation/saga'
import doa from './doa/saga'
import AcademicSchedule from './misMaterias/academicSchedule/saga'
import VirtualLibrary from './misMaterias/virtualLibrary/saga'
import Absence from './misMaterias/absence/saga'
import Reincorporation from './misMaterias/reincorporation/saga'
import PaymentMethod from './misMaterias/paymentMethod/saga'
import PaymentButton from './misMaterias/PaymentButton/saga'
import ScholarshipApplication from './misMaterias/scholarshipApplication/saga'
import AcademicExceptions from './misMaterias/academicExceptions/saga'
import PromissoryNote from './misMaterias/promissoryNote/saga'
import Rapipago from './misMaterias/voucher/saga'
import MyCareer from './myCareer/saga'
import CourseRegistration from './misExamenes/courseRegistration/saga'

import SchedulesSubjects from './misMaterias/schedulesSubjects/saga'
import Partials from './distanceCourses/partials/saga'
import CreditCard from './misMaterias/creditCard/saga'
import CheckServe from './distanceCourses/dashboard/saga'
import { all, fork } from "redux-saga/effects";
//layout
import LayoutSaga from "./layouts/saga";
//Auth
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";


import Exams from "./misExamenes/examModels/saga";
//calendar
import calendarSaga from "./calendar/saga";
//chat
import chatSaga from "./chat/saga";
//ecommerce
import ecommerceSaga from "./ecommerce/saga";

//Project
import projectSaga from "./projects/saga";
// Task
import taskSaga from "./tasks/saga";
// Crypto
import cryptoSaga from "./crypto/saga";
//TicketsList
import ticketsSaga from "./tickets/saga";

//crm
import crmSaga from "./crm/saga";
//invoice
import invoiceSaga from "./invoice/saga";
//mailbox
import mailboxSaga from "./mailbox/saga";

// Dashboard Analytics
import dashboardAnalyticsSaga from "./dashboardAnalytics/saga";

// Dashboard CRM
import dashboardCrmSaga from "./dashboardCRM/saga";

// Dashboard Ecommerce
import dashboardEcommerceSaga from "./dashboardEcommerce/saga";

// Dashboard Crypto
import dashboardCryptoSaga from "./dashboardCrypto/saga";

// Dashboard Project
import dashboardProjectSaga from "./dashboardProject/saga";

// Dashboard NFT
import dashboardNFTSaga from "./dashboardNFT/saga";

// Pages > Team
import teamSaga from "./team/saga";

// File Manager
import fileManager from "./fileManager/saga";

// To do
import todos from "./todos/saga";
//Jobs
import ApplicationSaga from "./job/saga";
//API Key
import APIKeysaga from "./apikey/saga";
//Profile
import ProgileSaga from "./profile/saga";
//Yoenies
import Yoenies from "./yoenies/saga";

import MisMaterias from "./misMaterias/analytic/saga";
//Global
import GlobalSaga from "./global/saga";

export default function* rootSaga() {
  yield all([
    //ies
    fork(suggestions),
    fork(fileDocumentation),
    fork(survey),
    fork(software),
    fork(regulation),
    fork(doa),
    fork(AcademicSchedule),
    fork(VirtualLibrary),
    fork(Absence),
    fork(Partials),
    fork(Reincorporation),
    fork(PaymentMethod),
    fork(PaymentButton),
    fork(ScholarshipApplication),
    fork(AcademicExceptions),
    fork(PromissoryNote),
    fork(SchedulesSubjects),
    fork(CreditCard),
    fork(CheckServe),
    fork(Rapipago),
    fork(MyCareer),
    fork(CourseRegistration),
    fork(Exams),
    //public
    fork(LayoutSaga),
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(chatSaga),
    fork(projectSaga),
    fork(taskSaga),
    fork(cryptoSaga),
    fork(ticketsSaga),
    fork(calendarSaga),
    fork(ecommerceSaga),
    fork(crmSaga),
    fork(invoiceSaga),
    fork(mailboxSaga),
    fork(dashboardAnalyticsSaga),
    fork(dashboardCrmSaga),
    fork(dashboardEcommerceSaga),
    fork(dashboardCryptoSaga),
    fork(dashboardProjectSaga),
    fork(dashboardNFTSaga),
    fork(teamSaga),
    fork(fileManager),
    fork(todos),
    fork(ApplicationSaga),
    fork(APIKeysaga),
    fork(ProgileSaga),
    fork(GlobalSaga),
    fork(Yoenies),
    fork(MisMaterias)
  ]);
}
