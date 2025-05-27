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
      "📚 *Você terá acesso a:*\n" +
      "1️⃣ Programação (Python, Java, Web)\n" +
      "2️⃣ Marketing Digital e Vendas\n" +
      "3️⃣ Design Gráfico e Edição\n" +
      "4️⃣ Finanças e Investimentos\n" +
      "5️⃣ Idiomas\n" +
      "6️⃣ Desenvolvimento Pessoal\n" +
      "7️⃣ Fotografia e Conteúdo\n" +
      "8️⃣ Aulas Ao Vivo e Exclusivas\n\n" +
      "⚡⚡⚡ *ATENÇÃO* ⚡⚡⚡\n" +
      "🕐 *SUA VAGA FOI RESERVADA POR 5 MINUTOS!*\n" +
      "Garanta agora seu acesso selecionando seu plano abaixo ⬇️";

    const keyboard = {
      inline_keyboard: [
        [
          { text: "📚 Acessar Cursos", url: "https://seusite.com/cursos" }
        ],
        [
          { text: "🗓️ Semanal - R$9,90", callback_data: "plano_semanal" },
          { text: "📅 Mensal - R$19,90", callback_data: "plano_mensal" }
        ],
        [
          { text: "♾️ Vitalício - R$39,90", callback_data: "plano_vitalicio" }
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
