import Button from "../components/form/button";
import EmptyIcon from "../assets/icons/empty";
import UploadIcon from "../assets/icons/upload";
import InputField from "../components/form/input-field";
import { Link } from "react-router-dom";

export default function Profile(){
    return (
        <div className="m-4 md:m-6 p-6 md:p-10 bg-white shadow- rounded-xl h-screen">
            <h2 className="heading-M">Profile Details</h2>
            <p className="body-M text-black-1000">Add your details to create a personal touch to your profile.</p>

            <div className=" my-10 space-y-6">
                <div className="bg-black-4000 rounded-xl p-8 grid md:grid-cols-5 md:items-center md:justify-center md:h-60">
                    <h3 className="body-M md:body-M md:col-span-1  ">Profile picture</h3>
                    
                    <div className="md:col-span-3 md:h-full md:m-auto bg-purple-3000 flex flex-col items-center justify-center heading-S gap-2 text-purple-1000 p-10 w-62 rounded-xl mb-6 mt-4">
                        <UploadIcon />
                        <span> + Upload Image</span>
                    </div>
                    <p className="body-M md:col-span-1">Image must be below 1024x1024px. Use PNG or JPG format.</p>
                </div>

                <div>
                    <form className="bg-black-4000 rounded-xl p-5">
                        <div>
                            <label className={` body-S mt-6 block`}>First name*</label>
                            <InputField type="text" className="" placeholder="John" />
                        </div>
                        <div>
                            <label className="body-S mt-6 inline-block">Last name*</label>
                            <InputField type='text' className="" placeholder="Doe" />
                        </div>                        
                        <div>
                            <label className="body-S mt-6 inline-block">Email*</label>
                            <InputField type='email' className="" placeholder="johndoe@example.com" />
                        </div>                        
                    </form>
                </div>
                <Button name="Save" className="bg-purple-1000 md:w-24 rounded-lg md:rounded-xl md:h-12 text-white md:ml-auto"/> 
            </div>
        </div>
    )
}