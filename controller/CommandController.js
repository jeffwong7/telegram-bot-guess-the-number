var Game = require("./Game.js");
var DatabaseController = require("./DatabaseController.js");
const Util = require("../util/Util.js");

var game = null;
var isStart = false;

function initCommandController(bot) {
    game = null;
    isStart = false;
    bot.command("/start", (ctx) => {
        var userid = ctx.update.message.from.id;
        var startToken = ctx.update.message.text.split(" ");
        var costEveryTime = Number(startToken[1]);
        if (isNaN(costEveryTime))
            return ctx.reply("比個數字黎啊仆街!");
        if (isStart)
            return ctx.reply("上一round都未玩完!");
        if (costEveryTime <= 0)
            return ctx.reply("頂你呀，cost要大過0!");
        game = new Game(costEveryTime, userid);
        isStart = true;
        ctx.reply(`開口中開始 \n1 - 100`);
    });
    bot.command("/guess", (ctx) => {
        if (!Util.isObjDefined(game))
            return ctx.reply("仆街，打 /start [number] 開始遊戲啊");
        var userid = ctx.update.message.from.id;
        var guessToken = ctx.update.message.text.split(" ");
        var guessNumber = Number(guessToken[1]);
        if (isNaN(guessNumber))
            return ctx.reply("比個數字黎啊仆街!");
        guessNumber = Math.floor(guessNumber);
        var user_balance = DatabaseController.getBalance(userid);
        var name = `${ctx.update.message.from.first_name}`
        if (user_balance < game.costEveryTime)
            return ctx.reply(`${name}: 冇錢就唔好學人玩開口中啦`);
        var broadcast_text = game.placeOrder(userid, guessNumber, name);
        ctx.reply(broadcast_text);
        if (game.end) {
            game = null;
            isStart = false;
        }
    });
    bot.command("/coin", (ctx) => {
        var userid = ctx.update.message.from.id;
        var name = `${ctx.update.message.from.first_name}`
        var user_balance = DatabaseController.getBalance(userid);
        ctx.reply(`${name}: 你的賬號尚有 $ ${user_balance}`);
    });
    bot.command("/now", (ctx) => {
        if (!Util.isObjDefined(game))
            return ctx.reply("仆街，打 /start [number] 開始遊戲啊");
        ctx.reply(game.getNow());
    });
    bot.command("/pool", (ctx) => {
        if (!Util.isObjDefined(game))
            return ctx.reply("仆街，打 /start [number] 開始遊戲啊");
        ctx.reply(`個pool而家有 $ ${game.pool}`);
    });
    bot.command("/end", (ctx) => {
        if (!Util.isObjDefined(game))
            return ctx.reply("仆街，打 /start [number] 開始遊戲啊");
        if (ctx.update.message.from.id != game.creatorid)
            return ctx.reply("未完啊，繼續玩!");
        game = null;
        isStart = false;
        ctx.reply(`玩完`);
    });
    bot.command("/help", (ctx) => {
        var command_list = "Command List:\n" +
            "/start [coin] Start game with minumum deal.\n" +
            "/guess [number] Guess the number.\n" +
            "/end End the game\n" +
            "/coin Check your own balance.\n" +
            "/now Check the range of number.\n" +
            "/pool Check the balance of the pool.\n";
        ctx.reply(command_list);
    });
}

module.exports = {
    initCommandController,
};
