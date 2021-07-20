import axios from "axios";

const requestFactoryAxios = ({ baseURL, params }) => {
  const requestInstance = axios.create({
    baseURL,
  });
  requestInstance.interceptors.request.use((config) => {
    config.params = {
      ...config.params,
      ...params,
    };

    return config;
  });
  return requestInstance;
};

export default (type, params) => {
  switch (type) {
    case "axios":
    default:
      return requestFactoryAxios(params);
  }
};
