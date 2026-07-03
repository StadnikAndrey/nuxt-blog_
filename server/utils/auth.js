import Token from './token.js'
let token = new Token();

export function checkAutorization(req, res) {
    return new Promise((resolve, reject) => {
        let header = req.get('Authorization');
        let at = token.readToken(header);
        if (at != null) {
            try {
                let tokenData = token.getTokenData(at);
                if (tokenData.exp > Date.now()) {
                    resolve(tokenData);
                } else {
                    res.status(401).json({ ok: false });
                }
            } catch (e) {
                res.clearCookie('refreshToken');
                res.status(403).json({ ok: false, data: ["invalid authorization token"] });
            }
        } else {
            res.clearCookie('refreshToken');
            res.status(403).json({ ok: false, data: ["auth token is null"] });
        }
    })
}