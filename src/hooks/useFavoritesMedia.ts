import { useQueries } from '@tanstack/react-query'
import { fetchFavoritesMedia } from '../services/fetchFavoritesMedia'
import { useFavoritesStore } from '../store/useFavoritesStore'

export function useFavoritesMedia() {
    const favorites = useFavoritesStore((state) => state.favorites)

    const favoriteQueries = useQueries({
        queries: favorites.map((favorite) => ({
            queryKey: [favorite.id, favorite.media_type],
            queryFn: () =>
                fetchFavoritesMedia(favorite.media_type, favorite.id),
            enabled: !!favorite.id
        }))
    })

    const isLoading = favoriteQueries.some((query) => query.isLoading)
    const isError = favoriteQueries.some((query) => query.isError)
    const errorMessage = favoriteQueries.some((query) => query.error?.message)
    const favoriteItems = favoriteQueries
        .map((query) => query.data)
        .filter((item) => item)

    return { favoriteItems, isError, isLoading, errorMessage }
}
