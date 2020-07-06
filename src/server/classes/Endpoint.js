
const express = require('express');
const Client = require('./Server');

class Endpoint {
    /**
     * 
     * @param {string} url 
     * @param {Client} client 
     */
    constructor(url, client) {
        this.url = url;
        this.client = client;
        this.route = express.Router();
    }
}
module.exports = Endpoint;