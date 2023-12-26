import { combineReducers } from "redux";

//IES
import Suggestions from "./Suggestions/reducer";
import FileDocumentation from "./fileDocumentation/reducer";
import Survey from "./survey/reducer"
import Software from './software/reducer'
import Regulation from './regulation/reducer'
import Doa from './doa/reducer'
import AcademicSchedule from './misMaterias/academicSchedule/reducer'
import VirtualLibrary from "./misMaterias/virtualLibrary/reducer";
import Absence from "./misMaterias/absence/reducer";
import Partials from "./distanceCourses/partials/reducer";
import Reincorporation from "./misMaterias/reincorporation/reducer";
import PaymentMethod from "./misMaterias/paymentMethod/reducer";
import PaymentButton from "./misMaterias/PaymentButton/reducer";
import ScholarshipApplication from "./misMaterias/scholarshipApplication/reducer";
import AcademicExceptions from "./misMaterias/academicExceptions/reducer";
import PromissoryNote from "./misMaterias/promissoryNote/reducer";
import SchedulesSubjects from "./misMaterias/schedulesSubjects/reducer";
import CreditCard from "./misMaterias/creditCard/reducer";
import CheckServe from "./distanceCourses/dashboard/reducer";
import Rapipago from "./misMaterias/voucher/reducer";
import MyCareer from "./myCareer/reducer";
import CourseRegistration from './misExamenes/courseRegistration/reducer'

import Exams from './misExamenes/examModels/reducer'

// Front
import Layout from "./layouts/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";

//Calendar
import Calendar from "./calendar/reducer";
//Chat
import chat from "./chat/reducer";
//Ecommerce
import Ecommerce from "./ecommerce/reducer";

//Project
import Projects from "./projects/reducer";

// Tasks
import Tasks from "./tasks/reducer";
//Form advanced
import changeNumber from "./formAdvanced/reducer";

//Crypto
import Crypto from "./crypto/reducer";

//TicketsList
import Tickets from "./tickets/reducer";
//Crm
import Crm from "./crm/reducer";

//Invoice
import Invoice from "./invoice/reducer";

//Mailbox
import Mailbox from "./mailbox/reducer";

// Dashboard Analytics
import DashboardAnalytics from "./dashboardAnalytics/reducer";

// Dashboard CRM
import DashboardCRM from "./dashboardCRM/reducer";

// Dashboard Ecommerce
import DashboardEcommerce from "./dashboardEcommerce/reducer";

// Dashboard Cryto
import DashboardCrypto from "./dashboardCrypto/reducer";

// Dashboard Cryto
import DashboardProject from "./dashboardProject/reducer";

// Dashboard NFT
import DashboardNFT from "./dashboardNFT/reducer";

// Pages > Team
import Team from "./team/reducer";

// File Manager
import FileManager from "./fileManager/reducer";

// To do
import Todos from "./todos/reducer";
//Jobs
import Jobs from "./job/reducer";
//API Key
import APIKey from "./apikey/reducer";
//Profile
import Profile from "./profile/reducer";


//Profile
import MisMaterias from "./misMaterias/analytic/reducer";

//Yoenies
import Yoenies from "./yoenies/reducer";
//Global
import Global from "./global/reducer";
const rootReducer = combineReducers({

  //ies
  Suggestions,
  FileDocumentation,
  Survey,
  Software,
  Regulation,
  Doa,
  AcademicSchedule,
  VirtualLibrary,
  Absence,
  Partials,
  Reincorporation,
  PaymentMethod,
  PaymentButton,
  ScholarshipApplication,
  AcademicExceptions,
  PromissoryNote,
  SchedulesSubjects,
  CreditCard,
  CheckServe,
  Rapipago,
  MyCareer,
  CourseRegistration,
  Exams,
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  Yoenies,
  MisMaterias,
  Calendar,
  chat,
  Projects,
  Ecommerce,
  Tasks,
  changeNumber,
  Crypto,
  Tickets,
  Crm,
  Invoice,
  Mailbox,
  DashboardAnalytics,
  DashboardCRM,
  DashboardEcommerce,
  DashboardCrypto,
  DashboardProject,
  DashboardNFT,
  Team,
  FileManager,
  Todos,
  Jobs,
  APIKey,
  Global,
});

export default rootReducer;
