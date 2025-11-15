// src/libs/hooks/repoai/queries.js
// RepoAI-specific queries using the repoai client

import { useRepoGetQuery, REPOAI_BASE_URL } from '../../api/repoai';
import { useEffect, useState, useRef } from 'react';

const DEFAULT_OPTIONS = { staleTime: 5000, refetchOnWindowFocus: false };

/**
 * Health check for the RepoAI service.
 * Calls GET /api/health on the RepoAI backend.
 * Usage: const { data, isLoading } = useRepoHealthCheck();
 */
export function useRepoHealthCheck(options = {}) {
  // endpoint here is 'api/health' per request
  return useRepoGetQuery('api/health', undefined, { ...DEFAULT_OPTIONS, ...options });
}


/**
 * Subscribe to refactor SSE stream for a refactor session.
 * Usage: const { connected, lastEvent, error, close } = useRefactorSSE(sessionId, { onMessage })
 *
 * onMessage will be called with parsed data for each message.
 */
export function useRefactorSSE(sessionId, { onMessage, onOpen, onError, enabled = true } = {}) {
  const [connected, setConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState(null);
  const [error, setError] = useState(null);
  const esRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;
    if (!sessionId) return undefined;

    const endpoint = `api/refactor/${sessionId}/sse`;
    const url = `${REPOAI_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

    try {
      const es = new EventSource(url);
      esRef.current = es;

      es.onopen = (ev) => {
        setConnected(true);
        setError(null);
        if (typeof onOpen === 'function') onOpen(ev);
      };

      es.onmessage = (evt) => {
        let parsed = evt.data;
        try {
          parsed = JSON.parse(evt.data);
        } catch (_) {}
        setLastEvent(parsed);
        if (typeof onMessage === 'function') onMessage(parsed, evt);
      };

      es.onerror = (ev) => {
        setConnected(false);
        setError(new Error('SSE connection error'));
        if (typeof onError === 'function') onError(ev);
      };

      return () => {
        try { es.close(); } catch (_) {}
        esRef.current = null;
        setConnected(false);
      };
    } catch (err) {
      setError(err);
      if (typeof onError === 'function') onError(err);
      return undefined;
    }
  }, [sessionId, enabled, onMessage, onOpen, onError]);

  const close = () => {
    const es = esRef.current;
    if (es) {
      try { es.close(); } catch (_) {}
      esRef.current = null;
      setConnected(false);
    }
  };

  return { connected, lastEvent, error, close };
}

export default { useRepoHealthCheck };
