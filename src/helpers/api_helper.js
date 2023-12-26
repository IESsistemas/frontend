import axios from "axios";
import { api } from "../config";

// default
axios.defaults.baseURL = api.API_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// content type
const token = JSON.parse(sessionStorage.getItem("authUser")) ? JSON.parse(sessionStorage.getItem("authUser")).token : null;
if(token)
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

class APIClient {
  /**
   * Fetches data from given url
   */

 
/*   get = (url, params) => {
    let response;

    let paramKeys = [];

    if (params) {
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  }; */
  /**
   * post given data to url
   */
  create = (url, data) => {
    return axios.post(url, data, {
      headers: {
        contentType: "application/json",
      }
    });
  };
//? ###########################################################################################
//? ###########################################################################################
//? ###########################################################################################
//? #############                     IES SERVICES                         ####################
//? ###########################################################################################

  requestPostNoAuth = (url, data) => {
    var config = {
      method: 'post',
      url: url,
      headers: { 
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    };
    return axios(config);
  }

  requestGetNoAuth = (url) => {
    var config = {
      method: 'get',
      url: url,
      headers: { 
        'Content-Type': 'application/json'
      }
    };
    return axios(config);
  }

  requestPostAuth = (url, token, data) => {
    var config = {
      method: 'post',
      url: url,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data : JSON.stringify(data)
    };
    return axios(config);
  }

  requestGetAuth = (url, token) => {
    var config = {
      method: 'get',
      url: url,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    };
    return axios(config);
  }


  requestPutAuth = (url, token, data) => {
    var config = {
      method: 'put',
      url: url,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data : JSON.stringify(data)
    };
    console.log(config)
    return axios(config);
  }
  requestDeleteAuth = (url, token, data) => {
    var config = {
      method: 'delete',
      url: url,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data : JSON.stringify(data)
    };
    return axios(config);
  }


//? ###########################################################################################
//? ###########################################################################################
//? ###########################################################################################
//? ###########################################################################################


  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.patch(url, data);
  };

  put = (url, data) => {
    return axios.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url, config) => {
    return axios.delete(url, { ...config });
  };
}
const getLoggedinUser = () => {
  const user = sessionStorage.getItem("authUser");
  const data = sessionStorage.getItem("userData");
  const home = sessionStorage.getItem("homeData");
  if(user, data, home){
    return {
      user: JSON.parse(user),
      data: JSON.parse(data),
      home: JSON.parse(home)
    };
  }else {
    return null;
  }
};

export { APIClient, setAuthorization, getLoggedinUser };