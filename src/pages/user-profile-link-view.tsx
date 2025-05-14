import { useEffect, useState } from "react";
import IPhoneSkeletonContent from "../components/iphone-skeleton-content";
import { Avatar } from "../types/form";
import { PublicUserProfile, User } from "../types/user";
import { useSuspenseQuery } from "@tanstack/react-query";
import API from "../api/api-config";
import Button from "../components/form/button";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import publicApiCall from "../api/public";

export default function UserProfileLinkView () {

    const { getProfileDetailsQueryOptions } = publicApiCall()
    const { backendHost } = API();
    const { data:userLinks } = useSuspenseQuery( getProfileDetailsQueryOptions('epounds'))
    
    
    const [ avatar, setAvatar ] = useState<Avatar>({ preview: ``, image: ''})
    const [ userProfile, setUserProfile ] = useState<Partial<User> | null>(null);
    const [ links, _] = useState<PublicUserProfile | null>(userLinks.data);


    useEffect(()=>{ 
        setUserProfile( _ => userLinks && { email: userLinks.data?.email, firstname: userLinks.data?.firstname, lastname: userLinks.data?.lastname, username: userLinks.data?.username});
        setAvatar( prev => ( {...prev, preview: `${backendHost}/uploads/${userLinks.data?.avatar_url}`})) 
    }, [])
    
    return (
        <div>
            <div className="py-4 px-6 flex items-center justify-between gap-4">
                <Link to={'/login'} >
                    <Button 
                        name="Login" 
                        className="w-40 mt-0 px-[27.25px] py-3 heading-S bg-white text-purple-1000 border border-purple-1000 " 
                    />
                </Link>

                <Button 
                    onClick={()=>{
                        toast.success(`Copied to clipboard: ${location}/@${userProfile?.username}`)
                    }} 
                    name="Share Link" 
                    className="w-40 mt-0 px-[27.25px] py-3 heading-S"  
                />
            </div>

            <div className="mt-14">
                <IPhoneSkeletonContent 
                    className=" mx-17" 
                    avatar={avatar} 
                    links={links?.links ?? []} 
                    userProfile={userProfile} 
                />
            </div>
        </div>
    )
}