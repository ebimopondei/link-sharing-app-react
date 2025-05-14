import { useState, useRef, useEffect } from 'react';
import { SelectProps } from '../../types/form';
import ArrowDownIcon from '../../assets/icons/arrow-down';

export const Select = ({
  value,
  name,
  options,
  onChange,
  placeholder = 'Select...',
  className = '',
} : SelectProps ) => {

  const ref = useRef<HTMLDivElement>(null);

  
  const [ isOpen, setIsOpen ] = useState(false);
  const [ selectValue, setSelectValue] = useState<string>(value?.links.platform ?? '');
  
  
  const selectedOption = options?.find((opt) => opt.platform === selectValue);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative w-full body-M ${className}`}>
      {value && <input type="hidden" name={name} value={selectValue} />}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="border border-black-3000  hover:border-purple-1000 hover:border-1 p-2 rounded-md bg-white cursor-pointer shadow flex  gap-3 items-center justify-between"
      >
        <span dangerouslySetInnerHTML={{__html: selectedOption?.icon ?? ''}}></span>
        <span className="text-left grow capitalize"> {selectedOption ? selectedOption.platform : placeholder } </span>
        <span className={` ${isOpen ? 'rotate-180': 'rotate-0'} transition-all`}><ArrowDownIcon width={12}/></span>

      </div>

      {isOpen && (
        <ul className="absolute transition-all z-20 w-full bg-white border border-black-3000  mt-1 rounded-md shadow max-h-36 overflow-y-auto">
          {options?.map((opt, idx) => (
            <li
              key={idx}
              
              onClick={() => {
                if (onChange) onChange(opt);
                  setSelectValue(opt.platform);
                  setIsOpen(false);
              }}
              className={`mx-4 py-3 hover:text-purple-1000 hover:font-normal cursor-pointer flex items-center  gap-3 border-b border-b-black-3000`}
            >
              <span dangerouslySetInnerHTML={{__html: opt.icon}}></span>
              <span className='capitalize'>{opt.platform}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
