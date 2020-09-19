import type {
  QueryOrExpressions,
  RequestOptions
} from '@orbit/data';

export type QueryDispatch = (
  queryOrExpressions: QueryOrExpressions,
  queryOptions?: RequestOptions,
  queryId?: string
) => void;
