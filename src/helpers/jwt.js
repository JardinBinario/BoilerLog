const jwt = require ('jsonwebtoken');
const { config } = require('../config');

const generarJWT = async (uid, name, rol) => {
    try {
        const payload = {uid, name, rol};
        const token = jwt.sign(payload, config.privateKey, {
            expiresIn: config.tokenLife,
        });
        return token;
    } catch(err) {
        throw err;
    }
}

module.exports = generarJWT;