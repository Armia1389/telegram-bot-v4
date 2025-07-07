const BOT_TOKEN = '7394530225:AAHiHa8cBK4uEzFY14Q_kjANOwqNGT_s6M8';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    if (request.method === 'POST') {
      try {
        const update = await request.json();
        const chatId = update.message?.chat.id;
        const text = update.message?.text || '';
        
        if (text === '/start') {
          await sendToTelegram(chatId, '🤖 ربات با توکن جدید فعال شد!');
        }
        
        return new Response('OK');
      } catch (error) {
        return new Response('Error', { status: 500 });
      }
    }
    
    return new Response('این آدرس فقط برای وب‌هوک تلگرام است');
  }
}

async function sendToTelegram(chatId, text) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text
    })
  });
}