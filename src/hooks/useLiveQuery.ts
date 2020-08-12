import { useEffect, useState } from 'react';
import type { SyncLiveQuery } from '@orbit/record-cache';

export default function useLiveQuery(liveQuery: SyncLiveQuery) {
  const [results, setResults] = useState(liveQuery.query());

  useEffect(() => {
    let unsubscribe = liveQuery.subscribe((lq) => {
      setResults(lq.query());
    });

    return unsubscribe;
  }, []);

  return [results];
}
