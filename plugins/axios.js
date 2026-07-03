import * as token from '../utils/tokens.js'
import { fingerprint } from "@/mixins/index.js"
let REFRESH_PROMISE = null;
export default async function ({ $axios, redirect, store }) {
    $axios.interceptors.request.use(addAuthToken);
    $axios.interceptors.response.use(response => response, parseError);

    async function addAuthToken(request) {
        let accessToken = token.getAccessToken();
        if (accessToken != null) {
            request.headers.Authorization = 'Bearer ' + accessToken;
            if (request.url == "/api/refresh") {
                let fp = await fingerprint.methods.fingerprint();
                request.headers.fp = fp;
            }
        }
        return request;
    }

    async function parseError(error) {
        let originalRequest = error.config;
        if (error.response.status === 401) {
            if (originalRequest._retry) {
                return Promise.reject('too much refreshes');
            }

            originalRequest._retry = true;

            if (REFRESH_PROMISE === null) {
                REFRESH_PROMISE = $axios.get('/api/refresh');
            }

            let resp = await REFRESH_PROMISE;

            let res = resp;
            REFRESH_PROMISE = null;

            if (res.data.ok) {
                token.setAccessToken(res.data.data);
                let user = token.getJWTPayload(res.data.data);
                await store.commit('user/setUser', user);
                console.log("обновление АТ и РТ ");
                // repeat request
                if (error.config.url != "/api/check") {
                    error.config.headers.Authorization = `Bearer ${res.data.data}`;
                    return $axios(error.config);
                }
            } else {// if there was no RT, or it was outdated, or the user was banned
                await store.commit('user/setUser', null);
                token.cleanAccessTokensData();
                return redirect("/sign-in");
            }

        } else if (error.response.status == 403) {
            await store.commit('user/setUser', null);
            token.cleanAccessTokensData();
            return redirect("/sign-in");
        } else {
            return Promise.reject(error);
        }
    }
}