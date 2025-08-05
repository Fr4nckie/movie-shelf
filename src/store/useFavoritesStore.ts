import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type FavoriteItem = {
    id: number
    media_type: 'movie' | 'tv'
}

type FavoritesState = {
    favorites: FavoriteItem[]
    addFavorite: (item: FavoriteItem) => void
    removeFavorite: (item: FavoriteItem) => void
    isFavorite: (item: FavoriteItem) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            addFavorite: (item) => {
                const exists = get().favorites.some(
                    (fav) =>
                        fav.id === item.id && fav.media_type === item.media_type
                )

                if (!exists) {
                    set((state) => ({
                        favorites: [...state.favorites, item]
                    }))
                }
            },
            removeFavorite: (item) => {
                set((state) => ({
                    favorites: state.favorites.filter(
                        (fav) =>
                            fav.id !== item.id &&
                            fav.media_type !== item.media_type
                    )
                }))
            },
            isFavorite: (item) =>
                get().favorites.some(
                    (fav) =>
                        fav.id === item.id && fav.media_type === item.media_type
                )
        }),
        {
            name: 'favorites',
            onRehydrateStorage: () => (state) => {
                if (state?.favorites) {
                    state.favorites = state.favorites.filter(
                        (fav): fav is FavoriteItem =>
                            typeof fav.id === 'number' &&
                            (fav.media_type === 'movie' ||
                                fav.media_type === 'tv')
                    )
                }
            }
        }
    )
)
