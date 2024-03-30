import axiosInstance from "./axios";

// GET request
export const get = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error(`Unable to GET ${url} due to following error: ${error}`);
    throw error;
  }
};

// GET request by id
export const getById = async (url, id) => {
  try {
    const response = await axiosInstance.get(`${url}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Unable to GET ${url}/${id} due to following error: ${error}`
    );
    throw error;
  }
};

// POST request
export const post = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.error(`Unable to POST to ${url}:`, error.response.data);
    throw error;
  }
};

// PUT request
export const put = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    console.error(`Unable to PUT to ${url} due to following error: ${error}`);
    throw error;
  }
};

// DELETE request
export const remove = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    console.error(`Unable to DELETE ${url} due to following error: ${error}`);
    throw error;
  }
};
