import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

/**
 * Represents a connection to the API layer. This is a static class as it will be used throughout the services
 * to establish connections and make requests to the API.
 */
export class Api {
    public static getConnection(): AxiosInstance {
        const options: AxiosRequestConfig = {};
        if (process.env.VUE_APP_API_URL) {
            options.baseURL = process.env.VUE_APP_API_URL;
        }

        return axios.create(options);
    }
}
