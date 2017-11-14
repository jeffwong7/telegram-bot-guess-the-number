const DateUtil = require("../util/DateUtil.js");
const DatabaseController = require("./DatabaseController.js");

class Game {
    //createTime;
    //costEveryTime;
    //creatorid;

    constructor(costEveryTime, creatorid = 0) {
        this.createTime = DateUtil.getMySQLFormat(new Date());
        this.costEveryTime = costEveryTime;
        this.lower = 1;
        this.higher = 100;
        this.pool = 0;
        this.end = false;
        this.creatorid = creatorid;
        this.secretNumber = Math.floor((Math.random() * 98) + 1) + 1;
    }

    getNow() {
        return `${this.lower} - ${this.higher}`;
    }

    placeOrder(userid, number, name = "有人") {
        if (this.end)
            return "個 game 完左啦";
        var user_bal = DatabaseController.getBalance(userid);
        user_bal -= this.costEveryTime;
        DatabaseController.updateBalance(userid, user_bal);
        this.pool += this.costEveryTime;
        // set
        if (number <= this.lower || number >= this.higher)
            return `仆街，個數ge範圍係 ${this.lower} - ${this.higher} 啊!`;
        if (number < this.secretNumber)
            this.lower = number;
        if (number > this.secretNumber)
            this.higher = number;
        if (number == this.secretNumber) {
            this.end = true;
            var user_bal = DatabaseController.getBalance(userid);
            user_bal += this.pool;
            DatabaseController.updateBalance(userid, user_bal);
            return `個數係 ${this.secretNumber}，你得到 $ ${this.pool}!!`;
        }
        return `${name}估 ${number} \n${this.lower} - ${this.higher}`;
    }

}

module.exports = Game;
