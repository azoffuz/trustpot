// web/src/data/sampleApks.js
// Realistic static analysis profiles for the interactive scanner sandbox

export const SAMPLE_APKS = [
  {
    id: 'banking_trojan',
    name: 'Hook_Banking_Trojan_Dropper.apk',
    size: '1.84 MB',
    packageName: 'com.sec.system.carrier.update',
    hash: 'e8f7a94b56c80214a1c6e4d77341b5cf3e47a98810e4a77e2348512f458cb5b3',
    score: 96,
    verdict: 'CRITICAL_THREAT',
    summary: 'High-confidence Android Banking Trojan with overlay injection and accessibility service exploitation capabilities.',
    riskFactors: [
      {
        title: 'Accessibility Service Weaponization',
        level: 'Critical',
        desc: 'Requests `BIND_ACCESSIBILITY_SERVICE` without assistive UI, enabling programmatic screen reading, keystroke extraction, and synthetic taps.',
      },
      {
        title: 'SMS Exfiltration & 2FA Hijacking',
        level: 'Critical',
        desc: 'Requests `RECEIVE_SMS` and `READ_SMS` with background boot trigger to intercept banking one-time passcodes (OTPs).',
      },
      {
        title: 'Screen Overlay Injection',
        level: 'High',
        desc: 'Includes `SYSTEM_ALERT_WINDOW` configured to project spoofed authentication dialogues over cryptocurrency & banking apps.',
      },
      {
        title: 'Stealth Dropper Footprint',
        level: 'High',
        desc: 'Payload size is abnormally small (1.84 MB) with high binary entropy (7.84 bits/byte) indicating packed/encrypted secondary DEX payload.',
      },
    ],
    permissions: [
      'android.permission.BIND_ACCESSIBILITY_SERVICE',
      'android.permission.SYSTEM_ALERT_WINDOW',
      'android.permission.RECEIVE_BOOT_COMPLETED',
      'android.permission.RECEIVE_SMS',
      'android.permission.READ_SMS',
      'android.permission.REQUEST_INSTALL_PACKAGES',
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
    ],
    recommendation: 'DO NOT INSTALL. Immediately delete from device. TrustPort bot would intercept and delete this file in <180ms.',
  },
  {
    id: 'modded_media',
    name: 'Spotify_Premium_Unlocked_v8.9.74.apk',
    size: '48.20 MB',
    packageName: 'com.spotify.music.modded',
    hash: 'a3d211f440b8e7215cc1207639e99aa2d8e411b02359487c672b15cf7201fa81',
    score: 78,
    verdict: 'HIGH_RISK_MOD',
    summary: 'Repackaged commercial binary with signature mismatch, altered manifest, and embedded third-party ad/telemetry injection.',
    riskFactors: [
      {
        title: 'Repackaged DEX & Broken Certificate',
        level: 'High',
        desc: 'Original developer certificate has been stripped and re-signed with an untrusted debug keystore.',
      },
      {
        title: 'Aggressive Adware & Analytics Injection',
        level: 'Medium',
        desc: 'Contains embedded native libraries connecting to unregistered C2/ad domains in Eastern Europe.',
      },
      {
        title: 'Background Install Request',
        level: 'High',
        desc: 'Requests `REQUEST_INSTALL_PACKAGES` to periodically trigger unauthorized app installations.',
      },
    ],
    permissions: [
      'android.permission.INTERNET',
      'android.permission.REQUEST_INSTALL_PACKAGES',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.WAKE_LOCK',
      'android.permission.FOREGROUND_SERVICE',
    ],
    recommendation: 'High risk of background trojan injection. Switch to ViMusic or InnerTune (audited FOSS replacements).',
  },
  {
    id: 'cracked_creative',
    name: 'Photoshop_Express_VIP_Crack_v12.apk',
    size: '89.15 MB',
    packageName: 'com.adobe.psmobile.cracked',
    hash: 'b149c90538a7981b1932ea48cf6c382104992524a8726839cf9e31aa0c439f0e',
    score: 84,
    verdict: 'MALICIOUS_CRACK',
    summary: 'Trojanized photo editing application packaging an unverified background service that harvests device identifiers.',
    riskFactors: [
      {
        title: 'Telemetry & Contact Siphoning',
        level: 'High',
        desc: 'Unusual permission request: `READ_CONTACTS` and `ACCESS_COARSE_LOCATION` inside an image editor.',
      },
      {
        title: 'Tampered License Verification',
        level: 'Medium',
        desc: 'Smali byte-code patches detected bypassing official Google Play billing verification.',
      },
    ],
    permissions: [
      'android.permission.READ_CONTACTS',
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.CAMERA',
      'android.permission.RECORD_AUDIO',
      'android.permission.INTERNET',
    ],
    recommendation: 'Replace with Krita or Photopea. Avoid running modded APKs demanding contact/audio permissions.',
  },
  {
    id: 'clean_newpipe',
    name: 'NewPipe_v0.27.0_Official_Release.apk',
    size: '11.82 MB',
    packageName: 'org.schabi.newpipe',
    hash: '4d80a1c97a5b3e218206d2745a31e84d632a874b971a065f410978931b26955e',
    score: 6,
    verdict: 'VERIFIED_SAFE',
    summary: 'Legitimate open-source package matching the reproducible build checksum of the official F-Droid repository.',
    riskFactors: [
      {
        title: 'Minimal Permission Footprint',
        level: 'Low',
        desc: 'Only standard media playback and internet permissions requested. Zero telemetry or surveillance APIs.',
      },
      {
        title: 'Verified F-Droid Certificate',
        level: 'Low',
        desc: 'Signed by verified maintainer key matching public reproducible build registry.',
      },
    ],
    permissions: [
      'android.permission.INTERNET',
      'android.permission.WAKE_LOCK',
      'android.permission.FOREGROUND_SERVICE',
      'android.permission.POST_NOTIFICATIONS',
    ],
    recommendation: 'Package is clean and verified safe. Recommended as safe replacement for YouTube modded APKs.',
  },
];
