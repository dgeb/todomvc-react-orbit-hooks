import { useEffect, useState } from 'react';
import type {
  SyncRecordCache,
  QueryResult
} from '@orbit/record-cache';
import {
  buildQuery as bq,
  Query,
  QueryOrExpressions,
  RequestOptions
} from '@orbit/data';
import type { QueryDispatch } from './shared/queries';

export default function useSyncLiveQuery(
  queryable: SyncRecordCache,
  queryOrExpressions: QueryOrExpressions,
  queryOptions?: RequestOptions,
  queryId?: string
): {
  data: QueryResult | undefined;
  error: Error | undefined;
  reset: QueryDispatch;
} {
  const [query, setQuery] = useState(
    buildQuery(queryOrExpressions, queryOptions, queryId)
  );
  const [data, setData] = useState<QueryResult | undefined>();
  const [error, setError] = useState();

  function buildQuery(
    queryOrExpressions: QueryOrExpressions,
    queryOptions?: RequestOptions,
    queryId?: string
  ): Query {
    return bq(
      queryOrExpressions,
      queryOptions,
      queryId,
      queryable.queryBuilder
    );
  }

  function performLiveQuery() {
    if (query) {
      try {
        setData(queryable.query(query));
      } catch (e) {
        setError(e);
      }

      let unsubscribe = queryable.liveQuery(query).subscribe((lq) => {
        setData(lq.query());
      });

      return () => {
        unsubscribe();
      };
    } else if (data !== undefined) {
      setData(undefined);
    }
  }

  useEffect(() => performLiveQuery(), [query]);

  const reset = (
    queryOrExpressions: QueryOrExpressions,
    queryOptions?: RequestOptions,
    queryId?: string
  ) => {
    setQuery(buildQuery(queryOrExpressions, queryOptions, queryId));
  };

  return { data, error, reset };
}
