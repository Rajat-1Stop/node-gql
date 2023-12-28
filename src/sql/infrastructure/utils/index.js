const jwt = require('./jwt');
const upload = require('./upload');
const formatTime = require('./formatTime');
const convertFile = require('./convertFile');

module.exports = {
    ...jwt,
    ...upload,
    ...formatTime,
    ...convertFile
}