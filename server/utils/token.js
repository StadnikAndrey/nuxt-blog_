import hash from 'hash.js'
import btoa from 'btoa'
import atob from 'atob'
import crypto from 'crypto'


export default class Token {
    SECRET_KEY = 'th4345$1234g[09393%$]';
    ACCESS_EXP = 10000; // for prod you need to set 5 minutes
    REFRESH_EXP = 36000000; // for prod you need to set 1 hour
    NUMBER_DEVICES = 2; // the number of devices on which simultaneous authorization is possible, one entry in the sessions table for 1 device

    constructor() {
    }

    packTokenData($data) {
        let headers = btoa(JSON.stringify({ "typ": "jwt", "alg": "SHA256" }));
        let payload = btoa(JSON.stringify($data));
        return headers + '.' + payload + '.' + this.signToken(headers, payload);
    }

    signToken(headers, payload) {
        return hash.sha256().update(headers + '.' + payload + '.' + this.SECRET_KEY).digest('hex');
    }

    createAccessToken(user) {
        let iat = Date.now();
        let exp = iat + this.ACCESS_EXP;
        return this.packTokenData({
            'id': user.id,
            'name': user.name,
            'surname': user.surname,
            'email': user.email,
            'roles': user.roles,
            'is_ban': user.is_ban,
            'exp': exp,
            'iat': iat,
            'id_session': user.id_session
        });
    }

    createRefreshToken() {
        let buf = crypto.randomBytes(128);
        return buf.toString('hex').slice(0, 64);
    }

    readToken(header) {
        let token;
        if (header != undefined) {
            token = header;
            let schema = 'Bearer ';

            if (token.indexOf(schema) === 0) {
                token = token.slice(schema.length);
            } else {
                token = null;
            }
        } else {
            token = null;
        }
        return token;
    }

    getTokenData(token) {
        let parts = token.split('.');

        if (parts.length !== 3 || parts[0].trim() === '' || parts[1].trim() === '' || parts[2].trim() === '') {
            throw "incorrect token format";
        }

        let payload = JSON.parse(atob(parts[1]));

        if (parts[2] !== this.signToken(parts[0], parts[1])) {
            throw ("incorrect sign");
        }

        return payload;
    }
}