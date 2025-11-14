// Central registry of API endpoints (relative paths after /route)
// Keep only string constants & small helpers here. Do not perform fetch.
// Example usage: api.get(ENDPOINTS.USER) or api.post(ENDPOINTS.REPOS, body)

export const ENDPOINTS = Object.freeze({
  USER: 'api/user/profile', // current authenticated user session/profile
  REPOS: 'repos',
  AUTH: {
    STATUS: 'api/auth/status',
    LOGIN: 'api/auth/login', // if you need an internal call (not used for OAuth redirect)
    LOGOUT: 'api/auth/logout',
  },
  CONVERSATION: {
    CREATE: 'api/conversations',
    LIST: 'api/conversations',
    DETAIL: (id) => `api/conversations/${id}`,
    MESSAGES: (id) => `api/conversations/${id}/messages`,
  },
  REPOSITORIES:{
    LIST: 'api/repos',
    SYNC: 'api/github/sync_repos',
  },
  BRANCHES:{
    LIST: (repoId) => `api/repos/${repoId}/branches`,
    SYNC_BRANCHES: (owner, repo) => `api/github/${owner}/${repo}/branches/sync`,
  },
  CONVERSATION:{
    UPDADE: (id) => `api/conversations/${id}`,
    DELETE: (id) => `api/conversations/${id}`,
    CREATE: 'api/conversations',
    LIST: 'api/conversations',
    DETAIL: (id) => `api/conversations/${id}`,
    MESSAGES: (id) => `api/conversations/${id}/messages`,
  },
});

// Pattern for feature grouping example (extend when needed)
// export const CHAT = {
//   ROOT: 'chat',
//   SESSIONS: 'chat/sessions',
//   SESSION: (id) => `chat/sessions/${id}`,
// };
