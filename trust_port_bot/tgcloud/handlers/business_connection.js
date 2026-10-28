// tgcloud/handlers/business_connection.js
// Handles Telegram Business "Chat automation" connection lifecycle updates

import { api } from 'sdk';
import { db } from 'sdk/db';
import { eq } from 'sdk/db';
import { businessConnections } from '../schema.js';

export default async function (businessConnection, ctx) {
  if (!businessConnection || !businessConnection.id) return;

  const connId = businessConnection.id;
  const user = businessConnection.user || {};
  const userChatId = businessConnection.user_chat_id;
  const userName = user.username ? `@${user.username}` : (user.first_name || 'Business User');
  const isEnabled = Boolean(businessConnection.is_enabled);
  const canReply = Boolean(businessConnection.can_reply);

  console.info(`[CHAT AUTOMATION] Business connection update for ${userName} (${user.id}): connId=${connId}, enabled=${isEnabled}`);

  try {
    const existing = await db.select().from(businessConnections).where(eq(businessConnections.connectionId, connId)).get();
    if (!existing) {
      await db.insert(businessConnections).values({
        connectionId: connId,
        userId: user.id || 0,
        userName: userName,
        userChatId: userChatId || 0,
        canReply: canReply,
        isEnabled: isEnabled,
        threatCount: 0,
      }).run();
    } else {
      await db.update(businessConnections)
        .set({
          isEnabled: isEnabled,
          canReply: canReply,
          userName: userName,
        })
        .where(eq(businessConnections.connectionId, connId))
        .run();
    }
  } catch (err) {
    console.warn('DB business connection tracking error:', err?.message);
  }

  // Notify the account owner directly in their private chat
  if (userChatId && isEnabled) {
    const statusMsg =
      `🛡️ <b>TrustPort Chat Automation Activated</b>\n\n` +
      `Your personal/business Telegram account (<b>${userName}</b>) is now protected by TrustPort autonomous cyber defense!\n\n` +
      `⚡ <b>What happens now?</b>\n` +
      `• Whenever someone sends an untrusted Android application package (<code>.apk</code>) to your chats, TrustPort will <b>immediately delete the dangerous message</b>.\n` +
      `• A security advisory will be sent to notify the sender that direct APK sharing is restricted to prevent mobile banking trojans, SMS stealers, and keyloggers.\n` +
      `• All standard text and legitimate media messages remain completely uninterrupted.\n\n` +
      `🔒 <i>Defense status: 100% Active (Telegram Business Isolate)</i>\n` +
      `🌐 Portal: <a href="https://trustport.azoff.uz">trustport.azoff.uz</a>`;

    try {
      await api.sendMessage({
        chat_id: userChatId,
        text: statusMsg,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      });
    } catch (err) {
      console.warn('Failed to send business connection welcome DM:', err?.message);
    }
  }
}
