import { Link } from "react-router-dom"

export default function ButtonWarning(props){
    return (
        <div className="text-center">
                {props.name === 'signin'
                ? <p>Don't have a account <Link className="underline" to="/signup">Sign Up</Link></p>
                : <p>Already has a account? <Link className="underline" to="/signin">Login</Link></p>
                }
        </div>
    )
}