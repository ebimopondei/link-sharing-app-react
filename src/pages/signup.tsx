import { Link } from "react-router-dom";
import EmailIcon from "../assets/icons/email";
import LockIcon from "../assets/icons/lock";
import Button from "../components/form/button";
import InputField from "../components/form/input-field";

export default function SignUp(){
    return (
        <main className="bg-black-4000 body-M py-8">
            <div className="h-screen w-[396px] m-auto flex flex-col gap-13 md:items-center md:justify-center">
                <div className="px-8">
                    <img src="../images/logo-devlinks-large.svg" />
                </div>
                <div className="p-10 bg-white rounded-xl h-full md:h-min w-full">
                    <h1 className=" heading-M ">Create Account</h1>
                    <p className="body-S">Let's get you started sharing your links!</p>

                    <form>
                        <div>
                            <label className={` body-S mt-6 block`}>Email address</label>
                            <InputField Icon={<EmailIcon />} type="email" className="" placeholder="e.g. alex@email.com" />
                        </div>
                        <div>
                            <label className="body-S mt-6 inline-block">Create password</label>
                            <InputField Icon={<LockIcon />} type='password' className="" placeholder="Enter your password" />
                        </div>
                        <div>
                            <label className="body-S mt-6 inline-block">Confirm password</label>
                            <InputField Icon={<LockIcon />} type='password' className="" placeholder="Enter your password" />
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