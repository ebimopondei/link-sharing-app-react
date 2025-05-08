import { useSortable } from "@dnd-kit/sortable";
import { SelectOptions, ShareableLinks } from "./types/form";
import { CSS } from "@dnd-kit/utilities";
import { Select } from "./components/form/select";
import InputTextField from "./components/form/input-text-field";
import LinkIcon from "./assets/icons/link";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export default function SortableItem ( { id, platform, url, index, setLinks}: { id:string, platform: string, url:string, index:string, setLinks:Dispatch<SetStateAction<ShareableLinks[]>>} ){
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
    return (
        <div ref={setNodeRef} style={style} {...attributes} className="draggabl">
        <div>
                                        <div  className="flex items-center justify-between ">
        <span {...listeners} className="draggable cursor-grab active:cursor-grabbing" style={{ touchAction: "none" }} >  ⠿  </span>
                                            {/* <div className="flex items-center gap-2 heading-S text-black-2000"><DragAndDrop width={12} /> Link #{idx + 1}</div> */}
                                            <p className="" onClick={() => handleRemoveLink(id)}>Remove</p>
                                        </div>
                                        <div  className="space-y-5 link">
                                            <label className={` body-S mt-6 block`}>Platform</label>
                                            <Select name="platform" onChange={(opt:SelectOptions)=>{
                                                setLinks( prev => {
                                                    // console.log(prev)
                                                    return prev.map( item => item.id === id ? { ...item, platform: opt.value} : item)
                                                    // return [...prev, {id: '54', title: e.target.value}]
                                                })
                                            }} value={{ id, platform, url}} options={[{label: 'Facebook', value: 'facebook'}, {label: 'Whatsapp', value: 'whatsapp'}, {label: 'Twitter', value: 'twitter'}, {label: 'Instagram', value: 'instagram'}, {label: 'TikTok', value: 'tiktok'}]}   />

                                            <label className={` body-S mt-6 block`}>Link</label>
                                            <InputTextField value={url} name='url' onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                                                setLinks( prev => {
                                                    // console.log(prev)
                                                    return prev.map( item => {
                                                        console.log(e.target.value)
                                                        return item.id === id ? { ...item, url: e.target.value} : item})
                                                    // return [...prev, {id: '54', title: e.target.value}]
                                                })
                                            }} Icon={<LinkIcon fill="#000" width={12} />} placeholder="e.g. https://www.github.com/johnappleseed"  />
                                        </div>
                                </div>
        </div>
    )
}