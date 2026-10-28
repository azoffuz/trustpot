// tgcloud/lib/alternatives.js
// Curated catalog of safe, verified Free and Open-Source Software (FOSS)
// designed to eliminate the need for dangerous cracked APKs and pirated software.

export const FOSS_CATALOG = {
  media: [
    {
      name: 'NewPipe',
      category: 'Media & Streaming',
      replaces: 'YouTube Premium / Modded YouTube',
      description: 'Lightweight YouTube frontend without ads, tracking, or Google Play Services.',
      url: 'https://newpipe.net',
      platform: 'Android',
    },
    {
      name: 'VLC Media Player',
      category: 'Media & Streaming',
      replaces: 'MX Player Pro / Paid Players',
      description: 'Open-source cross-platform multimedia player that plays most codecs and streams.',
      url: 'https://www.videolan.org',
      platform: 'Android / Windows / macOS',
    },
    {
      name: 'ViMusic / InnerTune',
      category: 'Audio Streaming',
      replaces: 'Spotify Premium Mod / YouTube Music',
      description: 'Stream music from YouTube Music without commercials, login, or tracking.',
      url: 'https://github.com/vfsfitvnm/ViMusic',
      platform: 'Android',
    },
  ],
  productivity: [
    {
      name: 'LibreOffice',
      category: 'Office Suite',
      replaces: 'Microsoft 365 / MS Office Cracks',
      description: 'Comprehensive, free office suite compatible with DOCX, XLSX, PPTX.',
      url: 'https://www.libreoffice.org',
      platform: 'Windows / macOS / Linux',
    },
    {
      name: 'Collabora Office',
      category: 'Mobile Office',
      replaces: 'MS Office Mobile / WPS Office VIP',
      description: 'Privacy-focused document editor for phone and tablet based on LibreOffice.',
      url: 'https://www.collaboraoffice.com',
      platform: 'Android / iOS',
    },
    {
      name: 'Obsidian / Joplin',
      category: 'Notes & Organization',
      replaces: 'Notion / Evernote Paid',
      description: 'Encrypted, local-first markdown note-taking with sync options.',
      url: 'https://joplinapp.org',
      platform: 'Android / Desktop',
    },
  ],
  security: [
    {
      name: 'Bitwarden',
      category: 'Password Management',
      replaces: '1Password / LastPass Premium',
      description: 'Audited, open-source password manager with cross-device end-to-end encryption.',
      url: 'https://bitwarden.com',
      platform: 'All Platforms',
    },
    {
      name: 'Proton VPN',
      category: 'VPN & Privacy',
      replaces: 'ExpressVPN / NordVPN Cracks',
      description: 'Swiss-based audited VPN with a legitimate free tier and zero activity logging.',
      url: 'https://protonvpn.com',
      platform: 'All Platforms',
    },
    {
      name: 'Aegis Authenticator',
      category: '2FA / Authentication',
      replaces: 'Authy / Proprietary 2FA',
      description: 'Secure, encrypted 2-factor authentication token generator for Android.',
      url: 'https://getaegis.app',
      platform: 'Android',
    },
  ],
  creatives: [
    {
      name: 'GIMP / Photopea',
      category: 'Graphics & Image Editing',
      replaces: 'Adobe Photoshop',
      description: 'High-power image manipulation and graphic creation without expensive subscriptions.',
      url: 'https://www.gimp.org',
      platform: 'Desktop / Web',
    },
    {
      name: 'Krita',
      category: 'Digital Painting',
      replaces: 'Clip Studio Paint / Photoshop',
      description: 'Professional open-source sketching, painting, and illustration tool.',
      url: 'https://krita.org',
      platform: 'Android Tablet / Desktop',
    },
    {
      name: 'CapCut / Shotcut / Kdenlive',
      category: 'Video Editing',
      replaces: 'Adobe Premiere / Kinemaster Mod',
      description: 'Clean video editors with timeline, filters, audio mixing, and 4K export.',
      url: 'https://kdenlive.org',
      platform: 'Desktop / Android',
    },
  ],
  utilities: [
    {
      name: 'F-Droid',
      category: 'App Store',
      replaces: 'HappyMod / Modded APK Portals',
      description: 'The premier catalog of FOSS (Free and Open Source Software) applications for Android.',
      url: 'https://f-droid.org',
      platform: 'Android',
    },
    {
      name: 'LocalSend',
      category: 'File Transfer',
      replaces: 'SHAREit / AirDrop Clone Cracks',
      description: 'Cross-platform, local network file sharing without ads, internet, or tracking.',
      url: 'https://localsend.org',
      platform: 'All Platforms',
    },
  ],
};

export function getAlternativesSummary() {
  let summary = '🛡️ <b>TrustPort Verified Open-Source Software Directory</b>\n\n';
  summary += 'Stop risking your device with trojanized APK cracks and keygens. Use these vetted FOSS alternatives instead:\n\n';

  for (const [section, items] of Object.entries(FOSS_CATALOG)) {
    summary += `📁 <b>${section.toUpperCase()}</b>\n`;
    for (const item of items) {
      summary += `• <b>${item.name}</b> (Replaces <i>${item.replaces}</i>)\n`;
      summary += `  └ <a href="${item.url}">Official Site</a> — ${item.description}\n`;
    }
    summary += '\n';
  }

  summary += '💡 <i>Need a safe alternative for a specific app? Search our catalog at trustport.azoff.uz</i>';
  return summary;
}
