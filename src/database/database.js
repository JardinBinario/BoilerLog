const mongoose = require ('mongoose');
const { config } = require('../config');

async function dbConnection() {
    try {
        const db = await mongoose.connect(config.dbHost);
        console.log(`BoilerLog esta conectado a la base de datos ${db.connection.name}`);

    } catch(error) {
        console.error(`Hubo un error conectando con la base de datos: ${error}`);
    }
};

module.exports = {
    dbConnection
};