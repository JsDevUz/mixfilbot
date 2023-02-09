const { get } = require('lodash');
const { Telegraf } = require('telegraf');

const bot = new Telegraf('5607633555:AAElFBCn6rL7ft9h8cMf204RYJNijAzbROE');
bot.start(async (ctx) => await ctx.reply('Welcome'));

bot.on('text', async (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, 'upload_video')
    let checkBozorMember = await bot.telegram.getChatMember('-1001636651553', ctx.chat.id).then(e => get(e, 'status', false)).catch(e => false)
    let checkFilmMember = await bot.telegram.getChatMember('-1001651887201', ctx.chat.id).then(e => get(e, 'status', false)).catch(e => false)
    // let checkSportMember = await bot.telegram.getChatMember('-1001530605231', ctx.chat.id).then(e => get(e, 'status', false)).catch(e => false)

    if (checkBozorMember == 'left' || checkFilmMember == 'left') {
        bot.telegram.sendMessage(ctx.chat.id, `Botdan to'liq foydalanish uchun quydagi kanallarga a'zo bo\'ling\n\n@bozorlikuz ${checkBozorMember == 'left' ? '❌' : '✅'}\n@mixfilm_hd ${checkFilmMember == 'left' ? '❌' : '✅'}`)
        return
    }
    bot.telegram.sendVideo(ctx.chat.id,
        `https://t.me/bazamixfilm/${ctx.message.text}`,
        { caption: 'Yuklab olishingiz mumkun' }
    ).catch(e => {
        bot.telegram.sendMessage(ctx.chat.id, 'Bunday ko\'dga ega kino bazada mavjud emass')
    })
})

bot.launch();



