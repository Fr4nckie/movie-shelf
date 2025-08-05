import { useEffect, useMemo, useState } from 'react'
import { buildImageSrc } from '../services/buildImageSrc'
import { useFavoritesStore } from '../store/useFavoritesStore'
import type { MediaItemUnion } from '../types/media'
import { formatDate } from '../utils/formatDate'
import AddToFavoriButton from './AddToFavoriteButton'
import RemoveFavoriteButton from './RemoveFavoriteButton'

type Props = {
    media: MediaItemUnion
    variant: 'media' | 'favorite'
}

function MediaCard({ media, variant = 'media' }: Props) {
    const [isActive, setIsActive] = useState<boolean>(false)
    const addFavorite = useFavoritesStore((state) => state.addFavorite)
    const removeFavorite = useFavoritesStore((state) => state.removeFavorite)
    const isFavorite = useFavoritesStore((state) => state.isFavorite)

    const poster = buildImageSrc('w500', media.poster_path)
    const title = 'title' in media ? media.title : media.name
    const date =
        'release_date' in media ? media.release_date : media.first_air_date

    const item = useMemo(
        () => ({ id: media.id, media_type: media.media_type }),
        [media.id, media.media_type]
    )

    useEffect(() => {
        setIsActive(isFavorite(item))
    }, [isFavorite, item])

    const handleToggleFavorite = () => {
        if (isFavorite(item)) {
            setIsActive(false)
            removeFavorite(item)
        } else {
            setIsActive(true)
            addFavorite(item)
        }
    }

    return (
        <div>
            <div className="relative w-full aspect-[2/3]">
                <img
                    src={poster}
                    alt={title}
                    className="w-full h-full object-cover rounded cursor-pointer"
                />
                <div className="absolute top-0 right-0 backdrop-blur-[1px] rounded">
                    {variant === 'favorite' ? (
                        <RemoveFavoriteButton item={item} />
                    ) : (
                        <AddToFavoriButton
                            isActive={isActive}
                            onclick={handleToggleFavorite}
                        />
                    )}
                </div>
            </div>
            <div className="mt-1">
                <h3 className="line-clamp-1 font-semibold mb-1 cursor-pointer hover:text-secondary">
                    {title}
                </h3>
                <div className="text-sm text-gray-500 flex flex-wrap divide-x divide-gray-500/50">
                    <div className="pe-3">{formatDate(date, 'monthYear')}</div>
                    <div className="ps-3">
                        ⭐ {media.vote_average.toFixed(1)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MediaCard
