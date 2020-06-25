
const express = require('express');
const Client = require('./Unicron');

class Endpoint {
    /**
     * 
     * @param {String} url 
     * @param {Client} client 
     */
    constructor(url, client) {
        this.url = url;
        this.client = client;
        this.route = express.Router();
    }
}
module.exports = Endpoint;