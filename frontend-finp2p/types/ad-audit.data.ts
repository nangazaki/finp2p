export interface IAdAuditIndicators {
  monthly: number[];
  failure: Failure[];
}

type Failure = {
  name: string;
  value: number;
  label: string;
};
