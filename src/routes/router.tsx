import { createBrowserRouter } from 'react-router-dom'
import Root from '../pages/Root'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            { index: true, element: <div>Homepage</div> },
            { path: 'search', element: <div>Search</div> },
            { path: 'favorites', element: <div>Favorites</div> }
        ]
    }
])
