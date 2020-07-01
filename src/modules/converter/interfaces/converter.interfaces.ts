export interface IConverter {
  amount: number;
  from: string;
  to: string;
}

export interface IResponse {
  amount: number,
  base_currency_code: string,
  base_currency_name: string,
  rates: any
  status: string,
  updated_date: string
}
