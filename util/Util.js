function isObjDefined(obj) {
    if (obj == undefined || obj == null)
        return false;
    return true;
}

function isStrValid(str) {
    if (!isObjDefined(str))
        return false;
    if (str.trim().length > 0)
        return true;
    return false;
}

module.exports = {
    isObjDefined,
    isStrValid,
};
