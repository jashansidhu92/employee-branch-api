export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const ok = <T>(data: T): ApiResponse<T> => ({ success: true, data });

export const fail = (message: string, status = 400) => {
  const err: any = new Error(message);
  err.status = status;
  return err;
};
