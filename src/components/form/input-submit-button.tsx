import { cn } from "../../lib/utils";
import { InputSubmitButtonType } from "../../types/form";

export default function InputSubmitButton({ name, className, Icon }: InputSubmitButtonType) {

    return (
        <div className="relative w-full">
            { (
                <span className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                    {Icon}
                </span>
            )}
            <input
                type='submit'
                name={name}
                className={cn(
                    `w-full p-2 ${Icon ? 'pl-10' : '' } border   rounded-lg focus:outline-purple-500/25 focus:shadow-lg focus:backdrop-blur-[32px]`,
                    className
                )}
            />
        </div>
    );
}
