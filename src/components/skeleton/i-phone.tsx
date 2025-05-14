import { Props } from "../../types";

export default function IPhoneSkeleton ({children}: Props){
    return (
        <div>
            <div className="w-[300px] mx-auto h-[600px] bg-white rounded-[40px] border-2 border-gray-800 relative shadow-2xl">

                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-white border-b-1 border-l-1 border-r-1 rounded-b-2xl z-10"></div>

                <div className="absolute top-2 left-2 right-2 bottom-4 bg-white border-1 rounded-[32px] overflow-hidden">
                    <div className="w-full h-full p-6 text-gray-400 text-xl font-medium">
                        { children}
                    </div>
                </div>

                <div className="absolute top-20 -left-1 w-1 h-10 bg-gray-700 rounded-r"></div>
                <div className="absolute top-36 -left-1 w-1 h-6 bg-gray-700 rounded-r"></div>
                <div className="absolute top-44 -left-1 w-1 h-6 bg-gray-700 rounded-r"></div>
                <div className="absolute top-28 -right-1 w-1 h-10 bg-gray-700 rounded-l"></div>
            </div>
        </div>
    )
}