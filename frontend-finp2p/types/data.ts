export interface DATA {
  totalEvents: {
    totalEvents: number;
    totalPortnox: number;
    totalDarktrace: number;
    totalImpDam: number;
    totalImpWaf: number;
    totalCheckFw: number;
    totalAdAudit: number;
    totalPaloAlto: number;
    totalCheckHm: number;
    totalCheckFwAtt: number;
  };

  severity: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };

  checkpointIndicators: {
    firewall: number;
    antimalware: number;
    antivirus: number;
    antibot: number;
    ransomware: number;
  };

  portnoxIndicators: {
    indicators: {
      dvc_nt_comply: number;
      dvc_unreachable: number;
      dvc_rogue: number;
      mss_ips: number;
    };
    monthly: {
      dvc_nt_comply: number[];
      dvc_unreachable: number[];
      dvc_rogue: number[];
      mss_ips: number[];
    };
  };

  generalActivity: number[];
}

// "totalEvents": {
//   "totalEvents": 753399,
//   "totalPortnox": 100,
//   "totalDarktrace": 100000,
//   "totalImpDam": 480243,
//   "totalImpWaf": 17416,
//   "totalCheckFw": 149331,
//   "totalAdAudit": 934,
//   "totalPaloAlto": 5323,
//   "totalCheckHm": 50,
//   "totalCheckFwAtt": 2
// },
// "severity": {
//   "low": 1221,
//   "medium": 4028,
//   "high": 2,
//   "critical": 3
// }

export interface ILastUpdate {
  lastUpdate: string | null;
}
