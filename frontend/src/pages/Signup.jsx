import Heading from '../components/Heading'
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import ButtonWarning from "../components/ButtonWarning";

function Signup(){
    // const navigate = useNavigate();
    // function  handleRedirect(){   
    //     navigate('/Dashboard');
    // }

    return (
        <div>
            <Heading heading={"Sign Up"}/>
            <SubHeading subheading={"Enter your information to create an account"}/>
            <InputBox name={"First Name"} placeholder={"John"}/>
            <InputBox name={"Last Name"} placeholder={"Doe"}/>
            <InputBox name={"Email"} placeholder={"johndoe@example.com"}/>
            <InputBox name={"Password"} placeholder={"12345"}/>
            <Button name={"Sign Up"}/>
            <ButtonWarning name={"signup"} />
        </div>
    )
}


export default Signup;