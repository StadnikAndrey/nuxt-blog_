const LOCAL_ACCESS_NAME = 'accessToken';

function setAccessToken(access) {
    localStorage.setItem(LOCAL_ACCESS_NAME, access);
}

function getAccessToken() {
    return localStorage.getItem(LOCAL_ACCESS_NAME);
}

function cleanAccessTokensData() {
    localStorage.removeItem(LOCAL_ACCESS_NAME);
}

function getJWTPayload(token) {
    if (token != null) {
        return parseJWT(token).payload;
    }
}

function parseJWT(token) {
    if (token != null) {
        let parts = token.split('.');
        return {
            header: parsePart(parts[0]),
            payload: parsePart(parts[1]),
            sign: parts[2]
        };
    }
}

function parsePart(str) {
    return JSON.parse(atob(str));
}

export { setAccessToken, getAccessToken, cleanAccessTokensData, getJWTPayload }