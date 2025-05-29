const fetch = require("node-fetch");

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const body = JSON.parse(event.body);

  // Verifica se é mensagem comum
  const message = body.message;
  if (!message) {
    return { statusCode: 200, body: "No message" };
  }

  const text = message.text;
  const chatId = message.chat.id;

 if (text === "/start") {
    const reply =
      "💎 *CURSOS PREMIUM DISPONÍVEIS PARA VOCÊ* 👇\n\n" +
      "💎 𝐂𝐎𝐍𝐓𝐄Ú𝐃𝐎𝐒 𝐕𝐈𝐏 𝐐𝐔𝐄 𝐕𝐎𝐂Ê 𝐓𝐄𝐑Á 𝐀𝐂𝐄𝐒𝐒𝐎 👇🏾\n\n" +
      "⭐️ FAMOSAS    ⭐️ VÍDEOS VAZADOS\n" +
      "⭐️ NOVINHAS   ⭐️ CÂMERAS\n" +
      "⭐️ COROAS     ⭐️ CUCKOLD\n" +
      "⭐️ TRANS/GAY  ⭐️ PODOLATRIA\n" +
      "⭐️ CASEIRÃO   ⭐️ GORDINHAS BBW\n" +
      "⭐️ CASADAS    ⭐️ INCESTOS\n" +
      "⭐️ EM PÚBLICO ⭐️ NERDOLINHAS\n" +
      "⭐️ FLAGRAS    ⭐️ E-GIRLS\n\n" +
      "💰 BÔNUS SURPRESA\n\n" +
      "📂 GRUPO 100% ORGANIZADO ✅\n" +
      "(Categorias divididas por pasta)\n\n" +
      "🔐 TENHA ACESSO IMEDIATO ✅\n\n" +
      "GARANTA AGORA 9 VIPs PAGANDO APENAS 1 ⚡️\n\n" +
      "⚡⚡⚡ *ATENÇÃO* ⚡⚡⚡\n" +
      "🕐 *SUA VAGA FOI RESERVADA POR 5 MINUTOS!*\n" +
      "Garanta agora seu acesso selecionando seu plano abaixo ⬇️";

   const keyboard = {
  inline_keyboard: [
    [
      { text: "🗓️ Semanal - R$7,90", url: "https://go.tribopay.com.br/hzdzs" },
      { text: "📅 Mensal - R$12,90", url: "https://go.tribopay.com.br/rbeqi" }
    ],
    [
      { text: "♾️ Vitalício - R$39,90", url: "https://go.tribopay.com.br/jrdzj" }
    ]
  ]
};

    await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: reply,
        parse_mode: "Markdown",
        reply_markup: keyboard
      })
    });
  }

  return { statusCode: 200, body: "OK" };
};