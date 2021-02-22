# Amine Birthday telegram bot

## Description

This is a small telegram bot made with Nodejs which every day sand a birthday message to my friend Amine
(it's a private joke)

## Used npm libs

I'm using :
```
node-telegram-bot-api
dotenv
node_cron
dayjs
```

## Bot commands

``` /start ``` send a birthday message to Amine on group every day at the actual date

``` /start hour:minute ``` send a message to Amine on group every day at the specified hour and minute. 

example :  ``` /start 18:25 ``` it will every day at 6:25 pm send the birthday message

``` /stop ``` will stop sending birthday messages

``` /help ``` show all commands



## Get Started

rename `` sample.env `` to `` .env ``

open it

replace `` XXXXXXXXXX:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX `` by your telegram bot key

close it

run `` npm i ``

and `` npm start ``

Your bot is working so add it to your group conversation or send him a message in private conversation.

```Procfile `` is there if you want to run the bot on heroku