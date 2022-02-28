import axios from 'axios';

export default class BaseHttpService {
    BASE_URL: string = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

    async get(endpoint: string, options = {}) {
        Object.assign(options, this._getCommonOptions());
        return axios
            .get(`${this.BASE_URL}${endpoint}`, options)
            .catch((error) => this._handleHttpError(error));
    }

    async post(endpoint: string, data = {}, options = {}) {
        Object.assign(options, this._getCommonOptions());
        return axios
            .post(`${this.BASE_URL}${endpoint}`, data, options)
            .catch((error) => this._handleHttpError(error));
    }

    async delete(endpoint: string, options = {}) {
        Object.assign(options, this._getCommonOptions());
        return axios
            .delete(`${this.BASE_URL}${endpoint}`, options)
            .catch((error: any) => this._handleHttpError(error));
    }

    async patch(endpoint: string, data = {}, options = {}) {
        Object.assign(options, this._getCommonOptions());
        return axios
            .patch(`${this.BASE_URL}${endpoint}`, data, options)
            .catch((error) => this._handleHttpError(error));
    }

    _handleHttpError(error: any) {
        const { statusCode } = error.response.data;

        if (statusCode === 401 || statusCode === 403) {
            return this._handle401();
        }

        throw error;
    }

    _handle401() {
        window.location.pathname = '/signin';
    }

    _getCommonOptions() {
        return {
            withCredentials: true,
        };
    }
}
