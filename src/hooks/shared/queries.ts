import type { RequestOptions } from '@orbit/data';
import type { RecordQueryOrExpressions } from '@orbit/records';

export type QueryDispatch = (
  queryOrExpressions: RecordQueryOrExpressions,
  queryOptions?: RequestOptions,
  queryId?: string
) => void;
