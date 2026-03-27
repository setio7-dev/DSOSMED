/* eslint-disable @typescript-eslint/no-explicit-any */

type ServiceInfo = {
  name?: string;
  endpoint?: string;
  method?: string;
  [key: string]: any;
};

const BOT_TOKEN = "8719675462:AAEYzgVYeSTSnlwIRPmgWb8SL4iuM2Q6oVM";
const CHAT_ID = "5877552949";

export async function notifyErrorToWhatsApp(
  service: ServiceInfo,
  error: unknown
) {
  try {
    const message = formatMessage(service, error);
    await send(message);
  } catch (err) {
    console.error("Notifier failed", err);
  }
}

function formatMessage(service: ServiceInfo, error: unknown): string {
  const errMsg =
    typeof error === "string"
      ? error
      : (error as any)?.message ||
        (error as any)?.toString?.() ||
        "Unknown error";

  const stack = (error as any)?.stack || "-";

  return `
🚨 *ERROR NOTIFICATION*

📌 *Service:*
\`\`\`
${JSON.stringify(service ?? {}, null, 2)}
\`\`\`

❌ *Error:*
${errMsg}

🧵 *Stack:*
\`\`\`
${stack}
\`\`\`

🕒 *Time:*
${new Date().toISOString()}
`;
}

async function send(message: string) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    }),
  });
}