import axiosInstance from './axios'

// GET request
export const get = async (url) => {
    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.error(`Unable to GET ${url} due to following error: ${error}`);
        throw error;
    }
}

// POST request
export const post = async (url, data) => {
    try {
        const response = await axiosInstance.post(url, data);
        return response.data;
    } catch (error) {
        console.error(`Unable to POST to ${url} due to following error: ${error}`);
        throw error;
    }
}