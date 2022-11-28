import axios from "axios";
import { authStore } from "../Redux/AuthState";

class InterceptorService {

    public createInterceptors(): void {

        axios.interceptors.request.use(request => {
            if (authStore.getState().token) {
                request.headers = {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    authorization: "Bearer " + authStore.getState().token

                };
            }
            return request;
        },
            (err) => {
                return Promise.reject(err);
            });

    }

}

const interceptorService = new InterceptorService();

export default interceptorService;