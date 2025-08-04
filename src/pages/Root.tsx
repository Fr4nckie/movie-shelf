import { Outlet } from 'react-router-dom'

function Root() {
    return (
        <div>
            <div className="container mx-auto py-4">Navbar</div>
            <Outlet />
        </div>
    )
}

export default Root
