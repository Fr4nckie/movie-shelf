export type MediaType = 'all' | 'movie' | 'tv'

export type TimeWindow = 'day' | 'week'

type BaseMediaItem = {
    adult: boolean
    backdrop_path: string
    id: number
    original_language: string
    overview: string
    poster_path: string
    media_type: 'movie' | 'tv'
    genre_ids: number[]
    popularity: number
    vote_average: number
    vote_count: number
}

type TVSpecific = {
    name: string
    original_name: string
    first_air_date: string
    origin_country: string[]
}

type MovieSpecific = {
    title: string
    original_title: string
    release_date: string
    video: boolean
}

export type MovieItem = BaseMediaItem & MovieSpecific

export type TVItem = BaseMediaItem & TVSpecific

export type MediaItemUnion = MovieItem | TVItem

export type PaginatedResponse = {
    page: number
    results: MediaItemUnion[]
    total_pages: number
    total_results: number
}

export type FileSize = 'w500' | 'original'
