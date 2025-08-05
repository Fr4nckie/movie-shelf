import { buildImageSrc } from '../services/buildImageSrc'
import type { MediaItemUnion } from '../types/media'
import { formatDate } from '../utils/formatDate'
import AddToFavoriButton from './AddToFavoriButton'

type Props = {
    media: MediaItemUnion
}

function MediaCard({ media }: Props) {
    const poster = buildImageSrc('w500', media.poster_path)
    const title = 'title' in media ? media.title : media.name
    const date =
        'release_date' in media ? media.release_date : media.first_air_date

    return (
        <div>
            <div className="relative w-full aspect-[2/3]">
                <img
                    src={poster}
                    alt={title}
                    className="w-full h-full object-cover rounded cursor-pointer"
                />
                <div className="absolute top-0 right-0 backdrop-blur-[1px] rounded">
                    <AddToFavoriButton />
                </div>
            </div>
            <div className="mt-1">
                <h3 className="line-clamp-1 font-semibold mb-1 cursor-pointer hover:text-secondary">{title}</h3>
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
