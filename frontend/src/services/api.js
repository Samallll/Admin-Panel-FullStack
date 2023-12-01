import axios from "axios";

export const getAuthToken = () => {
  return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
  window.localStorage.setItem('auth_token', token);
};

axios.defaults.baseURL = 'http://localhost:8080/api/v1/auth';

const request = (method, url, data) => {
    let headers = {};
    const formData = new FormData();

    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};

        if (data.file) {
            console.log('file exists', data.file);
            headers['Content-Type'] = 'multipart/form-data';

            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });

            return axios({
                method: method,
                url: url,
                headers: headers,
                data: formData,
            });
        }
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data,
    });
};

export default request;