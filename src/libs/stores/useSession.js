// src/libs/stores/useSession.js
// Simple Zustand store for persisting the current selected repo and branch.

import { create } from 'zustand';
import { storage } from '../utils/storage';

const STORAGE_KEY = 'repoai:session';
const initial = storage.getJSON(STORAGE_KEY, { currentRepo: null, currentBranch: null, currentConversation: null });

export const useSession = create((set, get) => ({
  currentRepo: initial.currentRepo,
  currentBranch: initial.currentBranch,
  currentConversation: initial.currentConversation,
  setCurrentRepo: (repo) => {
    set({ currentRepo: repo });
    const { currentBranch, currentConversation } = get();
    storage.setJSON(STORAGE_KEY, { currentRepo: repo, currentBranch, currentConversation });
  },
  setCurrentBranch: (branch) => {
    set({ currentBranch: branch });
    const { currentRepo, currentConversation } = get();
    storage.setJSON(STORAGE_KEY, { currentRepo, currentBranch: branch, currentConversation });
  },
  setCurrentConversation: (conversation) => {
    set({ currentConversation: conversation });
    const { currentRepo, currentBranch } = get();
    storage.setJSON(STORAGE_KEY, { currentRepo, currentBranch, currentConversation: conversation });
  },
  clearSession: () => {
    set({ currentRepo: null, currentBranch: null, currentConversation: null });
    storage.remove(STORAGE_KEY);
  },
}));
