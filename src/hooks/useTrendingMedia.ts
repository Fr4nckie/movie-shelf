import { useQuery } from '@tanstack/react-query'
import type { MediaType, TimeWindow } from '../types/media'
import { getTrendingMedia } from '../services/getTrendingMedia'

export function useTrendingMedia(
    mediaType: MediaType,
    timeWindow: TimeWindow = 'week',
    page?: number
) {
    return useQuery({
        queryKey: [mediaType, timeWindow, page],
        queryFn: () => getTrendingMedia(mediaType, timeWindow, page)
    })
}
