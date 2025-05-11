import { cn } from "../../lib/utils";
import { InputTextFieldType } from "../../types/form";

export default function InputPasswordField({ onChange, name, value, message="can't be empty", className, placeholder, Icon, error=false }: InputTextFieldType) {

    return (
        <div className="relative w-full">
            { (
                <span className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                    {Icon}
                </span>
            )}
            <input
                type='password'
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={cn(
                    `w-full p-2 ${error?"border-red-1000": "border-black-3000"} ${Icon ? 'pl-10' : '' } border   rounded-lg focus:outline-purple-500/25 focus:shadow-lg focus:backdrop-blur-[32px]`,
                    className
                )}
            />
            { (
                <span className={`  absolute  z-10 right-3 top-1/2 transform -translate-y-1/2 pointer-events-none body-S ${error ? 'text-red-1000' : 'hidden' } `}>
                    {message}
                </span>
            )}
        </div>
    );
}
