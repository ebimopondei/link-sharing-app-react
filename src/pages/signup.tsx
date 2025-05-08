import { Link, useNavigate } from "react-router-dom";
import EmailIcon from "../assets/icons/email";
import LockIcon from "../assets/icons/lock";
import Button from "../components/form/button";
import InputTextField from "../components/form/input-text-field";
import InputPasswordField from "../components/form/input-text-password";
import APICalls from "../api/api";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function SignUp(){

    const { signUp } = APICalls();

    const navigate = useNavigate();

    const [ email, setEmail ] = useState<string>("");
    // const [ username, setUserName ] = useState<string>('');
    const [ password, setPassword ] = useState<string>("");
    const [ confirmpassword, setConfirmPassword ] = useState<string>("");
    const [ passwordVisible, setPasswordVisible ] = useState<boolean>(false)

    const MIN_FIELD_LENGTH = 3;
    
    const FIRSTNAME_ERR0R_TEXT = "First Name length too short!";
    const LASTNAME_ERROR_TEXT = "Last Name length too short!";
    const EMAIL_ERROR_TEXT = "Email length too short!";
    const EMAIL_INVALID_TEST = 'Email is invalid';

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSignup = async(e: FormEvent) =>{
        e.preventDefault();

        if (!email){
            return false;
        }
        if (email.length < MIN_FIELD_LENGTH) {
            return false;
        }

        if(!emailRegex.test(email)){
            return false
        }

        if(!password){
            return false;
        }

        if(!confirmpassword){
            return false
        }

        if(password !== confirmpassword){
            return false;
        }

        const response = await signUp( email, password )

        
        if(response.success){
            toast.success(response.message)
            setTimeout(()=>{
                navigate('/login');
            }, 2000
        );
        }else {
            toast.error(response.message)
        }
    }

    return (
        <main className="bg-black-4000 h-[100dvh] body-M">
            <div className="md:w-[396px] m-auto flex flex-col gap-13 md:items-center md:justify-center">
                <div className="px-8 pt-8">
                    <img src="../images/logo-devlinks-large.svg" />
                </div>
                <div className="p-8 bg-white rounded-xl h-full md:h-min w-full">
                    <h1 className=" heading-M ">Create Account</h1>
                    <p className="body-S">Let's get you started sharing your links!</p>

                    <form onSubmit={handleSignup}>
                        <div>
                            <label className={` body-S mt-6 block`}>Email address</label>
                            <InputTextField value={email} onChange={(e)=>setEmail(e.target.value)} Icon={<EmailIcon />} name="email" className="" placeholder="e.g. alex@email.com" />
                        </div>
                        <div>
                            <label className="body-S mt-6 inline-block">Create password</label>
                            <InputPasswordField value={password} onChange={(e)=>setPassword(e.target.value)} Icon={<LockIcon />} name="password" className="" placeholder="Enter your password" />
                        </div>
                        <div>
                            <label className="body-S mt-6 inline-block">Confirm password</label>
                            <InputPasswordField value={confirmpassword} onChange={(e)=> setConfirmPassword(e.target.value)} Icon={<LockIcon />} name="confirm-password" className="" placeholder="Enter your password" />
                        </div>

                        <p className="body-S my-6 ">Password must contain at least 8 characcters</p>

                        <Button className="mt-0" name="Create new account"  />
                        
                        <p className="text-center w-52 md:w-full mx-auto md:mx-0 mt-10 md:mt-6">Already have an account? <Link className="text-purple-1000 body-M" to='/login'>Login</Link></p>
                    </form>


                </div>

            </div>
        </main>
    )
}