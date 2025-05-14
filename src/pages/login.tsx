import { Link, useNavigate } from "react-router-dom";
import EmailIcon from "../assets/icons/email";
import LockIcon from "../assets/icons/lock";
import Button from "../components/form/button";
import APICalls from "../api/api";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import useAuth from "../hooks/auth-provider";
import InputTextField from "../components/form/input-text-field";
import InputPasswordField from "../components/form/input-text-password";
import toast from "react-hot-toast";

export default function Login(){

    const { login } = APICalls();
    const navigate = useNavigate();
    const { loginAuth } = useAuth();


    const [ message, setMessage ] = useState<string>('');
    const [ emailError, setEmailError ] = useState<boolean>(false)
    const [ passwordError, setPasswordError ] = useState<boolean>(false);
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");


    const MIN_FIELD_LENGTH = 3;

    
    const { mutate:loginMutation, isPending:loginIsPending } = useMutation( {
      mutationFn: () => login(emailOrUsername, password),
      onSuccess: (response) => {
          toast.success(response.message)
          loginAuth( { token: response.data.token, refreshToken: response.data.refreshToken });
          navigate('/');
      },
      onError: (err:any) => {
        toast.error(err.response.data.message)
      }
    });

    async function handleLogin(e: FormEvent) {
      e.preventDefault();
      setTimeout(()=> {
        setEmailError(false);
        setPasswordError(false);
        setMessage('');
      }, 2000)

      if (emailOrUsername.length < MIN_FIELD_LENGTH) {
        setMessage('Length too short!')
        setEmailError(true);
        return;
      }
      
      if (password.length < MIN_FIELD_LENGTH) {
        setPasswordError(true)
        setMessage('Length too short!')
        return;
      }

      loginMutation();
    }

    return (
        <main className="h-[100dvh] bg-black-4000 body-M   ">
            <div className="md:w-[396px] m-auto flex flex-col gap-13 md:items-center md:justify-center">
                <div className="px-8 pt-8">
                  <img src="../images/logo-devlinks-large.svg" />
                </div>
                <div className="p-8 bg-white rounded-xl h-full md:h-min w-full">
                    <h1 className=" heading-M ">Login</h1>
                    <p className="body-S">Add your details below to get bacck into the app</p>

                    <form onSubmit={handleLogin}>
                        <div>
                            <label className={` body-S mt-6 block`}>Email address</label>
                            <InputTextField 
                                error={emailError} 
                                message={message} 
                                onChange={(e) => setEmailOrUsername(e.target.value)}  
                                value={emailOrUsername} 
                                Icon={<EmailIcon />} 
                                name="email" 
                                className="" 
                                placeholder="e.g. alex@email.com" 
                            />
                        </div>
                        <div>
                            <label className="body-S mt-6 inline-block">Password</label>
                            <InputPasswordField 
                                error={passwordError} 
                                message={message} 
                                onChange={(e)=> setPassword(e.target.value)} 
                                value={password} 
                                Icon={<LockIcon />} 
                                name="password" 
                                className="" 
                                placeholder="Enter your password" 
                            />
                        </div>

                        <Button 
                            disabled={false} 
                            name="Login" 
                            iconPosition="left" 
                            Icon={loginIsPending && <div className="spinner"></div>}  
                        />
                        
                        <p className="text-center w-52 mx-auto mt-10">Dont't have an account? <Link className="text-purple-1000 body-M" to='/signup'>Create account</Link></p>
                    </form>
                </div>
          </div>
        </main>
    )
}