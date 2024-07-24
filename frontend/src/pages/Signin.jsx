import { useNavigate, Link } from "react-router-dom";


function Signin(){
    const navigate = useNavigate();
    function  handleRedirect(){   
        navigate('/Dashboard');
    }
    return (
        <div className="text-center m-10 bg-slate-100">
        <div>
            <h1>Sign In</h1>
            <p>Enter your credentails to access your account</p>
        </div>
        <div>
            <h3>Email</h3>
            <input  type="email" placeholder="johndoe@emaple.com" required/>
        </div>
        <div>
            <h3>Password</h3>
            <input type="text" />
        </div>
        <div>
            <button className="border rounded-md bg-black text-white m-1 p-2" onClick={handleRedirect}>Sign Up</button>
            <p>Don't have a account <Link className="underline" to="/signup">Sign Up</Link></p>
        </div>

        </div>
    )
}

export default Signin;