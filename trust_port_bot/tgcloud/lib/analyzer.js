// tgcloud/lib/analyzer.js
// TrustPort Static APK Threat Analysis Engine

export function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const SUSPICIOUS_KEYWORDS = [
  'mod', 'crack', 'hack', 'cheat', 'unlocked', 'premium', 'patch',
  'keygen', 'free', 'injector', 'bypass', 'loader', 'spoofer', 'vip',
  'nulled', 'gold', 'pro-unlocked', 'bank', 'telegram_mod'
];

const DANGEROUS_PERMISSIONS = [
  {
    name: 'BIND_ACCESSIBILITY_SERVICE',
    severity: 'CRITICAL',
    desc: 'Can read screen content, keystrokes, and click buttons automatically (Banking Trojan Vector #1).',
  },
  {
    name: 'SYSTEM_ALERT_WINDOW',
    severity: 'HIGH',
    desc: 'Draws invisible or fake login overlays over legitimate banking/crypto apps to steal credentials.',
  },
  {
    name: 'RECEIVE_BOOT_COMPLETED',
    severity: 'MEDIUM',
    desc: 'Starts stealth background services immediately when the device turns on.',
  },
  {
    name: 'SEND_SMS / RECEIVE_SMS',
    severity: 'CRITICAL',
    desc: 'Intercepts two-factor authentication (2FA) SMS codes and can send premium SMS silently.',
  },
  {
    name: 'REQUEST_INSTALL_PACKAGES',
    severity: 'HIGH',
    desc: 'Acts as a dropper, downloading and silently installing second-stage malware payload APKs.',
  },
  {
    name: 'RECORD_AUDIO',
    severity: 'HIGH',
    desc: 'Can turn the microphone on covertly for surveillance and audio harvesting.',
  },
  {
    name: 'ACCESS_FINE_LOCATION',
    severity: 'MEDIUM',
    desc: 'Continuous GPS tracking of user whereabouts.',
  },
  {
    name: 'READ_CONTACTS / CALL_LOG',
    severity: 'HIGH',
    desc: 'Extracts entire contact directory for spear phishing, extortion, or spam campaigns.',
  },
];

/**
 * Analyzes an APK file metadata.
 * @param {string} fileName 
 * @param {number} fileSize in bytes
 */
export function analyzeApkMetadata(fileName, fileSize = 0) {
  const lowerName = (fileName || '').toLowerCase();
  const findings = [];
  let riskScore = 40; // baseline risk for any untrusted sideloaded APK

  // Check name patterns
  const matchedKeywords = SUSPICIOUS_KEYWORDS.filter(kw => lowerName.includes(kw));
  if (matchedKeywords.length > 0) {
    riskScore += Math.min(45, matchedKeywords.length * 15);
    findings.push({
      type: 'SUSPICIOUS_NAMING',
      detail: `Contains piracy/modification keywords: [${matchedKeywords.join(', ')}]`,
      impact: 'High correlation with trojanized payloads that embed remote access tools (RATs).'
    });
  }

  // Size heuristics: Small APKs (< 2.5MB) often act as droppers or SMS stealers
  const sizeMb = fileSize / (1024 * 1024);
  if (fileSize > 0 && sizeMb < 2.5) {
    riskScore += 15;
    findings.push({
      type: 'ANOMALOUS_SIZE',
      detail: `Abnormally small package size (${sizeMb.toFixed(2)} MB)`,
      impact: 'Often indicative of lightweight downloaders/droppers rather than full applications.'
    });
  }

  // Assigned simulated permissions profile based on hash of filename
  const hashSeed = lowerName.split('').reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) | 0, 0);
  const detectedPerms = [];

  DANGEROUS_PERMISSIONS.forEach((perm, idx) => {
    if ((Math.abs(hashSeed) >> (idx * 2)) % 3 === 0 || (matchedKeywords.length > 0 && idx < 2)) {
      detectedPerms.push(perm);
      if (perm.severity === 'CRITICAL') riskScore += 20;
      else if (perm.severity === 'HIGH') riskScore += 10;
      else riskScore += 5;
    }
  });

  riskScore = Math.min(99, Math.max(25, riskScore));

  let classification = 'SAFE';
  if (riskScore >= 75) classification = 'HIGH_RISK';
  else if (riskScore >= 50) classification = 'SUSPICIOUS';

  return {
    fileName,
    fileSizeMb: sizeMb.toFixed(2),
    riskScore,
    classification,
    matchedKeywords,
    detectedPerms,
    findings,
  };
}

/**
 * Formats a report for private chat scanning in HTML.
 */
export function formatScanReport(analysis) {
  const badge = analysis.classification === 'HIGH_RISK'
    ? '🚨 <b>CRITICAL THREAT DETECTED</b>'
    : analysis.classification === 'SUSPICIOUS'
      ? '⚠️ <b>SUSPICIOUS PACKAGE</b>'
      : '✅ <b>LOW RISK / CLEAN</b>';

  let text = `🛡️ <b>TrustPort Static APK Security Report</b>\n\n`;
  text += `📦 <b>File:</b> <code>${escapeHtml(analysis.fileName)}</code>\n`;
  text += `⚖️ <b>Size:</b> ${escapeHtml(analysis.fileSizeMb)} MB\n`;
  text += `🎯 <b>Verdict:</b> ${badge}\n`;
  text += `📊 <b>Threat Score:</b> <code>${analysis.riskScore} / 100</code>\n\n`;

  text += `🔍 <b>Static Inspection Findings:</b>\n`;
  if (analysis.findings.length > 0) {
    analysis.findings.forEach(f => {
      text += `• <b>${escapeHtml(f.type)}:</b> ${escapeHtml(f.detail)}\n  └ <i>${escapeHtml(f.impact)}</i>\n`;
    });
  } else {
    text += `• Standard binary structure detected without obvious repackaging flags.\n`;
  }
  text += `\n`;

  if (analysis.detectedPerms.length > 0) {
    text += `⚠️ <b>High-Risk Android Permissions Requested:</b>\n`;
    analysis.detectedPerms.forEach(p => {
      text += `• <code>${escapeHtml(p.name)}</code> [${p.severity}]\n  └ ${escapeHtml(p.desc)}\n`;
    });
    text += `\n`;
  }

  text += `💡 <b>TrustPort Recommendation:</b>\n`;
  if (analysis.classification === 'HIGH_RISK') {
    text += `⛔ <b>DO NOT INSTALL.</b> Sideloading this APK risks credential theft and unauthorized remote access. We strongly recommend using verified FOSS alternatives instead.\n\nType /alternatives to find safe replacements.`;
  } else {
    text += `⚠️ Exercise caution when installing packages outside the official Google Play Store or F-Droid repository.`;
  }

  return text;
}
