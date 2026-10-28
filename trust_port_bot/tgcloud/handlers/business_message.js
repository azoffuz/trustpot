// tgcloud/handlers/business_message.js
// TrustPort Chat Automation Engine for Telegram Business Accounts
// Automatically intercepts, flags, and deletes hazardous APK files sent to the business account

import { api } from 'sdk';
import { db } from 'sdk/db';
import { eq, sql } from 'sdk/db';
import { threatLogs, businessConnections } from '../schema.js';
import { escapeHtml } from '../lib/analyzer.js';

export default async function (message, ctx) {
  if (!message || !message.chat) return;

  const connId = message.business_connection_id;
  const chat = message.chat;
  const user = message.from || {};
  const userName = user.username ? `@${user.username}` : (user.first_name || 'Sender');

  // Check if message contains a document
  const doc = message.document;
  const fileName = doc?.file_name || '';
  const mimeType = doc?.mime_type || '';
  const isApk = fileName.toLowerCase().endsWith('.apk') ||
                mimeType === 'application/vnd.android.package-archive' ||
                fileName.toLowerCase().includes('.apk');

  // =========================================================================
  // CHAT AUTOMATION: INTERCEPT & DELETE HAZARDOUS APK FILES
  // =========================================================================
  if (isApk && connId) {
    console.info(`[CHAT AUTOMATION SHIELD] Malicious APK intercepted in business chat ${chat.id} from ${userName} (${user.id}): ${fileName}`);

    // 1. Immediately delete the dangerous message via Telegram Business API
    let deleted = false;
    try {
      await api.deleteBusinessMessages({
        business_connection_id: connId,
        message_ids: [message.message_id],
      });
      deleted = true;
      console.info(`[CHAT AUTOMATION] Successfully deleted APK message ${message.message_id} on connection ${connId}`);
    } catch (err) {
      console.warn('Could not delete business message (Ensure bot has "can_delete_all_messages" right in Chat Automation settings):', err?.message);
    }

    // 2. Log threat to database
    const fileSizeMb = ((doc?.file_size || 0) / (1024 * 1024)).toFixed(2);
    try {
      await db.insert(threatLogs).values({
        chatId: chat.id,
        chatTitle: chat.title || chat.first_name || 'Business Chat',
        userId: user.id || 0,
        userName: userName,
        fileName: fileName || 'unnamed.apk',
        fileSize: doc?.file_size || 0,
        threatType: 'BUSINESS_CHAT_AUTOMATION_APK',
        riskScore: 92,
        actionTaken: deleted ? 'DELETED_AND_WARNED' : 'WARNING_SENT_DELETE_FAILED',
      }).run();

      // Increment threat count on business connection
      await db.run(
        sql`UPDATE business_connections SET threat_count = threat_count + 1 WHERE connection_id = ${connId}`
      );
    } catch (err) {
      console.warn('DB threat logging error:', err?.message);
    }

    // 3. Send automated protective response on behalf of the business account
    const alertMessage =
      `🛡️ <b>[TRUSTPORT CHAT AUTOMATION: HAZARDOUS FILE INTERCEPTED]</b>\n\n` +
      `⚠️ <b>Security Notice:</b> ${deleted ? 'A hazardous APK file sent to this chat was <b>automatically deleted</b>.' : 'An untrusted APK package was detected in this chat.'}\n\n` +
      `👤 <b>Sender:</b> ${escapeHtml(userName)}\n` +
      `📦 <b>File:</b> <code>${escapeHtml(fileName)}</code> (${fileSizeMb} MB)\n` +
      `🚨 <b>Threat Verdict:</b> High Risk — Sideloaded Android Package\n\n` +
      `🔬 <b>Why is direct APK sharing restricted?</b>\n` +
      `Sideloading unverified APKs is the leading propagation vector for banking trojans, SMS 2FA interception, and accessibility service keyloggers. To protect this account and its devices, automated file hygiene policies block direct APK transmissions.\n\n` +
      `💡 <i>If you are sharing a legitimate application, please provide an official Google Play, F-Droid, or verified web link instead.</i>\n\n` +
      `🌐 Powered by <a href="https://trustport.azoff.uz">TrustPort Autonomous Cyber Defense</a>`;

    try {
      await api.sendMessage({
        business_connection_id: connId,
        chat_id: chat.id,
        text: alertMessage,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      });
    } catch (err) {
      console.warn('Could not send automated business reply message:', err?.message);
    }

    return;
  }

  // Regular messages pass through untouched — the shield acts as a transparent firewall
  // unless user specifically queries TrustPort.
}
