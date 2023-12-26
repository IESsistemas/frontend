import * as axios from 'axios';

const getToken = ()=>{
    try {
        return JSON.parse(sessionStorage.getItem("authUser"));
    } catch (error) {
        return "";
    }
}

const getFetchMe = () => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+getToken());
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };
        fetch("https://ies-back.com2.ar/api/students/fetch-me", requestOptions)
        .then(response => response.json())
        .then(result => resolve(result))
        .catch((error) => {console.log('error', error); resolve(null)});
    })
}

const getHome = () => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+getToken());
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };
        fetch("https://ies-back.com2.ar/api/students/home", requestOptions)
        .then(response => response.json())
        .then(result => resolve(result))
        .catch((error) => {console.log('error', error); resolve(null)});
    })
}


const getAllInfo = async () => {
    let res = await Promise.all([getFetchMe(), getHome()]);
    if(res[0] === null || res[1] === null) return null;
    const alldata = {
        data: res[0].data,
        home: res[1],
        user: getToken(),
    };
    return alldata
}

export const  getArrayPending = (user) => {
    let pending = [];
    let data = user.data;
    let responseCarrera = user.home
    if(data.encuestaObligatoriaPendiente){
        pending.push('suveys')
    }
    if(data.emailPendiente){
        pending.push('email')
    } 
    if(data.cambiarContraseña){
        pending.push('pass')
    }
    
    //! no es necesario hacer comportamiento por encuestas no obligatorias
    //data.encuestaNoObligatoriaPendiente
    
    if(data.reglamentoAlumnoPendiente){
        pending.push('rules')
    }

    if(responseCarrera.studentInhabilitation.length > 0){
        pending.push('inhabilitation')
    }

    try {
        if(responseCarrera.banner.length > 0){
            localStorage.setItem('active-banner', responseCarrera.banner[0].ARCHIVO);
        }
    } catch (error) {
        console.log(error)
    }

    return pending;
}

export const getPendings = async (user, redirect) => {
    //if(!user) return null;

    //reftesh user
    // if(redirect){
    //     let user2 = await getAllInfo()
    //     if(user2!=null) user = user2;
    // }

    let user2 = await getAllInfo();
    if(user2!=null) user = user2;
    
    let pending = getArrayPending(user);

    if(pending.length > 0){
        let toRedir = '';
        switch (pending[0]) {
            case 'suveys': toRedir = '/ies/surveys'; break;
            case 'email': toRedir = '/ies/auth/disabledemail'; break;
            case 'pass': toRedir = '/ies/chpass'; break;
            case 'rules': toRedir = '/ies/regulation'; break;
            case 'inhabilitation': toRedir = '/ies/auth/disabled'; break;
            default: toRedir = '/ies/auth/disabled'; break;
        }

        if(window.location.pathname.indexOf(toRedir) !== 0 && redirect && window.location.pathname.indexOf('/ies/auth') !== 0){
            window.location.href = toRedir;
        }
    }

    return pending;
};