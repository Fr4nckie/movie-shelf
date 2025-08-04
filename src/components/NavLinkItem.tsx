import { NavLink } from 'react-router-dom'
import { cn } from '../utils/cn'

type Props = {
    label: string
    path: string
}

function NavLinkItem({ label, path }: Props) {
    return (
        <NavLink
            className={({ isActive }) =>
                cn('tracking-wide', isActive && 'text-secondary')
            }
            to={path}
        >
            {label}
        </NavLink>
    )
}

export default NavLinkItem
