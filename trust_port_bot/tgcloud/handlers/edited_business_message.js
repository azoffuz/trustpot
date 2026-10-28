// tgcloud/handlers/edited_business_message.js
// Intercepts edited messages in Telegram Business Chat Automation to prevent delayed payload injection

import handleBusinessMessage from './business_message.js';

export default async function (editedMessage, ctx) {
  return handleBusinessMessage(editedMessage, ctx);
}
