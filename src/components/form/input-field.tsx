import EmailIcon from "../../assets/icons/email";
import { cn } from "../../lib/utils";
import { InputFieldType } from "../../types/form";

export default function InputField({ type = 'text', message="can't be empty", className, placeholder, Icon, error=false, success=false }: InputFieldType) {
    return (
        <div className="relative w-full">
            { (
                <span className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                    {Icon}
                </span>
            )}
            <input
                type={type}
                placeholder={placeholder}
                className={cn(
                    `w-full p-2 ${error?"border-red-1000": success ? "border-green-500" : "border-black-3000"} ${Icon ? 'pl-10' : '' } border   rounded-lg focus:outline-purple-500/25 focus:shadow-lg focus:backdrop-blur-[32px]`,
                    className
                )}
            />
            { (
                <span className={`  absolute text-red-1000 z-10 right-3 top-1/2 transform -translate-y-1/2 pointer-events-none body-S ${error ? 'et' : success ? 'st' : 'hidden' } `}>
                    {message}
                </span>
            )}
        </div>
    );
}
