
const express = require('express');
const API = require('../API')

class Endpoint {
    /**
     * 
     * @param {String} url 
     * @param {API} server 
     */
    constructor(url, server) {
        this.url = url;
        this.server = server;
        this.route = express.Router();
    }
}
module.exports = Endpoint;