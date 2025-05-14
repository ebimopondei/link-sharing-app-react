import UploadIcon from "../assets/icons/upload"
import { Avatar, ShareableLinks } from "../types/form"
import { User } from "../types/user"

export default function IPhoneSkeletonContent ({ avatar, userProfile, links, className }: { avatar:Avatar, className?:string, userProfile:Partial<User>|null, links:ShareableLinks[]}){
    return (
        <div className={` flex flex-col items-center justify-start ${className}`}>
            { avatar.preview ? (
                <div className="rounded-full overflow-hidden bg-black-3000 relative w-24 h-24 mt-4 mb-6 mx-autos">
                    <img src={avatar.preview} alt="Avatar" className="absolute w-full h-full object-cover " />
                </div>
            ) : ( 
                <div className=" bg-purple-3000 flex flex-col items-center justify-center heading-S gap-2 text-purple-1000 p-10 w-24 h-24 rounded-full mb-6 mt-4">
                    <UploadIcon width={40} />
                </div>
            )}

            <div className="text-center">
                <p className="text-base text=black">{userProfile?.firstname} {userProfile?.lastname}</p>
                <p className="text-xs">{userProfile?.email}</p>
            </div>

            <div className="mt-10 w-full space-y-5 h-[310px] py-4 overflow-scroll">
                { links.map( (link, i) => {
                    return (
                        <div className={` p-4 text-white capitalize body-S rounded-lg flex items-center gap-2 bg-${link.links.platform} `} key={i}><span className=" fill-white" dangerouslySetInnerHTML={{__html: link.links.icon}}></span> {link.links.platform}</div>
                    )
                } )}
            </div>
        </div>
    )
}