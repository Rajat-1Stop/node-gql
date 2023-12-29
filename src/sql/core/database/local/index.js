const { DB } = require('@src/config');

const local = {    
    "host": DB.HOST,
    "dialect": DB.DIALECT,
    "username": DB.USER,
    "database": DB.NAME,
    "password": DB.PASS,
};

module.exports = local;