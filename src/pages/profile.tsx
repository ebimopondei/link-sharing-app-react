import Button from "../components/form/button";
import UploadIcon from "../assets/icons/upload";
import useAuth from "../hooks/auth-provider";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Avatar } from "../types/form";
import profileApiCall from "../api/user/profile";
import InputTextField from "../components/form/input-text-field";
import InputEmailField from "../components/form/input-email-field";
import { User } from "../types/user";
import toast from "react-hot-toast";

export default function Profile(){

    const { logoutAuth } = useAuth();
    
    const [ userProfile, setUserProfile ] = useState<Partial<User> | null>(null);
    const { getProfileDetails, updateProfleDetails } = profileApiCall();
    const [ avatar, setAvatar ] = useState<Avatar>({ preview: ``, image: ''})


    const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) =>{
        // @ts-expect-error
        const selectedFile = e.target.files[0];

        if (!selectedFile) {
            toast.error('Cancelled select file!') 
            setAvatar( { image: '', preview: ''});
            return;
        }
        
        const reader = new FileReader();
        reader.onloadend = () => {
            toast.success('📂')
            setAvatar( prev => {
                return ( {...prev, image: selectedFile, preview: String(reader.result)})
            });
        };
        
        reader.readAsDataURL(selectedFile);
    }

    const handleUpdateProfileDetails = async (e:FormEvent) => {
        e.preventDefault()
        
        const response = await updateProfleDetails(userProfile, avatar?.image)
        if(response?.success){
            toast.success(response.message)
        }else{
            toast.error(response.message)
        }
    }


    useEffect ( ()=> {

        async function handleGetProfileDetails(){
            const { data } = await getProfileDetails()
            setAvatar( prev => ( {...prev, preview: `${data?.avatar_url}`}))
            setUserProfile( _ => data && { email: data?.email, firstname: data?.firstname, lastname: data?.lastname, username: data?.username})
        }

        handleGetProfileDetails();

    }, [])

    
    return (
        <div className="m-4 md:m-6 p-6 md:p-10 bg-white shadow- rounded-xl h-screen">
            <h2 className="heading-M">Profile Details</h2>
            <p className="body-M text-black-1000">Add your details to create a personal touch to your profile.</p>

            <form className=" my-10 space-y-6" onSubmit={handleUpdateProfileDetails}>
                <div className="bg-black-4000 rounded-xl p-8 grid md:grid-cols-5 md:items-center md:justify-center md:h-60">
                    <h3 className="body-M md:body-M md:col-span-1  ">Profile picture</h3>
                    <input onChange={handleAvatarUpload} className="hidden" type="file" id='avatar' accept=".png,.jpeg,.jpg,.webp" name="avatar" />

                    <label htmlFor="f" className="md:col-span-3 md:h-full md:m-auto">
                        { avatar.preview ? (
                            <div className="rounded-2xl overflow-hidden relative w-40 h-40 mt-4 mb-6 mx-autos">
                                <img src={avatar.preview} alt="Avatar" className="absolute w-full h-full object-cover " />
                                <span className="absolute z-10 text-white top-20 left-10 text-xs">Change Image</span>
                                <span className="absolute object-cover w-full h-full bg-black/25"></span>
                            </div>
                        ) : ( 
                            <div className=" bg-purple-3000 flex flex-col items-center justify-center heading-S gap-2 text-purple-1000 p-10 w-62 rounded-xl mb-6 mt-4">
                                <UploadIcon />
                                <span> + Upload Image</span>
                            </div>
                        )}
                    </label>
                    <p className="body-M md:col-span-1">Image must be below 1024x1024px. Use PNG or JPG or JPEG or WebP format.</p>
                </div>

                <div>
                    <div className="bg-black-4000 rounded-xl p-5">
                        <div>
                            <label className={` body-S mt-6 block`}>Username*</label>
                            <InputTextField onChange={(e)=> setUserProfile( prev => ({...prev, username: e.target.value}))} value={userProfile?.username} name="username" className="" placeholder="@John" />
                        </div>
                        <div>
                            <label className={` body-S mt-6 block`}>First name*</label>
                            <InputTextField onChange={(e)=> setUserProfile( prev=> ({...prev, firstname: e.target.value}))} value={userProfile?.firstname} name="firstname" className="" placeholder="John" />
                        </div>
                        <div>
                            <label className="body-S mt-6 inline-block">Last name*</label>
                            <InputTextField onChange={(e)=> setUserProfile( prev => ({...prev, lastname: e.target.value}))} value={userProfile?.lastname} name="lastname"  className="" placeholder="Doe" />
                        </div>                        
                        <div>
                            <label className="body-S mt-6 inline-block">Email*</label>
                            <InputEmailField onChange={(e)=> setUserProfile( prev =>  ({...prev,  email: e.target.value}))} name="email" value={userProfile?.email} className="" placeholder="johndoe@example.com" />
                        </div>                        
                    </div>
                </div>
                <Button 
                    name="Save" 
                    className="bg-purple-1000 md:w-24 rounded-lg md:rounded-xl md:h-12 text-white md:ml-auto"
                /> 
                <Button 
                    onClick={()=> logoutAuth()} 
                    name="Logout" 
                    className="bg-purple-1000 md:w-24 rounded-lg md:rounded-xl md:h-12 text-white md:ml-auto"
                /> 
            </form>
        </div>
    )
}