import { Link } from 'react-router-dom'

export default function Users(){
    return (
        <div className='m-5 flex justify-between'>
            <h2>Users</h2>
            <input type="text" placeholder="Search Users..." />

            <div className=''>
                Rohit Sinha
                <Link className="ml-5" to="/send">Send Money</Link>
            </div>
        </div>
    )
}