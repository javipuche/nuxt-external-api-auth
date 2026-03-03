import type { PiniaColadaOptions } from '@pinia/colada'

export default {
  query: {
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  },
} satisfies PiniaColadaOptions
