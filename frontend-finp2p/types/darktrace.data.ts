export interface IDarktraceResponse {
  annualStatistics: number[];
  topEndpts: Endpoint[];
}

type Endpoint = {
  endpoint: string;
  n_access: number;
};
