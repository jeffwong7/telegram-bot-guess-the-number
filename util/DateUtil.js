function getToday() {
    return new Date();
}

function parseDate(dateString) {
    var date = dateString.split(" ")[0];
    var time = dateString.split(" ")[1];
    date = date.split("-");
    time = time.split(":");
    var y = Number(date[0]);
    var m = Number(date[1]) - 1;
    var d = Number(date[2]);
    var h = Number(time[0]);
    var i = Number(time[1]);
    var s = Number(time[2]);
    return new Date(y, m, d, h, i, s, 0);
}

function getMySQLFormat(date) {
    var y = date.getFullYear();
    var m = ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1);
    var d = (date.getDate() < 10 ? "0" : "") + date.getDate();
    var h = (date.getHours() < 10 ? "0" : "") + date.getHours();
    var i = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    var s = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
    var dateStr = `${y}-${m}-${d} ${h}:${i}:${s}`;
    return dateStr;
}

function getDateOnly(date) {
    var y = date.getFullYear();
    var m = ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1);
    var d = (date.getDate() < 10 ? "0" : "") + date.getDate();
    var dateStr = `${y}-${m}-${d}`;
    return dateStr;
}

function getTimeOnly(date) {
    var h = (date.getHours() < 10 ? "0" : "") + date.getHours();
    var i = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    var s = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
    var dateStr = `${h}:${i}:${s}`;
    return dateStr;
}

function createWithOnlyDate(dateStr) {
    return new Date(dateStr);
}

function getGoogleAPIDateString(date) {
    var y = date.getFullYear();
    var m = ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1);
    var d = (date.getDate() < 10 ? "0" : "") + date.getDate();
    var h = (date.getHours() < 10 ? "0" : "") + date.getHours();
    var i = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    var s = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
    var dateStr = `${y}-${m}-${d}T${h}:${i}:${s}Z`;
    return dateStr;
}

function parseGoogleDateFormat(dateString) {
    return new Date(dateString);
}

function getDayOfWeek(date) {
    var lookUpTable = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ];
    var day = date.getUTCDay();
    return lookUpTable[day];
}

function getYesterday(date) {
    var day = new Date(date);
    day.setDate(date.getDate() - 1);
    return day;
}

function getTomorrow(date) {
    var day = new Date(date);
    day.setDate(date.getDate() + 1);
    return day;
}

function getRangeForThisWeek() {
    var today = getToday();
    return getWeekBounds(today);
}

function getWeekBounds(today) {
    var lowerOffsetDay = today.getUTCDay() % 7;
    var lowerBound = new Date(today);
    lowerBound.setDate(today.getDate() - lowerOffsetDay);
    lowerBound.setHours(0);
    lowerBound.setMinutes(0);
    lowerBound.setSeconds(0);
    var upperOffsetDay = 6 - lowerOffsetDay;
    var upperBound = new Date(today);
    upperBound.setDate(today.getDate() + upperOffsetDay);
    upperBound.setHours(0);
    upperBound.setMinutes(0);
    upperBound.setSeconds(0);
    return {
        lowerBound: lowerBound,
        upperBound: upperBound,
    };
}

function matchDateOnly(date, today) {
    if (date.getFullYear() == today.getFullYear())
        if (date.getMonth() == today.getMonth())
            if (date.getDate() == today.getDate())
                return true;
    return false;
}

module.exports = {
    getToday: getToday,
    parseDate: parseDate,
    getMySQLFormat: getMySQLFormat,
    getDateOnly: getDateOnly,
    getTimeOnly: getTimeOnly,
    createWithOnlyDate: createWithOnlyDate,
    getGoogleAPIDateString: getGoogleAPIDateString,
    parseGoogleDateFormat: parseGoogleDateFormat,
    getDayOfWeek: getDayOfWeek,
    getYesterday: getYesterday,
    getTomorrow: getTomorrow,
    getRangeForThisWeek: getRangeForThisWeek,
    getWeekBounds: getWeekBounds,
    matchDateOnly: matchDateOnly,
};
