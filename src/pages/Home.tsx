import { useEffect } from 'react'
import { useTrendingMedia } from '../hooks/useTrendingMedia'
import MediaCard from '../components/MediaCard'
import LoadingOverlay from '../components/LoadingOverlay'
import ErrorMessage from '../components/ErrorMessage'

function Home() {
    const {
        data: medias,
        isLoading,
        isError,
        error
    } = useTrendingMedia('all', 'week', 1)

    useEffect(() => console.log(medias?.results), [medias])

    if (isLoading) return <LoadingOverlay />
    if (isError) return <ErrorMessage message={error.message} />

    return (
        <div className="container mt-2">
            <ul className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {medias &&
                    medias.results.map((media) => (
                        <li key={media.id}>
                            <MediaCard media={media} />
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default Home
