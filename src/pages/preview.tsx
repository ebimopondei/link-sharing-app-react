import { useEffect, useState } from "react";
import IPhoneSkeletonContent from "../components/iphone-skeleton-content";
import { Avatar, ShareableLinks } from "../types/form";
import { User } from "../types/user";
import { useSuspenseQuery } from "@tanstack/react-query";
import linksApiCall from "../api/user/links";
import profileApiCall from "../api/user/profile";
import API from "../api/api-config";
import Button from "../components/form/button";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Preview () {

    const { getLinksQueryOptions } = linksApiCall();
    const { getProfileDetails } = profileApiCall();
    const { backendHost } = API();
    const { data:userLinks } = useSuspenseQuery( getLinksQueryOptions())
    
    
    const location = window.location.origin;
    
    
    const [ avatar, setAvatar ] = useState<Avatar>({ preview: ``, image: ''})
    const [ userProfile, setUserProfile ] = useState<Partial<User> | null>(null);
    const [ links, _] = useState<ShareableLinks[]>(userLinks.data);

    
    useEffect ( ()=> {
       
       async function handleGetProfileDetails(){
           const { data } = await getProfileDetails()

           setAvatar( prev => ( {...prev, preview: `${backendHost}/uploads/${data?.avatar_url}`}))
           setUserProfile( _ => data && { email: data?.email, firstname: data?.firstname, lastname: data?.lastname, username: data?.username})
       }

       handleGetProfileDetails();

   }, []);

    return (
        <div>
            <div className="py-4 px-6 flex items-center justify-between gap-4">
                <Link to={'/'} >
                    <Button 
                        name="Back to Editor" 
                        className="w-40 mt-0 px-[27.25px] py-3 heading-S bg-white text-purple-1000 border border-purple-1000 " 
                    />
                </Link>

                <Button 
                    onClick={()=>{
                        toast.success(`Copied to clipboard: ${location}/u/${userProfile?.username}`)
                    }} 
                    name="Share Link" 
                    className="w-40 mt-0 px-[27.25px] py-3 heading-S"  
                />
            </div>

            <div className="mt-14">
                <IPhoneSkeletonContent 
                    className="mx-17" 
                    avatar={avatar} 
                    links={links} 
                    userProfile={userProfile} 
                />
            </div>
        </div>
    )
}