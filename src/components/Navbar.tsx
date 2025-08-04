import { Link, useNavigate } from 'react-router-dom'
import NavLinkItem from './NavLinkItem'

function Navbar() {
    const navigate = useNavigate()

    const handleFocusSearch = () => {
        navigate('/search')
    }

    return (
        <div className="shadow py-4 bg-base-100 sticky top-0 z-100">
            <div className="container flex items-center justify-between">
                <Link to="/" className="text-xl font-medium">
                    MovieShelf
                </Link>
                <div className="hidden md:flex md:items-center md:grow-1">
                    <ul className="w-full capitalize flex items-center gap-6 ms-12">
                        <li>
                            <NavLinkItem label="home" path="/" />
                        </li>
                        <li>
                            <NavLinkItem label="favorites" path="/favorites" />
                        </li>
                        <li className="ml-auto">
                            <input
                                type="search"
                                className="input input-bordered"
                                placeholder="Search movies..."
                                onFocus={handleFocusSearch}
                                aria-label="Search movies"
                            />
                        </li>
                    </ul>
                </div>
                <div className="md:hidden">
                    <div className="drawer">
                        <input
                            id="my-drawer"
                            type="checkbox"
                            className="drawer-toggle"
                        />
                        <div className="drawer-content">
                            <label
                                htmlFor="my-drawer"
                                className="btn btn-outline drawer-button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label
                                htmlFor="my-drawer"
                                aria-label="close drawer"
                                className="drawer-overlay"
                            ></label>
                            <ul className="menu space-y-4 bg-base-200 min-h-full w-64 sm:w-80 p-4 capitalize">
                                <li>
                                    <NavLinkItem label="home" path="/" />
                                </li>
                                <li>
                                    <NavLinkItem
                                        label="favorites"
                                        path="/favorites"
                                    />
                                </li>
                                <li>
                                    <input
                                        type="search"
                                        className="input input-bordered w-full"
                                        placeholder="Search movies..."
                                        onFocus={handleFocusSearch}
                                        aria-label="Search movies"
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
