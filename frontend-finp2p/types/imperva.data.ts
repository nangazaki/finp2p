export interface IResponseImperva {
  alertTypeIndicators: {
    custom: number;
    protocol: number;
    signature: number;
  };
  attacksTypes: AttackType[];
  action: {
    none: number;
    block: number;
  };
  top10Ips: SourceIpType[];
}

type AttackType = {
  name: string;
  value: number;
};

type SourceIpType = {
  ip: string;
  num_of_events: number;
};
