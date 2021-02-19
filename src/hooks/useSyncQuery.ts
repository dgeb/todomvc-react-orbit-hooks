import { useEffect, useState } from 'react';
import { buildQuery as bq, RequestOptions } from '@orbit/data';
import type {
  RecordQueryResult,
  RecordQueryOrExpressions,
  RecordQueryBuilder,
  RecordQuery
} from '@orbit/records';
import type { QueryDispatch } from './shared/queries';

export interface SyncQueryable {
  query(
    queryOrExpressions: RecordQueryOrExpressions,
    options?: RequestOptions,
    id?: string
  ): RecordQueryResult;

  queryBuilder: RecordQueryBuilder;
}

export default function useSyncQuery(
  queryable: SyncQueryable,
  queryOrExpressions: RecordQueryOrExpressions,
  queryOptions?: RequestOptions,
  queryId?: string
): {
  data: RecordQueryResult | undefined;
  error: Error | undefined;
  retry: () => void;
  reset: QueryDispatch;
} {
  const [query, setQuery] = useState(
    buildQuery(queryOrExpressions, queryOptions, queryId)
  );
  const [data, setData] = useState<RecordQueryResult | undefined>();
  const [error, setError] = useState();

  function buildQuery(
    queryOrExpressions: RecordQueryOrExpressions,
    queryOptions?: RequestOptions,
    queryId?: string
  ): RecordQuery {
    return bq(
      queryOrExpressions,
      queryOptions,
      queryId,
      queryable.queryBuilder
    );
  }

  function performQuery() {
    if (query) {
      try {
        setData(queryable.query(query));
      } catch (e) {
        setError(e);
      }
    } else if (data !== undefined) {
      setData(undefined);
    }
  }

  const reset = (
    queryOrExpressions: RecordQueryOrExpressions,
    queryOptions?: RequestOptions,
    queryId?: string
  ) => {
    setQuery(buildQuery(queryOrExpressions, queryOptions, queryId));
  };

  const retry = () => performQuery();

  useEffect(() => performQuery(), [query]);

  return { data, error, retry, reset };
}
