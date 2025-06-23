import Button from "../components/form/button";
import EmptyIcon from "../assets/icons/empty";
import { FormEvent, useEffect, useState } from "react";
import { Avatar, SelectableOptions, ShareableLinks } from "../types/form";
import InputSubmitButton from "../components/form/input-submit-button";
import linksApiCall from "../api/user/links";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import useDndKit from "../hooks/use-dnd-kit";
import LinkItem from "../components/link-item";
import IPhoneSkeleton from "../components/skeleton/i-phone";
import profileApiCall from "../api/user/profile";
import { User } from "../types/user";
import platformApiCall from "../api/user/platform";
import IPhoneSkeletonContent from "../components/iphone-skeleton-content";

export default function App(){
      

    const { sensors } = useDndKit()
    const { getProfileDetails } = profileApiCall();
    const { submitLinks, getLinksQueryOptions } = linksApiCall();
    const { data:userLinks } = useSuspenseQuery( getLinksQueryOptions())
    const { getPlatforms } = platformApiCall()
    

    const [ userProfile, setUserProfile ] = useState<Partial<User> | null>(null);
    const [ avatar, setAvatar ] = useState<Avatar>({ preview: ``, image: ''})
    const [ selectable, setSelectable ] = useState<SelectableOptions[]>([]);
    const [ links, setLinks ] = useState<ShareableLinks[]>(userLinks.data);

    
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = links.findIndex(item => item.id === active.id);
            const newIndex = links.findIndex(item => item.id === over?.id);
            const newLinks = [...links];
            const [moved] = newLinks.splice(oldIndex, 1);
            newLinks.splice(newIndex, 0, moved);
            setLinks(updateIndexes(newLinks));
        }
    }

    const handleAddLink = () => {
        const l = Math.floor(Math.random() * 10000) + 1
        const newItem: ShareableLinks = { id: `${l}`, url: 'https://www.facebook.com', platform_id: selectable[0].id, links: { icon: selectable[0].icon, platform: selectable[0].platform} }
        setLinks(updateIndexes([...links, newItem]))
    }

    function updateIndexes(links: ShareableLinks[]) {
        return links.map((link, index) => ({
          ...link,
          order: index,
        }));
    }

    function handleSubmitForm(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        submitLinks(links.map(({ id, ...rest }) => rest))
    }

    useEffect ( ()=> {
    
        async function handleGetProfileDetails(){
            const { data } = await getProfileDetails()

            setAvatar( prev => ( {...prev, preview: `${data?.avatar_url}`}))

            setUserProfile( _ => data && { email: data?.email, firstname: data?.firstname, lastname: data?.lastname, username: data?.username})
        }

        handleGetProfileDetails();

    }, [])

        

    useEffect( ()=> {

        async function handleGetPlatform(){
            const response = await getPlatforms()
            setSelectable(response.data)
        }

        handleGetPlatform();

    }, [])

    return (
        <div className="flex flex-wrap-reverse md:flex-nowrap items-center md:items-start md:justify-start justify-center gap-10">

            <div className="w-full md:w-4/12 md:mx-auto">
                <IPhoneSkeleton>
                    <IPhoneSkeletonContent avatar={avatar} links={links} userProfile={userProfile} />
                </IPhoneSkeleton>
            </div>
            
            <div className="w-full md:w-7/12 m-4 md:m-6 p-6 md:p-10 bg-white rounded-xl">

                <h2 className=" sub-heading-M md:heading-M">Customize your links</h2>
                <p className="body-M">Add/edit/remove links below and then share all your profiles with the world!</p>

                <Button 
                    onClick={handleAddLink} 
                    name=" + Add new link" 
                    className="bg-white border text-purple-1000 p-3" 
                />
                
                { links.length < 1 && (
                    <div className="mt-10 flex flex-col gap-10 items-center justify-center">
                        <EmptyIcon />

                        <h3 className="sub-headin-M md:heading-M">Let's get you started</h3>
                        <p>Use the 'Add new link' button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your profiles with everyone!</p>
                    </div>
                )}

                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    <form onSubmit={handleSubmitForm}>
                        <div className="mt-10 flex flex-col gap-20">
                            <SortableContext items={links}>
                            { links.map( ( link, idx ) =>{
                                return(
                                    <LinkItem 
                                        setLinks={setLinks} 
                                        index={String(idx)} 
                                        key={link.id} 
                                        id={link.id} 
                                        platform={link.links.platform} 
                                        icon={link.links.icon} 
                                        url={link.url}  
                                    />
                                )
                            })}
                            </SortableContext>
                            <InputSubmitButton  
                                name="submit" 
                                value="Save" 
                                className={`${ links.length > 0 ? 'bg-purple-1000 mt-10':'bg-purple-1000/25'}  md:w-24 rounded-lg md:rounded-xl md:h-12 text-white md:ml-auto`}
                            /> 
                        </div>
                    </form>
                </DndContext>
            </div>
        </div>
    )
}
