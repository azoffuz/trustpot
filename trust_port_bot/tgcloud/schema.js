// tgcloud/schema.js
// Database schema for TrustPort Security Shield on Telegram Serverless SQLite

import { table, integer, text, boolean, json, index, sql } from 'sdk/db';

export const chats = table('chats', {
  id:          integer('id').primaryKey({ autoIncrement: true }),
  tgChatId:    integer('tg_chat_id').unique().notNull(),
  chatTitle:   text('chat_title'),
  chatType:    text('chat_type').notNull(),
  isProtected: boolean('is_protected').default(true),
  threatCount: integer('threat_count').default(0),
  createdAt:   integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
}, (t) => ({
  chatIdIdx: index('idx_chats_tg_id').on(t.tgChatId),
}));

export const businessConnections = table('business_connections', {
  id:           integer('id').primaryKey({ autoIncrement: true }),
  connectionId: text('connection_id').unique().notNull(),
  userId:       integer('user_id').notNull(),
  userName:     text('user_name'),
  userChatId:   integer('user_chat_id').notNull(),
  canReply:     boolean('can_reply').default(true),
  isEnabled:    boolean('is_enabled').default(true),
  threatCount:  integer('threat_count').default(0),
  createdAt:    integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
}, (t) => ({
  bcConnIdx: index('idx_bc_conn_id').on(t.connectionId),
  bcUserIdx: index('idx_bc_user_id').on(t.userId),
}));

export const threatLogs = table('threat_logs', {
  id:          integer('id').primaryKey({ autoIncrement: true }),
  chatId:      integer('chat_id').notNull(),
  chatTitle:   text('chat_title'),
  userId:      integer('user_id').notNull(),
  userName:    text('user_name'),
  fileName:    text('file_name').notNull(),
  fileSize:    integer('file_size').default(0),
  threatType:  text('threat_type').default('APK_RESTRICTED'),
  riskScore:   integer('risk_score').default(85),
  actionTaken: text('action_taken').default('DELETED_AND_WARNED'),
  createdAt:   integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
}, (t) => ({
  threatUserIdx: index('idx_threats_user').on(t.userId),
  threatChatIdx: index('idx_threats_chat').on(t.chatId),
}));

export const scans = table('scans', {
  id:        integer('id').primaryKey({ autoIncrement: true }),
  userId:    integer('user_id').notNull(),
  fileName:  text('file_name').notNull(),
  fileSize:  integer('file_size').default(0),
  riskLevel: text('risk_level').default('SUSPICIOUS'),
  score:     integer('score').default(75),
  findings:  json('findings'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
}, (t) => ({
  scansUserIdx: index('idx_scans_user').on(t.userId),
}));
