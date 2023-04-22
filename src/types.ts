import type { Dispatch, SetStateAction } from 'react';
import type { SWRResponse } from 'swr';

export type TbConfig = {
  baseUrl?: string;
  setBaseUrl?: string;
  token?: string;
  setToken?: Dispatch<SetStateAction<string>>;
};
export type BaseColumnType = 'String' | 'Date' | 'UInt64' | 'Float64';

export type ColumnType = BaseColumnType | `Nullable(${BaseColumnType})`;

export type Meta<T> = { name: keyof T; type: ColumnType };

export type ClientResponse<T> = T & { error?: string };

export type Statistics = {
  elapsed: number;
  rows_read: number;
  bytes_read: number;
};

export class QueryError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'QueryError';
    this.status = status;
  }
}

export type PipeParams<T> = Record<keyof T, string>;

export type QueryPipe<T> = {
  meta: Meta<T>[];
  data: T[];
  rows: number;
  statistics: Statistics;
};

export type QueryStatus = 'idle' | 'loading' | 'updating' | 'error' | 'success';

export type QueryResponse<T> = SWRResponse<T> & {
  warning: QueryError | null;
  status: QueryStatus;
};