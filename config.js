'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

//const {
//    PORT,
//    API_KEY,
//    AUTH_DOMAIN,
//    DATABASE_URL,
//    PROJECT_ID,
//    STORAGE_BUCKET,
//    MESSAGING_SENDER_ID,
//    APP_ID
//} = process.env;

//assert(PORT, 'PORT is required');

// TODO: load config from a central location (probably k8s Secrets, or github)
module.exports = {
    port: 8080,
    firebaseConfig: {
        apiKey: ,
        authDomain: ,
        projectId: ,
        storageBucket: ,
        messagingSenderId: ,
        appId: 
    }
}