import { useEffect } from 'react'
import { useFavoritesMedia } from '../hooks/useFavoritesMedia'
import LoadingOverlay from '../components/LoadingOverlay'
import { useFavoritesStore } from '../store/useFavoritesStore'
import { Link } from 'react-router-dom'
import MediaCard from '../components/MediaCard'

function Favorites() {
    const favorites = useFavoritesStore((state) => state.favorites)
    const { favoriteItems, isLoading, isError } = useFavoritesMedia()

    useEffect(() => console.log(favoriteItems), [favoriteItems])

    if (favorites.length === 0) {
        return (
            <div className="absolute inset-0 w-full h-screen grid place-items-center">
                <div
                    role="alert"
                    className="alert alert-vertical sm:alert-horizontal"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="stroke-info h-6 w-6 shrink-0"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <span>No favorites found.</span>
                    <div>
                        <Link className="btn btn-sm btn-secondary" to="/">
                            Explore
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    if (isLoading) return <LoadingOverlay />
    if (isError) return null

    return (
        <div className="container mt-2">
            <ul className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {favoriteItems.map((favorite) => (
                    <li key={favorite.id}>
                        <MediaCard media={favorite} variant="favorite" />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Favorites
