const cds = require('@sap/cds');
const authService = require('./auth-service.js');

cds.on('bootstrap', (app) => authService(app));

module.exports = cds.server;