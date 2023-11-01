const { MongoClient } = require('mongodb');
const dbConfig = require('../database/config.js');


client = new MongoClient(dbConfig.mongoURL);

