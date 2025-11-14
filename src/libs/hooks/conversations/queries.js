// src/libs/hooks/conversations/queries.js
// Conversations GET hooks (list, detail, messages) using useGetQuery

import { useGetQuery } from '../../api/api';
import { ENDPOINTS } from '../../api/endpoints';

const DEFAULT_OPTIONS = {
  staleTime: 20_000,
  refetchOnWindowFocus: false,
};

/**
 * Fetch paginated/list of conversations.
 * params can contain pagination/filters (e.g. { page, per_page }).
 */
export function useConversationsList(params = undefined, options = {}) {
  return useGetQuery(ENDPOINTS.CONVERSATION.LIST, params, { ...DEFAULT_OPTIONS, ...options });
}

/**
 * Fetch conversation detail by id.
 * Usage: useConversationDetail(conversationId)
 */
export function useConversationDetail(conversationId, options = {}) {
  if (!conversationId) return useGetQuery('__conversation_detail_not_set__', undefined, { enabled: false, ...options });
  return useGetQuery(ENDPOINTS.CONVERSATION.DETAIL(conversationId), undefined, { ...DEFAULT_OPTIONS, ...options });
}

/**
 * Fetch messages for a conversation id.
 * Usage: useConversationMessages(conversationId, { enabled: !!conversationId })
 */
export function useConversationMessages(conversationId, params = undefined, options = {}) {
  if (!conversationId) return useGetQuery('__conversation_messages_not_set__', undefined, { enabled: false, ...options });
  return useGetQuery(ENDPOINTS.CONVERSATION.MESSAGES(conversationId), params, { ...DEFAULT_OPTIONS, ...options });
}

export default {
  useConversationsList,
  useConversationDetail,
  useConversationMessages,
};
