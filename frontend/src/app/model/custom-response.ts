export interface CustomResponse<T> {
  timestamp: Date;
  statusCode: number;
  status: string;
  reason?: string;
  message?: string;
  developerMessage?: string;
  data: { [key: string]: T };
}
