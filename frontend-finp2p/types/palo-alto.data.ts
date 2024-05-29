export interface IResponsePaloAlto {
  severity: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  thrCategory: ThtCategory[];
  actions: ThtCategory[];
  th_content_name: ThtCategory[];
}

type ThtCategory = {
  name: string;
  value: number;
};
