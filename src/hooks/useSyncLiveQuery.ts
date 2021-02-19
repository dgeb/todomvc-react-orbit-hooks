import { useEffect, useState } from 'react';
import type { SyncRecordCache } from '@orbit/record-cache';
import { buildQuery as bq, RequestOptions } from '@orbit/data';
import type {
  RecordQuery,
  RecordQueryOrExpressions,
  RecordQueryResult
} from '@orbit/records';
import type { QueryDispatch } from './shared/queries';

export default function useSyncLiveQuery(
  queryable: SyncRecordCache,
  queryOrExpressions: RecordQueryOrExpressions,
  queryOptions?: RequestOptions,
  queryId?: string
): {
  data: RecordQueryResult | undefined;
  error: Error | undefined;
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
    queryOrExpressions: RecordQueryOrExpressions,
    queryOptions?: RequestOptions,
    queryId?: string
  ) => {
    setQuery(buildQuery(queryOrExpressions, queryOptions, queryId));
  };

  return { data, error, reset };
}
