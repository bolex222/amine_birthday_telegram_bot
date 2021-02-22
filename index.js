import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
import cron from 'node-cron'
import dayjs from 'dayjs'

dotenv.config()
const { MESSAGE, TELEGRAM_BOT_TOKEN } = process.env
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, {polling: true})

let chatId
let isRunning = false
let task

const createSchedule = (hour = false, minute = false) => {
  if (!hour || !minute) {
    const now = dayjs().add(1, 'm')
    hour = now.hour()
    minute = now.minute()
  }

  task = cron.schedule(`${minute} ${hour} * * *`, async () => {
    try {
      await bot.sendMessage(chatId, MESSAGE)
    } catch (e) {
      console.log(e);
    }
  }, { scheduled: false})
}

bot.onText(/\/start/, msg => {
  if (isRunning) {
   task.destroy()
  }
  const message = msg.text.trim().split(' ')
  if (message[0].length > 6) {
    bot.sendMessage(msg.chat.id, 'J\'ai rien compris')
  } else if (message.length === 1) {
    bot.sendMessage(msg.chat.id, 'C\'est partiiiie')
    createSchedule()
  } else if (message[1].length >= 3 && message[1].length <= 5) {
    const date = message[1].split(':')
    if (date[0] >= 0  && date[0] <= 23 && date[1] >= 0 && date[1] <= 59) {
      bot.sendMessage(msg.chat.id, 'C\'est partiiiie')
      createSchedule(date[0], date[1])
    } else {
      bot.sendMessage(msg.chat.id, 'J\'ai rien compris')
    }
  } else {
    bot.sendMessage(msg.chat.id, 'J\'ai rien compris')
  }
  chatId = msg.chat.id
  task.start()
  isRunning = true
})

bot.onText(/\/stop/, ({ chat: { id } }) => {
  if (!isRunning) {
    bot.sendMessage(id, 'Mais! Je suis déja à l\'arret')
    return
  }
  bot.sendMessage(id, 'pfiouuuf, c\'était sympa hein :)')
  isRunning = false
  task.destroy()
})

bot.onText(/\/help/, async ({ chat: { id } }) => {
  await bot.sendMessage(id, 'MANUEL')
  await bot.sendMessage(id, '"/start" permet de souhaiter bon anniv a amine tous les jours a l\'huere de la commande')
  await bot.sendMessage(id, '"/start heure:minute" permet de souhaiter bon anniv a amine tous les jours a l\'heure indiqué, heure entre 0 et 23, minute entre 0 et 59')
  await bot.sendMessage(id, 'exemple : "/start 18:25" souhaitera bon anniv a amine tous les jours a 18 heure 25')
  await bot.sendMessage(id, '"/stop" arretera de souhaiter bon anniv à amine')
  await bot.sendMessage(id, '"/help" repetera ce que je viens de dire')
})

bot.on('message', (msg) => {
  console.log(`[${new Date()}] : ${msg.chat.first_name} ${msg.chat.last_name} a run la commande : "${msg.text}"`);
})