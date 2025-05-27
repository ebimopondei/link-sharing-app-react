import { Link, useLocation } from "react-router-dom";
import UserIcon from "../../assets/icons/user";
import LinkIcon from "../../assets/icons/link";
import Preview from "../../assets/icons/preview";

export default function Header(){
    const { pathname } = useLocation();

    return(
        <div className="px-6 py-4 md:py-6 ">
            <div className="px-1 py-4 md:py-6 md:px-6  shadow-  md:rounded-xl bg-white flex items-center justify-between">
                <div>
                    <Link to={'/'}>
                        <img src="../images/logo-devlinks-small.svg" alt="site logo" />
                    </Link>
                </div>
                <div className="flex items-center justify-between md:gap-6">
                    <Link className={`${pathname == '/hub'? 'bg-purple-3000 text-purple-1000 heading-S' : 'heading-S text-black-2000'}  py-2 px-6 rounded-md`} to='/hub'>
                        <div className="flex gap-2">
                            <LinkIcon width={20} fill={`${pathname == '/hub' ? '#633CFF' : '#737373'}`} />
                            <span className="hidden md:block">Links</span>
                        </div>
                    </Link>
                    <Link className={`${pathname == '/profile'? 'bg-purple-3000 text-purple-1000 heading-S' : 'heading-S text-black-2000'} py-2 px-6 rounded-md`} to='/profile'>
                        <div className="flex gap-2 ">
                            <UserIcon width={20} fill={`${pathname == '/profile' ? '#633CFF' : '#737373'}`} /> 
                            <span className="hidden md:block">Profile Details</span>
                        </div>
                    </Link>
                </div>
                <div className=" border-2 border-purple-1000 px-4 py-2 rounded-xl text-purple-1000 heading-S">
                    <Link to='/preview' >
                        <div>
                            <span className="md:hidden"><Preview width={20} fill='#633CFF' /></span>
                            <div className="px-7 py-3 hidden md:block">Preview</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}