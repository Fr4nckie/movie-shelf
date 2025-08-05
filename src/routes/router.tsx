import { createBrowserRouter } from 'react-router-dom'
import Root from '../pages/Root'
import Home from '../pages/Home'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            { index: true, element: <Home /> },
            { path: 'search', element: <div>Search</div> },
            { path: 'favorites', element: <div>Favorites</div> }
        ]
    }
])
