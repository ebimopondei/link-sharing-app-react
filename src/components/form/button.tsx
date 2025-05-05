import { cn } from "../../lib/utils";
import { ButtonType } from "../../types/form";

export default function Button ( { className, disabled, name, Icon, iconPosition = 'right', onClick}: ButtonType) {
    return (
        <button disabled={disabled} onClick={onClick} className={cn('text-center w-full  p-2 bg-purple-1000 hover:bg-purple-2000 cursor-pointer text-white heading-S rounded-[11px] mt-6 flex items-center justify-center gap-4', className)}>{ iconPosition == 'left' && Icon} {name} { iconPosition == 'right' && Icon }</button>
    )
}