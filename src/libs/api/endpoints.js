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
  CHAT_SESSIONS: 'api/chat/sessions',
  CHAT_SESSION_DETAIL: (id) => `api/chat/sessions/${id}`,
  COMMITS: 'api/commits',
  COMMIT_DETAIL: (sha) => `api/commits/${sha}`,
});

// Pattern for feature grouping example (extend when needed)
// export const CHAT = {
//   ROOT: 'chat',
//   SESSIONS: 'chat/sessions',
//   SESSION: (id) => `chat/sessions/${id}`,
// };
