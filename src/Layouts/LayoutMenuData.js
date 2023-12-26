import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isBaseUi, setIsBaseUi] = useState(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isMaps, setIsMaps] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);

  // Apps
  const [isEmail, setEmail] = useState(false);
  const [isSubEmail, setSubEmail] = useState(false);
  const [isEcommerce, setIsEcommerce] = useState(false);
  const [isProjects, setIsProjects] = useState(false);
  const [isTasks, setIsTasks] = useState(false);
  const [isCRM, setIsCRM] = useState(false);
  const [isCrypto, setIsCrypto] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
  const [isSupportTickets, setIsSupportTickets] = useState(false);
  const [isNFTMarketplace, setIsNFTMarketplace] = useState(false);
  const [isJobs, setIsJobs] = useState(false);
  const [isJobList, setIsJobList] = useState(false);
  const [isCandidateList, setIsCandidateList] = useState(false);

  // Authentication
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isPasswordCreate, setIsPasswordCreate] = useState(false);
  const [isLockScreen, setIsLockScreen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isError, setIsError] = useState(false);

  // Pages
  const [isProfile, setIsProfile] = useState(false);
  const [isLanding, setIsLanding] = useState(false);

  // Charts
  const [isApex, setIsApex] = useState(false);

  // Multi Level
  const [isLevel1, setIsLevel1] = useState(false);
  const [isLevel2, setIsLevel2] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  const { carrerSelected } = useSelector(state => ({
    carrerSelected: state.Login.carrerSelected,
  }));

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "BaseUi") {
      setIsBaseUi(false);
    }
    if (iscurrentState !== "AdvanceUi") {
      setIsAdvanceUi(false);
    }
    if (iscurrentState !== "Forms") {
      setIsForms(false);
    }
    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    if (iscurrentState !== "Charts") {
      setIsCharts(false);
    }
    if (iscurrentState !== "Icons") {
      setIsIcons(false);
    }
    if (iscurrentState !== "Maps") {
      setIsMaps(false);
    }
    if (iscurrentState !== "MuliLevel") {
      setIsMultiLevel(false);
    }
    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState !== "Landing") {
      setIsLanding(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isApps,
    isAuth,
    isPages,
    isBaseUi,
    isAdvanceUi,
    isForms,
    isTables,
    isCharts,
    isIcons,
    isMaps,
    isMultiLevel,
  ]);

  const opcionesDist = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "inicio",
      label: "Inicio",
      icon: "bx bxs-dashboard",
      link: "/ies/mycarrer",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },
    {
      id: "apps",
      label: "Yo en IES",
      icon: "bx bx-user-circle",
      link: "/ies/yoenies",
      stateVariables: isApps,
      click: function (e) {
        e.preventDefault();
        
        setIsApps(!isApps);
        setIscurrentState("Apps");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "analytics",
          label: "Legajo",
          link: "/ies/legajo",
          parentId: "dashboard",
        },
        {
          id: "crm",
          label: "Estado de cuenta",
          link: "/ies/accountstatus",
          parentId: "dashboard",
        },
        {
          id: "ecommerce",
          label: "Entrevista DOA",
          link: "/ies/doa",
          parentId: "dashboard",
        },
        {
          id: "crypto",
          label: "Solicitud de software",
          link: "/ies/software",
          parentId: "dashboard",
        },
        {
          id: "projects",
          label: "RAI",
          link: "/ies/regulation",
          parentId: "dashboard",
        },
        {
          id: "nft",
          label: "Solicitud de certificado",
          link: "/ies/certificate",
          parentId: "dashboard",
        }
      ],
    },
    {
      id: "mismaterias",
      label: "Mis Materias",
      icon: "bx ri-calendar-line",
      link: "/ies/materias",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("mismaterias");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "analytics",
          label: "Analítico",
          link: "/ies/materias/analitico",
          parentId: "dashboard",
        },
        {
          id: "crm",
          label: "Cronograma Académico",
          link: "/ies/materias/cronograma-academico",
          parentId: "dashboard",
        },
        {
          id: "ecommerce",
          label: "Inscripción Semestre",
          link: "/ies/materias/inscripcion",
          parentId: "dashboard",
        },
        {
          id: "crypto",
          label: "Horarios Materias",
          link: "/ies/materias/horarios-materias",
          parentId: "dashboard",
        },
        {
          id: "beca",
          label: "Solicitud de Becas",
          link: "/ies/materias/solicitud-beca",
          parentId: "dashboard",
        },
        {
          id: "inasistencias",
          label: "Inasistencias y Reincorporaciones",
          link: "/ies/materias/inasistencias-reincorporaciones",
          parentId: "dashboard",
        },
        {
          id: "nft",
          label: "Encuestas",
          link: "/ies/surveys",
          parentId: "dashboard",
        },
        {
          id: "nft",
          label: "Excepciones Académicas",
          link: "/ies/materias/academic-exceptions",
          parentId: "dashboard",
        },
        {
          id: "pago",
          label: "Formas de pago",
          link: "/ies/materias/formas-pago",
          parentId: "dashboard",
        },
        {
          id: "nft",
          label: "Biblioteca Virtual",
          link: "/ies/materias/biblioteca-virtual",
          parentId: "dashboard",
        }
        
      ],
    },
    {
      id: "yoenies",
      label: "Mis Exámenes",
      icon: "bx ri-calendar-2-line",
      link: "/ies/examenes",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("yoenies");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "analytics",
          label: "Inscripción exámenes materia",
          link: "/ies/examenes/inscripcion-materia",
          parentId: "dashboard",
        },
        {
          id: "crm",
          label: "Descargar modelo exámen",
          link: "/ies/examenes/modelo-examen",
          parentId: "dashboard",
        },
        {
          id: "ecommerce",
          label: "Fecha seminario final o título",
          link: "/ies/examenes/fecha-seminario",
          parentId: "dashboard",
        },
        /*{
          id: "crypto",
          label: "Exámenes especiales",
          link: "/ies/examenes/examen-especial",
          parentId: "dashboard",
        },*/
        {
          id: "projects",
          label: "Exámen de cursillo",
          link: "/ies/examenes/inscripcion-cursillo",
          parentId: "dashboard",
        },
      ],
    },
    {
      id: "yoenies",
      label: "Cursado a distancia",
      icon: "bx ri-global-line",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("yoenies");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "iesVirtual",
          label: "IES virtual",
          link: "https://adistancia.ies21.edu.ar/escritorio.cgi",
          parentId: "dashboard",
        },
        {
          id: "partials",
          label: "Bajar y subir parciales",
          link: "/ies/lower-raise-partials",
          parentId: "dashboard",
        },
        {
          id: "consultPartials",
          label: "Parciales corregidos",
          link: "/ies/cursado-distancia/parciales-corrregido",
          parentId: "dashboard",
        },
        {
          id: "partialsCies",
          label: "Bajar y subir exámenes CIES",
          link: "/ies/lower-raise-partials-cies",
          parentId: "dashboard",
        },
        {
          id: "parcialesCies",
          label: "Exámenes CIES corregidos",
          link: "/ies/cursado-distancia/parciales-corrregido-cies",
          parentId: "dashboard",
        },
      ],
    },
    {
      id: "contacto",
      label: "Contacto",
      icon: "bx  ri-phone-line",
      link: "/ies/contacto",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    }
  ];

  const opcionesPres = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "inicio",
      label: "Inicio",
      icon: "bx bxs-dashboard",
      link: "/ies/mycarrer",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },
    {
      id: "apps",
      label: "Yo en IES",
      icon: "bx bx-user-circle",
      link: "/ies/yoenies",
      stateVariables: isApps,
      click: function (e) {
        e.preventDefault();
        
        setIsApps(!isApps);
        setIscurrentState("Apps");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "analytics",
          label: "Legajo",
          link: "/ies/legajo",
          parentId: "dashboard",
        },
        {
          id: "crm",
          label: "Estado de cuenta",
          link: "/ies/accountstatus",
          parentId: "dashboard",
        },
        {
          id: "ecommerce",
          label: "Entrevista DOA",
          link: "/ies/doa",
          parentId: "dashboard",
        },
        {
          id: "crypto",
          label: "Solicitud de software",
          link: "/ies/software",
          parentId: "dashboard",
        },
        {
          id: "projects",
          label: "RAI",
          link: "/ies/regulation",
          parentId: "dashboard",
        },
        {
          id: "nft",
          label: "Solicitud de certificado",
          link: "/ies/certificate",
          parentId: "dashboard",
        }
      ],
    },
    {
      id: "mismaterias",
      label: "Mis Materias",
      icon: "bx ri-calendar-line",
      link: "/ies/inprogress",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("mismaterias");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "analytics",
          label: "Analítico",
          link: "/ies/materias/analitico",
          parentId: "dashboard",
        },
        {
          id: "crm",
          label: "Cronograma Académico",
          link: "/ies/materias/cronograma-academico",
          parentId: "dashboard",
        },
        {
          id: "ecommerce",
          label: "Inscripción Semestre",
          link: "/ies/materias/inscripcion",
          parentId: "dashboard",
        },
        {
          id: "crypto",
          label: "Horarios Materias",
          link: "/ies/materias/horarios-materias",
          parentId: "dashboard",
        },
        {
          id: "beca",
          label: "Solicitud de Becas",
          link: "/ies/materias/solicitud-beca",
          parentId: "dashboard",
        },
        {
          id: "inasistencias",
          label: "Inasistencias y Reincorporaciones",
          link: "/ies/materias/inasistencias-reincorporaciones",
          parentId: "dashboard",
        },
        {
          id: "nft",
          label: "Encuestas",
          link: "/ies/surveys",
          parentId: "dashboard",
        },
        {
          id: "nft",
          label: "Excepciones Académicas",
          link: "/ies/materias/academic-exceptions",
          parentId: "dashboard",
        },
        {
          id: "pago",
          label: "Formas de pago",
          link: "/ies/materias/formas-pago",
          parentId: "dashboard",
        },
        {
          id: "nft",
          label: "Biblioteca Virtual",
          link: "/ies/materias/biblioteca-virtual",
          parentId: "dashboard",
        }
        
      ],
    },
    {
      id: "yoenies",
      label: "Mis Exámenes",
      icon: "bx ri-calendar-2-line",
      link: "/ies/examenes",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("yoenies");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "analytics",
          label: "Inscripción exámenes materia",
          link: "/ies/examenes/inscripcion-materia",
          parentId: "dashboard",
        },
        {
          id: "crm",
          label: "Descargar modelo exámen",
          link: "/ies/examenes/modelo-examen",
          parentId: "dashboard",
        },
        {
          id: "ecommerce",
          label: "Fecha seminario final o título",
          link: "/ies/examenes/fecha-seminario",
          parentId: "dashboard",
        },
        /*{
          id: "crypto",
          label: "Exámenes especiales",
          link: "/ies/examenes/examen-especial",
          parentId: "dashboard",
        },*/
        {
          id: "projects",
          label: "Exámen de cursillo",
          link: "/ies/examenes/inscripcion-cursillo",
          parentId: "dashboard",
        },
      ],
    },
    {
      id: "contacto",
      label: "Contacto",
      icon: "bx  ri-phone-line",
      link: "/ies/contacto",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    }
  ];

  const menuItems = (carrerSelected ? (carrerSelected.DIST == "S") : false) ? opcionesDist : opcionesPres;

  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
