const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./controller/DB.json");
const db = low(adapter);
const Util = require("../util/Util.js");

function initDB() {
    db.defaults({
        balance: [],
    }).write();
}

function initAccountBalance(userid) {
    const startAmount = 500;
    db.get("balance").push({
        userid: userid,
        coin: startAmount,
    }).write();
}

function updateBalance(userid, balance) {
    var result = db.get("balance").find({ userid: userid }).value();
    if (!Util.isObjDefined(result))
        initAccountBalance(userid);
    db.get("balance")
        .find({ userid: userid })
        .assign({ coin: balance })
        .write();
}

function getBalance(userid) {
    var result = db.get("balance").find({ userid: userid }).value();
    if (!Util.isObjDefined(result))
        initAccountBalance(userid);
    else
        return result.coin;
    var result = db.get("balance").find({ userid: userid }).value();
    return result.coin;
}

module.exports = {
    initDB,
    updateBalance,
    getBalance,
};
