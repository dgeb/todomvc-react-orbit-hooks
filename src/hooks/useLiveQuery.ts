import { useEffect, useState } from 'react';
import type { SyncLiveQuery } from '@orbit/record-cache';

export default function useLiveQuery(liveQuery: SyncLiveQuery) {
  const [result, setResult] = useState(liveQuery.query());

  useEffect(() => {
    let unsubscribe = liveQuery.subscribe((lq) => {
      setResult(lq.query());
    });

    return unsubscribe;
  }, []);

  return result;
}
