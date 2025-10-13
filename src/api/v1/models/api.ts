export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  details?: any;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
