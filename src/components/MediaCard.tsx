import { useEffect, useMemo, useState } from 'react'
import { buildImageSrc } from '../services/buildImageSrc'
import { useFavoritesStore } from '../store/useFavoritesStore'
import type { MediaItemUnion } from '../types/media'
import { formatDate } from '../utils/formatDate'
import AddToFavoriButton from './AddToFavoriButton'

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

    const renderFavoriteButton = () => {
        if (variant === 'favorite') {
            return (
                <button
                    className="btn btn-ghost"
                    onClick={() => removeFavorite(item)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                    </svg>
                </button>
            )
        }
        return (
            <AddToFavoriButton
                isActive={isActive}
                onclick={handleToggleFavorite}
            />
        )
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
                    {renderFavoriteButton()}
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
