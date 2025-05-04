import Button from "../components/form/button";
import EmptyIcon from "../assets/icons/empty";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { Select } from "../components/form/select";
import InputField from "../components/form/input-text-field";
import { createSwapy, SlotItemMapArray, Swapy, utils } from 'swapy'
import { useEffect, useRef } from 'react'
import DragAndDrop from "../assets/icons/drag-and-drop";
import LinkIcon from "../assets/icons/link";
import { SelectOptions, ShareableLinks } from "../types/form";
import InputSubmitButton from "../components/form/input-submit-button";


export default function App(){
    const [ links, setLinks ] = useState<ShareableLinks[]>([]);
    const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(utils.initSlotItemMap(links, 'id'))
    const slottedItems = useMemo(() => utils.toSlottedItems(links, 'id', slotItemMap), [links, slotItemMap])
    const swapyRef = useRef<Swapy | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => utils.dynamicSwapy(swapyRef.current, links, 'id', slotItemMap, setSlotItemMap), [links])

    const handleAddLink = () => {
        const l = Math.floor(Math.random() * 10000) + 1
        const newItem: ShareableLinks = { id: `${l}`, link: 'https://www.twitter.com', platform: 'twitter' }
        setLinks([...links, newItem])
    }

    const handleRemoveLink = (link: ShareableLinks) => {
        setLinks(links.filter(i => i.id !== link?.id));
    }

    useEffect(() => {
          swapyRef.current = createSwapy(containerRef.current!, {
            manualSwap: true,
            autoScrollOnDrag: true,
            animation: 'dynamic',
            dragAxis: 'y',
            swapMode: 'drop'
          })
    
          // Your event listeners
          swapyRef.current.onSwap((event) => {
            setSlotItemMap(event.newSlotItemMap.asArray)
            swapyRef.current?.update()
          })

        return () => {
          swapyRef.current?.destroy()
        }
      }, [])

      function handleSubmitForm(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
            //@ts-expect-error
        const form = new FormData(e.target)
        const data = Object.fromEntries(form.entries());
        console.log(data)
      }

    return (
        <div className="m-4 md:m-6 p-6 md:p-10 bg-white shadow- rounded-xl h-screen">

            <h2 className="heading-M">Customize your links</h2>
            <p className="body-M">Add/edit/remove links below and then share all your profiles with the world!</p>

            <Button onClick={handleAddLink} name=" + Add new link" className="bg-white border text-purple-1000 p-3" />
            
            { links.length < 1 && (
                <div className="mt-10 flex flex-col gap-10 items-center justify-center">
                    <EmptyIcon />

                    <h3 className="heading-M">Let's get you started</h3>
                    <p>Use the 'Add new link' button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your profiles with everyone!</p>
                </div>
            )}

            <div className="mt-10 flex flex-col gap-3" ref={containerRef}>
                <form onSubmit={handleSubmitForm}>
                    { slottedItems.map( ( { item: link, itemId, slotId, }) =>{
                        return(
                            <div key={slotId} data-swapy-slot={slotId} className="bg-black-4000 p-6 space-y-5 slot">
                            {link && (
                                    <div data-swapy-item={itemId} key={itemId}>
                                        <div  className="flex items-center justify-between ">
                                            <div data-swapy-handle className="flex items-center gap-2 heading-S text-black-2000"><DragAndDrop width={12} /> Link #{itemId}</div>
                                            <p className="" data-swapy-no-drag onClick={() => handleRemoveLink(link)}>Remove</p>
                                        </div>
                                        <div  className="space-y-5 link">
                                            <label className={` body-S mt-6 block`}>Platform</label>
                                            <Select onChange={(opt:SelectOptions)=>{
                                                setLinks( prev => {
                                                    // console.log(prev)
                                                    return prev.map( item => item.id === link.id ? { ...item, platform: opt.value} : item)
                                                    // return [...prev, {id: '54', title: e.target.value}]
                                                })
                                            }} value={link} options={[{label: 'Facebook', value: 'facebook'}, {label: 'Whatsapp', value: 'whatsapp'}, {label: 'Twitter', value: 'twitter'}, {label: 'Instagram', value: 'instagram'}, {label: 'TikTok', value: 'tiktok'}]}   />

                                            <label className={` body-S mt-6 block`}>Link</label>
                                            <InputField value={link.link} name={link.id} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                                                setLinks( prev => {
                                                    // console.log(prev)
                                                    return prev.map( item => item.id === link.id ? { ...item, link: e.target.value} : item)
                                                    // return [...prev, {id: '54', title: e.target.value}]
                                                })
                                            }} Icon={<LinkIcon fill="#000" width={12} />} placeholder="e.g. https://www.github.com/johnappleseed"  />
                                        </div>
                                </div>
                            )}
                            </div>
                        )
                    })}

                    <InputSubmitButton name="submit" value="Save" className={`${ links.length > 0 ? 'bg-purple-1000':'bg-purple-1000/25'} md:w-24 rounded-lg md:rounded-xl md:h-12 text-white md:ml-auto`}/> 
                </form>
                
            </div>
        </div>
    )
}