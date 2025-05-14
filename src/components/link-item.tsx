import { useSortable } from "@dnd-kit/sortable";
import { SelectableOptions, ShareableLinks } from "../types/form";
import { CSS } from "@dnd-kit/utilities";
import { Select } from "./form/select";
import InputTextField from "./form/input-text-field";
import LinkIcon from "../assets/icons/link";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import platformApiCall from "../api/user/platform";

export default function LinkItem ( { id, platform, icon, url, setLinks}: { id:string, icon:string, platform: string, url:string, index:string, setLinks:Dispatch<SetStateAction<ShareableLinks[]>>} ){
    

    const { getPlatforms } = platformApiCall()

    
    const [ selectable, setSelectable ] = useState<SelectableOptions[] | null>(null);
    

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id});
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };


    const handleRemoveLink = (id: string) => {
        setLinks(link => link.filter(i => i.id !== id));
    }


    useEffect( ()=> {

        async function handleGetPlatform(){
            const response = await getPlatforms()
            setSelectable(response.data)
        }

        handleGetPlatform();
    }, [])


    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <div>
                <div  className="flex items-center justify-between ">
                    <span {...listeners} className="draggable cursor-grab active:cursor-grabbing" style={{ touchAction: "none" }} >  ⠿  </span>
                    <p className="" onClick={() => handleRemoveLink(id)}>Remove</p>
                </div>
                <div  className="space-y-5 link">
                    <label className={` body-S mt-6 block`}>Platform</label>
                    <Select 
                        name="platform" 
                        onChange={(opt:SelectableOptions)=>{ 
                            setLinks( prev => {
                                return prev.map( item => {
                                    return item.id === id ? { ...item, platform_id: opt.id, links: {
                                        ...item.links, platform: opt.platform, icon: opt.icon }
                                    } : item
                                }) 
                            })
                        }}
                        value={{ id, links:{platform, icon }, url}}
                        options={selectable} 
                    />

                    <label className={` body-S mt-6 block`}>Link</label>
                    <InputTextField 
                        value={url} 
                        name='url' 
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                            setLinks( prev => {
                                return prev.map( item => {
                                    return item.id === id ? { ...item, url: e.target.value} : item})
                            })
                        }} 
                        Icon={<LinkIcon fill="#000" width={12} />} 
                        placeholder="e.g. https://www.github.com/johnappleseed"  
                    />
                </div>
            </div>
        </div>
    )
}