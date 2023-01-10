import { Link } from 'react-router-dom';

export default function Admin() {
    return (
        <div className="m-10">
            <h2 className="text-center text-4xl font-semibold">Admin Home</h2>
            <ul>
                <li className='text-2xl mb-3'><Link to='/admin/approve'>Approve Clubs</Link></li>
                <li className='text-2xl mb-3'><Link to='/admin/moderation'>Moderate Clubs</Link></li>
                <li className='text-2xl mb-3'><Link to='/admin/claims'>Approve Claims</Link></li>

            </ul>
        </div>
    )
}