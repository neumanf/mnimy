import axios from 'axios';

export default class BaseHttpService {
    static BASE_URL: string = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

    static get(endpoint: string, options = {}) {
        Object.assign(options, this._getCommonOptions());
        return axios
            .get(`${this.BASE_URL}${endpoint}`, options)
            .catch((error) => this._handleHttpError(error));
    }

    static async post(endpoint: string, data = {}, options = {}) {
        Object.assign(options, this._getCommonOptions());
        return axios
            .post(`${this.BASE_URL}${endpoint}`, data, options)
            .catch((error) => this._handleHttpError(error));
    }

    static async delete(endpoint: string, options = {}) {
        Object.assign(options, this._getCommonOptions());
        return axios
            .delete(`${this.BASE_URL}${endpoint}`, options)
            .catch((error: any) => this._handleHttpError(error));
    }

    static async patch(endpoint: string, data = {}, options = {}) {
        Object.assign(options, this._getCommonOptions());
        return axios
            .patch(`${this.BASE_URL}${endpoint}`, data, options)
            .catch((error) => this._handleHttpError(error));
    }

    static _handleHttpError(error: any) {
        const { statusCode } = error.response.data;

        if (statusCode === 401 || statusCode === 403) {
            return this._handle401();
        }

        throw error;
    }

    static _handle401() {
        window.location.pathname = '/signin';
    }

    static _getCommonOptions() {
        return {
            withCredentials: true,
        };
    }
}
