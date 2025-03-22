"use client"

import { create } from "zustand"

export const useMusicPlayer = create((set) => ({
  currentTrack: null,
  isPlaying: false,
  queue: [],
  volume: 75,

  setCurrentTrack: (track) => set({ currentTrack: track }),

  play: () => set({ isPlaying: true }),

  pause: () => set({ isPlaying: false }),

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setVolume: (volume) => set({ volume }),

  addToQueue: (track) =>
    set((state) => ({
      queue: [...state.queue, track],
    })),

  clearQueue: () => set({ queue: [] }),

  nextTrack: () =>
    set((state) => {
      if (state.queue.length === 0) return {}

      const nextTrack = state.queue[0]
      const newQueue = state.queue.slice(1)

      return {
        currentTrack: nextTrack,
        queue: newQueue,
        isPlaying: true,
      }
    }),

  previousTrack: () => {
    // In a real app, you'd implement history tracking
    // For this demo, we'll just keep the current track
    return {}
  },
}))

