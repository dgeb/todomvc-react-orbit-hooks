import { useEffect, useState } from 'react';
import { buildQuery as bq, RequestOptions } from '@orbit/data';
import type {
  RecordQueryBuilder,
  RecordQueryResult,
  RecordQueryOrExpressions,
  RecordQuery
} from '@orbit/records';
import type { QueryDispatch } from './shared/queries';

export interface AsyncQueryable {
  query(
    queryOrExpressions: RecordQueryOrExpressions,
    options?: RequestOptions,
    id?: string
  ): Promise<RecordQueryResult>;

  queryBuilder: RecordQueryBuilder;
}

export default function useQuery(
  queryable: AsyncQueryable,
  queryOrExpressions: RecordQueryOrExpressions,
  queryOptions?: RequestOptions,
  queryId?: string
): {
  data: RecordQueryResult | undefined;
  error: Error | undefined;
  loading: boolean;
  retry: () => void;
  reset: QueryDispatch;
} {
  const [query, setQuery] = useState(
    buildQuery(queryOrExpressions, queryOptions, queryId)
  );
  const [data, setData] = useState<RecordQueryResult | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState(true);

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

  async function performQuery() {
    if (query) {
      try {
        setData(await queryable.query(query));
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
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
    setLoading(true);
    setQuery(buildQuery(queryOrExpressions, queryOptions, queryId));
  };

  const retry = () => {
    setLoading(true);
    performQuery();
  };

  useEffect(() => {
    performQuery();
  }, [query]);

  return { data, error, loading, retry, reset };
}
