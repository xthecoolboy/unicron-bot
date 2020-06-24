require('./prototypes/Array');
require('./prototypes/Number');
require('./prototypes/Object');
require('./prototypes/String');

const http = require('http');
const express = require('express');
const Client = require('./classes/Unicron');

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    await require('./database/database.js').SyncDatabase();
}