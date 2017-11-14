const Telegraf = require("telegraf");
const { reply } = Telegraf;
const config = require("./config.json");
const CommandController = require("./controller/CommandController.js");
const DatabaseController = require("./controller/DatabaseController.js");
DatabaseController.initDB();

const bot = new Telegraf(config.API_Key);
CommandController.initCommandController(bot);

bot.startPolling();
console.log("Telegram Bot Service Started.");
