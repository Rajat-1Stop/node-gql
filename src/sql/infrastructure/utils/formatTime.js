const { 
    format, 
    utcToZonedTime, 
    zonedTimeToUtc,
} = require('date-fns-tz');

const fDate = (date, formatStr = 'MMM dd, yyyy') => {
    const nDate = new Date(date);
    return format(nDate, formatStr);
}

const fTime = (date, formatStr = 'HH:mm:ss') => {
    const nDate = new Date(date);
    return format(nDate, formatStr);
}

const mergeDateTime = (date1, date2) => {
    const utcDate1 = convertToUTC(date1);
    const utcDate2 = convertToUTC(date2);
    utcDate1.setUTCHours(utcDate2.getUTCHours(), utcDate2.getUTCMinutes(), utcDate2.getUTCSeconds());
    return utcDate1;
};

const convertToZonedTime = (date, timeZone='') => {
    if(timeZone === '' && timeZone === undefined && timeZone === null){
        timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    const nDate = new Date(date);
    return utcToZonedTime(nDate, timeZone);
}

const convertToUTC = (date, timeZone = '') => {
    if (timeZone === '' || timeZone === undefined || timeZone === null) {
        timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    const nDate = new Date(date);
    return zonedTimeToUtc(nDate, timeZone);
};
  

module.exports = {
    fDate,
    fTime,
    convertToUTC,
    mergeDateTime,
    convertToZonedTime,
};