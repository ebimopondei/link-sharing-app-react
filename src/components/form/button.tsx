import { cn } from "../../lib/utils";
import { ButtonType } from "../../types/form";

export default function Button ( { className, name, Icon}: ButtonType) {
    return (
        <button className={cn('text-center w-full  p-2 bg-purple-1000 hover:bg-purple-2000 cursor-pointer text-white heading-S rounded-[11px] mt-6', className)}>{Icon} {name}</button>
    )
}