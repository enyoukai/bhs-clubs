import {Link} from 'react-router-dom';

export default function Admin()
{
    return (
        <ul>
            <li><Link to='/admin/approve'>Approve Clubs</Link></li>
            <li><Link to='/admin/moderation'>Moderation</Link></li>
            <li><Link to='/admin/approve'>Users</Link></li>
            <li><Link to='/admin/approve'>Feed</Link></li>

        </ul>
    )
}