import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import './style.css'
import { SlotItemMapArray, Swapy, utils } from 'swapy'
import { createSwapy } from 'swapy'
import InputField from './components/form/input-text-field'
import { ShareableLinks } from './types/form'


const initialItems: ShareableLinks[] = [
  { id: '1', platform: 'a', url: 'https://www.google.com' },
  { id: '2', platform: 'b', url: 'https://www.google.com' },
  { id: '3', platform: 'c', url: 'https://www.google.com' },
]

let id = 4

function Swappy() {
  const [items, setItems] = useState<ShareableLinks[]>(initialItems)
  const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(utils.initSlotItemMap(items, 'id'))
  const slottedItems = useMemo(() => utils.toSlottedItems(items, 'id', slotItemMap), [items, slotItemMap])
  const swapyRef = useRef<Swapy | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)

  // setItems( item => [...item, { id: '56', title: ''}])

  useEffect(() => utils.dynamicSwapy(swapyRef.current, items, 'id', slotItemMap, setSlotItemMap), [items])

  useEffect(() => {
    swapyRef.current = createSwapy(containerRef.current!, {
      manualSwap: true,
      // animation: 'dynamic'
      // autoScrollOnDrag: true,
      // swapMode: 'drop',
      // enabled: true,
      // dragAxis: 'x',
      // dragOnHold: true
    })

    swapyRef.current.onSwap((event) => {
      setSlotItemMap(event.newSlotItemMap.asArray)
      // setItems(event.swappedWithItem)
      console.log(event.newSlotItemMap.asArray)
      console.log(event.oldSlotItemMap.asArray)
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
                  console.log(form)
                  console.log(data)
                  console.log(e)
  }
  return (
    <div className="container" ref={containerRef}>
      <form className="items" onSubmit={(e) =>handleSubmitForm(e)}>
                <input type='text' name='test' value={'item.title'} className='w-10 bg-blue-400' />
                <input className='bg-black' type='submit' value={'submit'} name='submit' />

      </form>
      <form className="items" onSubmit={(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        //@ts-expect-error
        const form = new FormData(e.target)
        const data = Object.fromEntries(form.entries());
                      console.log(data)
      }}>
        {slottedItems.map(({ slotId, itemId, item }) => (
          <div className="slot" key={slotId} data-swapy-slot={slotId}>
            {item &&
              <div className="item" data-swapy-item={itemId} key={itemId}>
                {/* <input type='text' value={item.title} className='w-10' /> */}
                <InputField onChange={(e)=>{
                  setItems( prev => {
                    // console.log(prev)
                    return prev.map( item => item.id === item.id ? { ...item, platform: e.target.value} : item)
                    // return [...prev, {id: '54', title: e.target.value}]
                })
                }} name={item.id} value={item.url} />
                {/* <span>{item.title}</span> */}
                <span className="delete" data-swapy-no-drag onClick={() => {
                  setItems(items.filter(i => i.id !== item.id))
                }}></span>
              </div>
            }
          </div>
        ))}
        <input type='submit' name='submit' value={'submit'} />
      </form>
      <div className="item item--add" onClick={() => {
        const newItem: ShareableLinks = { id: `${id}`, platform: 'new', url: 'https://www.google.com' }
        setItems([...items, newItem])
        id++
      }}>+</div>
    </div>
  )
}

export default Swappy