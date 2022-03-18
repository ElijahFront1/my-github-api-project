import axios from "axios";
import axiosRetry from "axios-retry";

const req = () => {
    const defaultOptions = {
        baseURL: 'https://api.github.com',
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization' : 'token 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 ',
        },
    };
 
    const instance = axios.create(defaultOptions);

    instance.interceptors.request.use((config) => config);

    const retryDelay = (retryNumber = 0) => {
        const seconds = Math.pow(2, retryNumber) * 1000;
        const randomMs = 1000 * Math.random();
        return seconds + randomMs;
    };

    axiosRetry(axios, {
        retries: 2,
        retryDelay,
        retryCondition: axiosRetry.isRetryableError,
    });

    instance.interceptors.response.use(
        (response) => Promise.resolve(response),
        (error) => Promise.reject(error).catch(function (error) {
            if (error.response) {
                console.log(error.response.data.message);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        })
    );

    return instance;
};

export default req()
