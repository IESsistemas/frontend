import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { CHANGE_EMAIL, PERSONAL_INFO, PROVINCES, LOCALITIES, NEIGHBOURS, ADD_ADDRESS, UPDATE_ADDRESS, DELETE_ADDRESS, ADD_PHONE, UPDATE_PHONE, DELETE_PHONE, CHANGE_PASS, PROV_LOC_NEI } from "./actionTypes";
import { getPersonalInformationActionSuccess, getProvincesSuccess, getLocalitiesSuccess, getNeighboursSuccess, getAllDataAddressSuccess } from "./actions";

import { postChangeEmail, getPersonalInfo, getCounties, getProvinces, getLocalities, getNeighbours, postAddAddress, putUpdateAddress, deleteAddress, postAddPhone, putUpdatePhone, deletePhone, postChangePassRequest } from "../../helpers/iesback_helper";

function* changeEmailF(email) {
  try {
    if (process.env.REACT_APP_API_URL) {
      window.loading(true);
      const response = yield call(postChangeEmail, {newEmail: email.payload.email});
      if(response.code === 2){
        window.generic.showModal("Email actualizado", "Su email fue actualizado a " + email.payload.email + " con éxito por favor verifique su correo e ingrese nuevamente");
        
        sessionStorage.removeItem("authUser");
        sessionStorage.removeItem("userData");
        sessionStorage.removeItem("homeData");
        setTimeout(() => {
          window.location.href = "/ies/auth";
        }, 3000);
      }else{
        window.generic.showModal("Error al actualizar email", "No se pudo actualizar su email a " + email.payload.email + " intente nuevamente más tarde");
      }
      window.loading(false);
    }else{
      window.generic.showModal("Error", "No se pudo actualizar su email a " + email.payload.email + " intente nuevamente más tarde");
    }
  } catch (error) {
    //yield put(apiErrorP(error));
    window.generic.showModal("Error al actualizar email", "No se pudo actualizar su email a " + email.payload.email + " intente nuevamente más tarde");
  }
}

function* getPersonalInformation() {
  try {
    if (process.env.REACT_APP_API_URL) {
      window.loading(true);
      const response = yield call(getPersonalInfo, {});
      if(response.code === 2){
        let address = [
          response.addressActual[0],
          response.addressFamiliar[0],
          response.addressSend[0],
          response.addressOther[0],
        ]

        const responseCounties = yield call(getCounties, {});
        yield put((getPersonalInformationActionSuccess(response.emailStudent, address, responseCounties.countries, response.studentPhone)));
        window.loading(false);
      }else{
        window.loading(false);
      }
    }
  } catch (error) {
    //yield put(apiErrorP(error));
    window.loading(false);
  }
}

function* getProvincesS(county) {
  try {
    if (process.env.REACT_APP_API_URL) {
      const response = yield call(getProvinces, county.payload.id);
      if(response.code === 2){
        try {
          let noSelect = response.provinces.find(e => e.Id_Provincia === 0);
          if(!noSelect) response.provinces = [{Id_Provincia:0, Provincia: "Seleccione Provincia..."} ,...response.provinces]
        } catch (error) {console.log(error)}
        yield put((getProvincesSuccess(response.provinces)));
      }else{
        yield put((getProvincesSuccess([{Id_Provincia:0, Provincia: "No hay datos"}])));
      }
    }
  } catch (error) {
    //yield put(apiErrorP(error));
    console.log(error)
  }
}

function* getLocalitiesS(county) {
  try {
    if (process.env.REACT_APP_API_URL) {
      const response = yield call(getLocalities, county.payload.id);
      if(response.code === 2){
        try {
          let noSelect = response.localities.find(e => e.Id_Localidad === 0);
          if(!noSelect) response.localities = [{Id_Localidad:0, Localidad: "Seleccione Localidad..."} ,...response.localities]
        } catch (error) {console.log(error)}
        yield put((getLocalitiesSuccess(response.localities)));
      }else{
        yield put((getLocalitiesSuccess([{Id_Localidad:0, Localidad: "No hay datos"}])));
      }
    }
  } catch (error) {
    //yield put(apiErrorP(error));
    console.log(error)
  }
}

function* getNeighboursS(county) {
  try {
    if (process.env.REACT_APP_API_URL) {
      const response = yield call(getNeighbours, county.payload.id);
      if(response.code === 2){
        try {
          let noSelect = response.neighborhoods.find(e => e.Id_Barrio === 0);
          if(!noSelect) response.neighborhoods = [{Id_Barrio:0, barrio: "Seleccione Barrio..."} ,...response.neighborhoods]
        } catch (error) {console.log(error)}
        yield put((getNeighboursSuccess(response.neighborhoods)));
      }else{
        yield put((getNeighboursSuccess([{Id_Barrio:0, barrio: "No hay datos"}])));
      }
    }
  } catch (error) {
    //yield put(apiErrorP(error));
    console.log(error)
  }
}

function* addAddressS({payload}) {
  try {
    if (process.env.REACT_APP_API_URL) {
      window.loading(true);
      const response = yield call(postAddAddress, payload.data);
      if(response.code === 2){
        yield call(getPersonalInformation, {});
        window.generic.showModal("Dirección Agregada", "La dirección fue agregada con éxito");
      }else{
        window.generic.showModal("Error al agregar dirección", "Ocurrió un inconveniente al agraegar la dirección, por favor verifica los datos e intenta nuevamente");
      }
      window.loading(false);
    }
  } catch (error) {
    window.loading(false);
    window.generic.showModal("Error al agregar dirección", "Ocurrió un inconveniente al agraegar la dirección, por favor verifica los datos e intenta nuevamente");
  }
}

function* updateAddressS({payload}) {
  try {
    if (process.env.REACT_APP_API_URL) {
      window.loading(true);
      const response = yield call(putUpdateAddress, payload.data);
      if(response.code === 2){
        yield call(getPersonalInformation, {});
        window.generic.showModal("Dirección Actualizada", "La dirección fue actualizada con éxito");
      }else{
        window.generic.showModal("Error al actualizar dirección", "Ocurrió un inconveniente al actualizar la dirección, por favor verifica los datos e intenta nuevamente");
      }
      window.loading(false);
    }
  } catch (error) {
    window.loading(false);
    window.generic.showModal("Error al actualizar dirección", "Ocurrió un inconveniente al actualizar la dirección, por favor verifica los datos e intenta nuevamente");
  }
}

function* deleteAddressS({payload}) {
  try {
    if (process.env.REACT_APP_API_URL) {
      window.loading(true);
      const response = yield call(deleteAddress, payload.data);
      if(response.code === 2){
        yield call(getPersonalInformation, {});
        window.generic.showModal("Dirección Borrada", "La dirección fue borrada con éxito");
      }else{
        window.generic.showModal("Error al borrar dirección", "Ocurrió un inconveniente al borrar la dirección, por favor intenta nuevamente");
      }
      window.loading(false);
    }
  } catch (error) {
    window.loading(false);
    window.generic.showModal("Error al borrar dirección", "Ocurrió un inconveniente al borrar la dirección, por favor intenta nuevamente");
  }
}

function* addPhoneS({payload}) {
  try {
    if (process.env.REACT_APP_API_URL) {
      window.loading(true);
      const response = yield call(postAddPhone, payload.data);
      if(response.code === 2){
        yield call(getPersonalInformation, {});
        window.generic.showModal("Teléfono Agregado", "El teléfono fue agregado con éxito");
      }else{
        window.generic.showModal("Error al agregar teléfono", "Ocurrió un inconveniente al agregar el teléfono, por favor verifica los datos e intenta nuevamente");
      }
      window.loading(false);
    }
  } catch (error) {
    window.loading(false);
    window.generic.showModal("Error al agregar teléfono", "Ocurrió un inconveniente al agraegar el teléfono, por favor verifica los datos e intenta nuevamente");
  }
}

function* updatePhoneS({payload}) {
  try {
    if (process.env.REACT_APP_API_URL) {
      window.loading(true);
      const response = yield call(putUpdatePhone, payload.data);
      if(response.code === 2){
        yield call(getPersonalInformation, {});
        window.generic.showModal("Teléfono Actualizado", "El teléfono fue actualizada con éxito");
      }else{
        window.generic.showModal("Error al actualizar teléfono", "Ocurrió un inconveniente al actualizar el teléfono, por favor verifica los datos e intenta nuevamente");
      }
      window.loading(false);
    }
  } catch (error) {
    window.loading(false);
    window.generic.showModal("Error al actualizar teléfono", "Ocurrió un inconveniente al actualizar el teléfono, por favor verifica los datos e intenta nuevamente");
  }
}

function* deletePhoneS({payload}) {
  try {
    if (process.env.REACT_APP_API_URL) {
      window.loading(true);
      const response = yield call(deletePhone, payload.data);
      if(response.code  === 2){
        yield call(getPersonalInformation, {});
        window.generic.showModal("Teléfono Borrada", "El teléfono fue borrada con éxito");
      }else{
        window.generic.showModal("Error al borrar teléfono", "Ocurrió un inconveniente al borrar el teléfono, por favor intenta nuevamente");
      }
      window.loading(false);
    }
  } catch (error) {
    window.loading(false);
    window.generic.showModal("Error al borrar teléfono", "Ocurrió un inconveniente al borrar el teléfono, por favor intenta nuevamente");
  }
}

function* changePassS({payload}) {
  try {
    if (process.env.REACT_APP_API_URL) {
      window.loading(true);
      const response = yield call(postChangePassRequest, payload.data);
      if(response.code  === 2){
        window.generic.showModal("Contraseña cambiada", "Se modifico la contraseña con éxito, deberá ingresar nuevamente");
        sessionStorage.removeItem("authUser");
        sessionStorage.removeItem("userData");
        sessionStorage.removeItem("homeData");
        setTimeout(() => {
          window.location.href = "/ies/auth";
        }, 3000);
      }else{
        if(response.code  === 1 && response.message  === "Contraseña incorrecta"){
          window.generic.showModal("Error al modificar contraseña", "La contraseña actual es incorrecta");
        }else{
          window.generic.showModal("Error al modificar contraseña", "Ocurrió un inconveniente al modificar contraseña, por favor intenta nuevamente");
        }
      }
      window.loading(false);
    }
  } catch (error) {
    window.loading(false);
    window.generic.showModal("Error al modificar contraseña", "Ocurrió un inconveniente al modificar contraseña, por favor intenta nuevamente");
  }
}

function* provLocNeiS({payload}) {
  try {
    if (process.env.REACT_APP_API_URL) {
      window.loading(true);
      //!%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      let response = yield call(getProvinces, payload.provinces);
      if(response.code === 2){
        try {
          let noSelect = response.provinces.find(e => e.Id_Provincia === 0);
          if(!noSelect) response.provinces = [{Id_Provincia:0, Provincia: "Seleccione Provincia..."} ,...response.provinces]
        } catch (error) {console.log(error)}
        let provinciesTT = response.provinces;

        //!%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        response = yield call(getLocalities, payload.localities);
        if(response.code === 2){
          try {
            let noSelect = response.localities.find(e => e.Id_Localidad === 0);
            if(!noSelect) response.localities = [{Id_Localidad:0, Localidad: "Seleccione Localidad..."} ,...response.localities]
          } catch (error) {console.log(error)}
          let localitiesTT = response.localities;
          
          //!%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
          response = yield call(getNeighbours, payload.neighbours);
          if(response.code === 2){
            try {
              let noSelect = response.neighborhoods.find(e => e.Id_Barrio === 0);
              if(!noSelect) response.neighborhoods = [{Id_Barrio:0, barrio: "Seleccione Barrio..."} ,...response.neighborhoods]
            } catch (error) {console.log(error)}

            window.loading(false);
            yield put((getAllDataAddressSuccess(provinciesTT, localitiesTT, response.neighborhoods)));

          }else{
            window.loading(false);
            yield put((getNeighboursSuccess([{Id_Barrio:0, barrio: "No hay datos"}])));
          }
          //!%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

        }else{
          window.loading(false);
          yield put((getLocalitiesSuccess([{Id_Localidad:0, Localidad: "No hay datos"}])));
        }
        //!%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

      }else{
        window.loading(false);
        yield put((getProvincesSuccess([{Id_Provincia:0, Provincia: "No hay datos"}])));
      }
    }
  } catch (error) {
    window.loading(false);
    window.generic.showModal("Error al modificar contraseña", "Ocurrió un inconveniente al modificar contraseña, por favor intenta nuevamente");
  }
}

function* profileSaga() {
  yield takeEvery(CHANGE_EMAIL, changeEmailF);
  yield takeEvery(PERSONAL_INFO, getPersonalInformation);
  yield takeEvery(PROVINCES, getProvincesS);
  yield takeEvery(LOCALITIES, getLocalitiesS);
  yield takeEvery(NEIGHBOURS, getNeighboursS);
  yield takeEvery(ADD_ADDRESS, addAddressS);
  yield takeEvery(UPDATE_ADDRESS, updateAddressS);
  yield takeEvery(DELETE_ADDRESS, deleteAddressS);
  yield takeEvery(ADD_PHONE, addPhoneS);
  yield takeEvery(UPDATE_PHONE, updatePhoneS);
  yield takeEvery(DELETE_PHONE, deletePhoneS);
  yield takeEvery(CHANGE_PASS, changePassS);
  yield takeEvery(PROV_LOC_NEI, provLocNeiS);
}

export default profileSaga;
