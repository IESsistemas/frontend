

const sendRequestPost = (url, data) => {
    return new Promise((resolve) => {
    axios.post(url, data)
    .then(response => {
    })
    .catch(error => {
        console.log(error)
    });});
}

export const loginUser = async (data) => {

    sendRequestPost()
    return {
      type: LOGIN_USER,
      payload: { user, history },
    };
};

